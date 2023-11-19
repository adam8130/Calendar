import moment from 'moment';
import styled from 'styled-components';
import { useStore } from '../zustand/store';
import { CalendarDetail } from './CalendarDetail';
import { TodoDetail } from './TodoDetail';

const Root = styled.div`
  width: 100%;
  height: calc(100% - 65%);
  display: flex;
  position: relative;
  padding-top: 30px;
  h6 {
    color: #806153;
    height: 30px;
    width: max-content;
    font-size: 16px;
    position: absolute;
    top: 5px;
    right: 50%;
    transform: translateX(50%);
  }
  section {
    width: 50%;
    height: 100%;
    padding: 10px;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ccc;
  }
`

export function DetailWrapper() {
  const { selectedDayInfo } = useStore(state => state)
  console.log(selectedDayInfo)
  const today = moment(selectedDayInfo?.today).format('YYYY年MM月DD日')
  
  return (
    <Root>
      <h6>{today}</h6>
      <section>
        {(selectedDayInfo?.events?.length > 0) && <CalendarDetail />}
      </section>      
      <section>
        {(selectedDayInfo?.todos?.length > 0) && <TodoDetail />}
      </section>
    </Root>
  )
}