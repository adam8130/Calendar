import styled from 'styled-components';
import { useStore } from '../zustand/store';

const Root = styled.div`
  width: 100%;
  z-index: 10;
  background: ${({ $isSelectedDay }) => $isSelectedDay ? `rgba(205, 190, 181, .25)` : 'none'};
`

export function DateCell(event) {
  const { eventsArray, todosArray, selectedDay, setselectedDayInfo, setSelectedDay } = useStore(state => state)
  const isSelectedDay = selectedDay === event.value.toDateString();
  
  const getDaySlotEvent = () => {
    const today = new Date(event.value)
    const day = today.getDate()
    const events = eventsArray.filter(event => new Date(event.start).getDate() === day)
    const todos = todosArray.filter(todo => new Date(todo.start).getDate() === day)
    const dayEventObject = {
      today,
      events,
      todos
    }
    setselectedDayInfo(dayEventObject)
    setSelectedDay(today.toDateString());  
    console.log('dayEventObject', dayEventObject)
  }

  return (
    <Root 
      onTouchStart={getDaySlotEvent}
      onClick={getDaySlotEvent}
      $isSelectedDay={isSelectedDay}
    />
  )
}