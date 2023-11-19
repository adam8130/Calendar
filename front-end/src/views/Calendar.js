import React, { useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Header } from '../components/CalendarHeader'
import { DateCell } from '../components/DateCell'
import { useStore } from '../zustand/store'
import { eventStyleGetter } from '../utils/calendar/eventStyleGetter'

import moment from 'moment'
import 'moment/locale/zh-tw';
import 'react-big-calendar/lib/css/react-big-calendar.css'

// 設置 moment 的星期從周一開始
moment.updateLocale('zh-tw', {
  week: { dow: 1 }
});

// 創建 localizer
const localizer = momentLocalizer(moment);

const myFormats = {
  agendaDateFormat: 'YYYY年MM月DD日',  // 格式化Agenda視圖中的日期
};

export function FullCalendar() {

  const { eventsArray, FETCH_URL } = useStore(state => state)
  const { setEventsArray, setTodosArray, setselectedDayInfo } = useStore(state => state)
  const currentMonth = moment().format('YYYY-MM')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${FETCH_URL}/api/events/${currentMonth}`)
      const data = await response.json()
      const dataArray = Object.keys(data).map(key => data[key]);
      const eventsArray = dataArray.flatMap(item => item.events && item.events.length > 0 ? item.events : []);
      const todosArray = dataArray.flatMap(item => item.todos && item.todos.length > 0 ? item.todos : []);

      console.log('eventsArray', eventsArray)
      console.log('todosArray', todosArray)

      const today = new Date()
      const day = today.getDate()

      const events = eventsArray.filter(event => new Date(event.start).getDate() === day)
      const todos = todosArray.filter(todo => new Date(todo.start).getDate() === day)
      const dayEventObject = {
        today,
        events,
        todos
      }
      setEventsArray(eventsArray)
      setTodosArray(todosArray)
      setselectedDayInfo(dayEventObject)
    }
    fetchData()
  }, [FETCH_URL, currentMonth, setEventsArray, setTodosArray])

  return (
    <Calendar
      views={['month']}
      localizer={localizer}
      events={eventsArray || []}
      components={{ 
        toolbar: Header,
        dateCellWrapper: DateCell
      }}
      style={{ height: '65%' }}
      eventPropGetter={eventStyleGetter}
      format={myFormats}
      popup
    />
  )
}