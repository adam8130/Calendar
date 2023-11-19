import { Navigate } from 'react-big-calendar';
import { useStore } from '../zustand/store';
import styled from 'styled-components';
import AddIcon from '../static/icons/add.png'
import SettingIcon from '../static/icons/setting.png'
import ArrowIcon from '../static/icons/arrow.png'

const Root = styled.div`
  width: 100%;
  padding: 10px 20px;
  background: #9F715D;
  display: flex;
  justify-content: space-between;
  z-index: 10;
`
const Monthbar = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  gap: 15px;
  h1 {
    font-size: 30px;
    padding: 5px 0;
    font-weight: 400;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 2px;
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
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export function Header() {

  const { activeTab, toggleisEventPanelOpen } = useStore(state => state)
  
  return (
    <Root>
      <Monthbar>
        <>
          { activeTab === 1 && <h1>TodoList</h1> }
          { activeTab === 2 && <h1>ShoppingList</h1> }
          { activeTab === 3 && <h1>Goal</h1> }
        </>
      </Monthbar>
      <ButtonWrapper>
      <img 
          src={SettingIcon} 
          width="30" 
          height="30" 
          alt=""
          onClick={() => {}}
        />
        <img 
          src={AddIcon} 
          width="30" 
          height="30" 
          alt=""
          onClick={() => toggleisEventPanelOpen()}
        />
      </ButtonWrapper>
    </Root>
  )
}