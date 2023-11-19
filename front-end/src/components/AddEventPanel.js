import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '../zustand/store'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Switch } from '@mui/material'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import LabelIcon from '../static/icons/label.png'
import CloseIcon from '../static/icons/close.png'
import RepeatIcon from '../static/icons/repeat.png'
import moment from 'moment'

const Root = styled(motion.div)`
  width: 70%;
  padding: 40px 25px 20px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateY(-40%) translateX(-50%);
  background: rgb(255, 244, 252);
  border-radius: 10px;
  font-weight: 300;
  z-index: 100;
  opacity: 0.9;
  gap: 15px;
  button {
    margin-top: auto;
    padding: 10px;
    background: transparent;
    border: none;
    color: black;
    font-size: 14px;
    font-weight: 300;
    cursor: pointer;
  }
  h3 {
    font-size: 16px;
  }
  .close-btn {
    position: absolute;
    top: 15px;
    right: 10px;
    cursor: pointer;
  }
`
const EventInput = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  font-weight: 300;
  font-size: 16px;
  position: relative;
  input {
    min-width: 60px;
    width: 60px;
    font-size: 14px;
    padding: 5px 10px;
    margin-left: 20px;
    border-radius: 5px;
    border: none;
  }
  input:focus{
    outline: none;
  }
  &::before {
    content: '';
    width: 5px;
    height: 26px;
    background: #806153;
    border-radius: 5px;
    position: absolute;
  }
`
const EventLoopbar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    h3 {
      font-weight: 300;
    }
  }
`
const EventDatebar = styled.div`
  width: 100%;
  display: flex;
  padding-left: 20px;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
`
const EventRepeatbar = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  h3 {
    font-weight: 300;
  }
  .MuiSwitch-thumb {
    background: rgb(130, 115, 107);
  }
`
const ColorPicker = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  div {
    width: 60px;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid white;
    font-size: 12px;
    color: black;
  }
`

const colors = [
  { title: '娜那', color: '#98AF9A' },
  { title: '休假', color: '#E2C0B7' },
  { title: '打工', color: '#CDBEB5' },
  { title: '家', color: '#AAB9CD' },
  { title: '私人', color: '#A8A0C8' },
  { title: '尤卡', color: '#D49EB2' }
]

