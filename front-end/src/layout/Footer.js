import styled from 'styled-components'
import CartIcon from '../static/icons/cart.png'
import GoalIcon from '../static/icons/goal.png'
import TodolistIcon from '../static/icons/todolist.png'
import CalendarIcon from '../static/icons/calendar.png'
import { useStore } from '../zustand/store'

const Root = styled.div`
  width: 100%;
  margin-top: auto;
  padding: 5px 5px;
  padding-bottom: 108px;
  background: #9F715D;
  display: flex;
  justify-content: space-around;
  z-index: 10;
  img {
    cursor: pointer;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h5 {
    margin-top: 2px;
    color: white;
    font-weight: 300;
  }
`

export function Footer() {
  const { setActiveTab } = useStore(state => state)

  return (
    <Root>
      <ButtonWrapper onClick={() => setActiveTab(2)}>
        <img src={CartIcon} width="35" height="35"  alt="" />
        <h5>Cart</h5>
      </ButtonWrapper>
      <ButtonWrapper onClick={() => setActiveTab(0)}>
        <img src={CalendarIcon} width="35" height="35" style={{ transform: 'translateY(2px)' }} alt="" />
        <h5>Calendar</h5>
      </ButtonWrapper>
      <ButtonWrapper onClick={() => setActiveTab(1)}>
        <img src={TodolistIcon} width="35" height="35" style={{ transform: 'translateY(2px)' }} alt="" />
        <h5>Todolist</h5>
      </ButtonWrapper>
      <ButtonWrapper onClick={() => setActiveTab(3)}>
        <img src={GoalIcon} width="35" height="35" alt="" />
        <h5>Goal</h5>
      </ButtonWrapper>
    </Root>
  )
}