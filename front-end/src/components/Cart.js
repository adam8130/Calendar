import React, { useEffect, useState } from 'react'
import { useStore } from '../zustand/store'
import styled from 'styled-components'

import CartIcon from '../static/icons/cart.png'
import CartSection1 from '../static/icons/cart-section1.png'
import CartSection2 from '../static/icons/cart-section2.png'
import CartSection3 from '../static/icons/cart-section3.png'
import CartSection4 from '../static/icons/cart-section4.png'
import CartSection5 from '../static/icons/cart-section5.png'
import CartSection6 from '../static/icons/cart-section6.png'
import Nana from '../static/icons/nana.png'

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .CartIcon {
    width: 60px;
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
  .CartSection1 {
    width: 50%;
    position: absolute;
    top: 0;
    right: -5%;
    transform: rotate(-20deg)
  }
  .CartSection2 {
    width: 50%;
    position: absolute;
    top: 12%;
    left: -3%;
    transform: rotate(10deg);
  }
  .CartSection3 {
    width: 55%;
    position: absolute;
    top: 30%;
    right: -2%;
    transform: rotate(-10deg)
  }
  .CartSection4 {
    width: 50%;
    position: absolute;
    top: 45%;
    left: -3%;
    transform: rotate(-20deg);
  }
  .CartSection5 {
    width: 50%;
    position: absolute;
    top: 60%;
    right: 5%;
    transform: rotate(-30deg)
  }
  .CartSection6 {
    width: 40%;
    position: absolute;
    bottom: -10%;
    right: -3%;
    transform: rotate(-90deg)
  }
  .Nana {
    width: 45%;
    position: absolute;
    bottom: 0;
    left: -5%;
    transform: rotate(20deg)
  }
`
const CartItem = styled.div`
  width: max-content;
  padding: 5px 10px;
  position: absolute;
  transition: all 0.3s;
`

export function Cart() {

  const { cartsArray, FETCH_URL } = useStore(state => state)
  const { setCartsArray } = useStore((store) => store)
  const [cartItemRefs, setCartItemRefs] = useState([]);

  // 当 cartsArray 更新时，重新创建引用数组
  useEffect(() => {
    const refs = cartsArray.map((_, i) => cartItemRefs[i] || React.createRef())
    setCartItemRefs(refs);
    console.log(refs)
  }, [cartsArray]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch(`${FETCH_URL}/api/carts`)
      const data = await response.json()
      setCartsArray(data)
    }
    fetchCartItems()
  }, [FETCH_URL, setCartsArray])

  useEffect(() => {
    if (cartsArray.length <= 0) return;
  
    let timer;
    let initialX, initialY, startX, startY;
  
    cartItemRefs.forEach((ref) => {
      ref?.current?.addEventListener('touchstart', function (e) {
        // 阻止默认事件
        e.preventDefault();
  
        // 获取初始触摸位置
        const touch = e.touches[0];
        initialX = touch.clientX;
        initialY = touch.clientY;
  
        // 获取元素初始位置
        const rect = ref.current.getBoundingClientRect();
        startX = rect.left;
        startY = rect.top;
  
        // 设置计时器
        timer = setTimeout(function () {
          timer = 0;
          console.log('你长按了');
          ref.current.style.transform = 'scale(1.3)';
        }, 1000);
      });
  
      ref?.current?.addEventListener('touchend', function (e) {
        ref.current.style.transform = 'scale(1)';
        clearTimeout(timer);
        timer = 0;
        const newCartsArray = cartsArray.map((item, idx) => {
          if (idx === cartsArray.length - 1) {
            item.style = {
              ...item.style,
              left: ref.current.style.left,
              top: ref.current.style.top,
              transform: ''
            }
          }
          return item
        })
        fetch(`${FETCH_URL}/api/carts/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCartsArray)
        })
      });
  
      ref?.current?.addEventListener('touchmove', function (e) {
        e.preventDefault();
  
        // 计算移动距离
        const touch = e.touches[0];
        const deltaX = touch.clientX - initialX;
        const deltaY = touch.clientY - initialY;
  
        // 计算新位置
        const newLeft = startX + deltaX;
        const newTop = startY + deltaY;
  
        // 获取父容器的尺寸
        const parentRect = ref.current.parentNode.getBoundingClientRect();
  
        // 转换为百分比
        const leftPercent = ((newLeft / parentRect.width) * 100).toFixed(2);
        const topPercent = ((newTop / parentRect.height) * 100).toFixed(2);
  
        // 更新元素位置
        ref.current.style.left = `${leftPercent}%`;
        ref.current.style.top = `${topPercent}%`;
      });
    });
  }, [cartsArray, cartItemRefs, FETCH_URL]);
  

  return (
    <Root>
      <img src={CartIcon} className="CartIcon" alt='' />
      <img src={CartSection1} className="CartSection1" alt='' />
      <img src={CartSection2} className="CartSection2" alt='' />
      <img src={CartSection3} className="CartSection3" alt='' />
      <img src={CartSection4} className="CartSection4" alt='' />
      <img src={CartSection5} className="CartSection5" alt='' />
      <img src={CartSection6} className="CartSection6" alt='' />
      <img src={Nana} className="Nana" alt='' />
      {cartsArray?.map((item, idx) => (
        <CartItem
          key={item.id}
          style={{ ...item.style }}
          ref={cartItemRefs[idx]}
        >
          {item.title}
        </CartItem>
      ))}
    </Root>
  )
}