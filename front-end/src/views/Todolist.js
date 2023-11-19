import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { DateCell } from '../components/DateCell';
import { Header } from '../components/TodolistHeader';
import { useStore } from '../zustand/store';
import { useEffect, useState } from 'react';
import { Menu, DeleteOutlineOutlined } from '@mui/icons-material'
import TodolistIcon from '../static/icons/todolist.png';
import moment from 'moment';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  position: relative;
  > img {
    position: absolute;
    top: 2%;
    left: 2%;
  }
`
const Todobar = styled.div`
  width: 100%;
  height: calc(100% - 300px);
  h2 {
    margin-top: 20px;
    text-align: center;
    color: #806153;
  }
  section {
    width: 90%;
    height: 100%;
    margin: 30px auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    div:nth-of-type(even) label {
      background: rgb(242, 222, 223);
    }
    div:nth-of-type(odd) label {
      background: rgb(255, 255, 255); 
    }
  }
`
const TodoItem = styled.div`
  width: 100%;
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
  label {
    width: 80%;
    text-align: center;
    border-radius: 10px;
  }
`
moment.updateLocale('zh-tw', {
  week: { dow: 1 }
});

// 創建 localizer
const localizer = momentLocalizer(moment);

export function Todolist() {
  
  const { FETCH_URL, selectedDayInfo, todosArray, setTodosArray } = useStore(state => state)
  
  const [currentDay, setCurrentDay] = useState(null)
  const [filteredTodosArray, setFilteredTodoArray] = useState([])

  useEffect(() => {
    const today = selectedDayInfo?.today || new Date() 
    setCurrentDay(moment(today).format('YYYY-MM-DD'))
  }, [selectedDayInfo])

  useEffect(() => {
    if (!currentDay) return
    const fetchData = async () => {
      const response = await fetch(`${FETCH_URL}/api/todos/${currentDay}`)
      const data = await response.json()
      console.log(data)
      const formatedData = data.map((item) => ({
        ...item,
        start: new Date(item.start)
      }))
      setTodosArray(formatedData)
      console.log('formatedData', formatedData)
    }

    fetchData()
  }, [FETCH_URL, currentDay, setTodosArray])

  useEffect(() => {
    if (!currentDay || !todosArray) return

    const filteredTodosArray = todosArray.filter((item) => moment(item.start).format('YYYY-MM-DD') === currentDay)
    console.log('filteredTodosArray', filteredTodosArray)

    const todolistArray = [
      ...filteredTodosArray,
      ...Array.from({ length: 7 - filteredTodosArray.length}, (_, idx) => ({ 
        title: '還沒有待辦', 
        checked: false, 
        disabled: true,
        order: idx
      }))
    ]
    setFilteredTodoArray(todolistArray)
    console.log(todolistArray)
  }, [currentDay, todosArray])

  const handleTodoChecked = (e, idx) => {
    const newTodosArray = filteredTodosArray.map((item, index) => (
      index === idx 
        ? { 
            ...item, 
            checked: e.target.checked
          } 
        : item
    ))
    setFilteredTodoArray(newTodosArray)
    fetch(`${FETCH_URL}/api/todos/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodosArray)    
    })
  }

  const handleTodoDelete = (idx) => {
    const newTodosArray = filteredTodosArray.map((item, index) => (
      index === idx 
        ? { 
            title: '還沒有待辦', 
            checked: false, 
            disabled: true,
            order: idx
          } 
        : item
    ))
    setFilteredTodoArray(newTodosArray)
    fetch(`${FETCH_URL}/api/todos/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodosArray)    
    })
  }

  return (
    <Root>
      <img src={TodolistIcon} alt="todolist" width={50}/>
      <Todobar>
        <h2>{currentDay}</h2>
        <section>
          {filteredTodosArray?.map((item,idx) => (
            <TodoItem key={idx}>
              <input 
                type="checkbox" 
                id={`todo-${idx}`} 
                name="todo" 
                value="todo" 
                checked={item.checked}
                disabled={item.disabled}
                onChange={(e) => handleTodoChecked(e, idx)}
              />
              <label 
                htmlFor="todo" 
                style={{
                  ...(item.checked && { textDecoration: 'line-through', color: 'gray' }),
                  ...(!item.checked && item.title === '還沒有待辦' && { color: 'rgba(128, 128, 128, .3)' }),
                }}
              >
                {item.title}
              </label>
              <Menu />
              <div onClick={() => handleTodoDelete(idx)}>
                <DeleteOutlineOutlined />
              </div>
            </TodoItem>
          ))}
        </section>
      </Todobar>
      <Calendar
        views={['month']}
        localizer={localizer}
        events={[]}
        components={{ 
          toolbar: Header,
          dateCellWrapper: DateCell
        }}
        style={{ width: '95%', height: 300 }}
        popup
      />
    </Root>
  )
}