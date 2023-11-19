import { Navigate } from 'react-big-calendar';
import { useStore } from '../zustand/store';
import { MONTH_MAP } from '../constant/const';
import styled from 'styled-components';
import AddIcon from '../static/icons/add.png'
import SettingIcon from '../static/icons/setting.png'
import ArrowIcon from '../static/icons/arrow.png'

const Root = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
`
const Monthbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  gap: 15px;
  h1 {
    font-size: 26px;
    font-weight: 400;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
  }
  h6 { 
    margin-left: 80px;
    font-family: 'Noto Serif TC', serif;
    letter-spacing: 3px;
    font-weight: 300;
  }
  img:nth-of-type(1) {
    transform: rotate(180deg);
  }
`



export function Header(event) {

  const year = new Date().getFullYear()
  const [month] = event?.label?.split(' ')
  // console.log(event)
  
  return (
    <Root>
      <Monthbar>
        {event && (
          <img 
            src={ArrowIcon} 
            width="30" height="15" alt="" 
            onClick={() => event.onNavigate(Navigate.PREVIOUS)} 
          />
        )}
        <div>
          <h1>{MONTH_MAP[month]}</h1>
          <h6>{year}</h6>
        </div>
        {event && (
            <img 
            src={ArrowIcon} 
            width="30" height="15" alt="" 
            onClick={() => event.onNavigate(Navigate.NEXT)}
          />
        )}
      </Monthbar>
    </Root>
  )
}