export function AddEventPanel() {

  const { activeTab, cartsArray, selectedDay, FETCH_URL } = useStore(state => state)
  const { setTodosArray, toggleisEventPanelOpen, setEventsArray, setCartsArray } = useStore(state => state)

  const [eventTitle, setEventTitle] = useState('標題')
  const [eventStartDate, setEventStartDate] = useState(moment((selectedDay || new Date())).format('YYYY-MM-DD'))
  const [eventEndDate, setEventEndDate] = useState(moment(selectedDay || new Date()).format('YYYY-MM-DD'))
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#CDBEB5')
  const inputRef = useRef(null)

  useEffect(() => {
    console.log('eventStart', moment(`${eventStartDate}`).toDate())
    console.log('eventEnd', moment(`${eventEndDate || eventStartDate}`).toDate())
  }, [eventStartDate, eventEndDate])

  const sendEvent = useCallback(async (params) => {
    try {
      await fetch(`${FETCH_URL}/api/${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: Date.now().toString(),
          title: eventTitle,
          start: new Date(eventStartDate),
          end: new Date(eventEndDate),
          background: selectedColor
        })
      })
      
      const eventsResponse = await fetch(`${FETCH_URL}/api/${params}/${moment(eventStartDate).format('YYYY-MM')}`)
      const eventsData = await eventsResponse.json()
      const dataArray = Object.keys(eventsData).map(key => eventsData[key]);
      const eventsArray = dataArray.flatMap(item => item.events && item.events.length > 0 ? item.events : []);

      const todosResponse = await fetch(`${FETCH_URL}/api/todos/${eventStartDate}`)
      const todosdata = await todosResponse.json()
      const formatedData = todosdata.map((item) => ({
        ...item,
        start: new Date(item.start)
      }))

      setEventsArray(eventsArray)
      setTodosArray(formatedData)
      toggleisEventPanelOpen()
    } catch (err) {
      console.log(err)
    }
  }, [FETCH_URL, eventTitle, eventStartDate, eventEndDate, selectedColor, setEventsArray, setTodosArray, toggleisEventPanelOpen]);

  const sendCartsEvent = useCallback(async () => {
    console.log(eventTitle, selectedColor)
    const cartItemObject = {
      id: Date.now().toString(),
      title: eventTitle,
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: selectedColor,
        borderRadius: '5px',
      }
    }
    const newCartsArray = [...cartsArray, cartItemObject]
    
    fetch(`${FETCH_URL}/api/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCartsArray)
    })

    setCartsArray(newCartsArray)
    toggleisEventPanelOpen()
  }, [cartsArray, FETCH_URL, eventTitle, selectedColor, setCartsArray, toggleisEventPanelOpen]);

  const dispatchEvent = useMemo(() => {
    switch (activeTab) {
      case 0:
        return { request: sendEvent, params: 'events' }
      case 1:
        return { request: sendEvent, params: 'todos' }
      case 2:
        return { request: sendCartsEvent, params: 'cart' }
      case 3:
        return { request: sendEvent, params: 'events' }
      default:
        return { request: sendEvent, params: 'events' }
    }
  }, [activeTab, sendEvent, sendCartsEvent])

  return (
    <Root
      initial={{ opacity: 0, top: '100%' }}
      animate={{ opacity: 1, top: '40%' }}
      transition={{ duration: 0.5 }}
    >
      <EventInput>
        <input 
          type="text" 
          ref={inputRef}
          value={eventTitle} 
          onFocus={() => setEventTitle('')} 
          onBlur={() => eventTitle === '' && setEventTitle('標題')}
          style={{ background: selectedColor }}
          onChange={(e) => {
            inputRef.current.style.width = `${e.target.value.length * 20}px`
            setEventTitle(e.target.value)
          }} 
        />
      </EventInput>
      <EventLoopbar>
        <EventDatebar>
        {(activeTab !== 2 && activeTab !== 3) && (
          <section>
            <div>
              <h3>開始</h3>
            </div>
            <input 
              type="date" 
              value={eventStartDate} 
              onChange={(e) => {
                setEventStartDate(e.target.value)
                eventEndDate < e.target.value && setEventEndDate(e.target.value)
              }} 
            />
          </section>
        )}
        {activeTab === 0 && (
          <section>
            <div>
              <h3>結束</h3>
            </div>
            <input 
              type="date" 
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)} 
            />
          </section>
        )}
        </EventDatebar>
        {activeTab === 0 && (
          <EventRepeatbar>
            <div>
              <img src={RepeatIcon} width="20" height="20" alt="" />
              <h3>重複</h3>
            </div>
            <Switch color="default" />
          </EventRepeatbar>
        )}
        <section>
          <div onClick={() => setColorPickerOpen((prev) => !prev)}>
            <img src={LabelIcon} width="20" height="20" alt="" />
            <h3>選擇標籤</h3>
            {colorPickerOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          </div>
        </section>
        {colorPickerOpen && (
          <ColorPicker 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {colors.map((item, index) => (
              <div 
                key={index}
                style={{ background: item.color }} 
                onClick={() => {
                  setSelectedColor(item.color)
                  setColorPickerOpen(false)
                }}
              >
                {item.title}
              </div>
            ))}
          </ColorPicker>
        )}
      </EventLoopbar>
      <button onClick={() => dispatchEvent.request(dispatchEvent.params)}>建立</button>
      <img 
        src={CloseIcon} 
        className="close-btn" 
        onClick={() => toggleisEventPanelOpen()}
        width="15" 
        height="15" 
        alt="" 
      />
    </Root>
  )
}