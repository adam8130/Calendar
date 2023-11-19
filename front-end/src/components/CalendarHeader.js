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
`
const Monthbar = styled.div`
  width: 60%;
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
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`
const MONTH_MAP = {
  '一月': 'January',
  '二月': 'February',
  '三月': 'March',
  '四月': 'April',
  '五月': 'May',
  '六月': 'June',
  '七月': 'July',
  '八月': 'August',
  '九月': 'September',
  '十月': 'October',
  '十一月': 'November',
  '十二月': 'December',
}

export function Header(event) {

  const year = new Date().getFullYear()
  const [month] = event?.label?.split(' ')
  const { toggleisEventPanelOpen } = useStore(state => state)
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