import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../zustand/store'
import styled from 'styled-components'
import moment from 'moment'

const Root = styled(motion.div)`
  width: 70%;
  padding: 20px;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h6 {
    border: none;
    color: red;
    font-weight: 300;
    cursor: pointer;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: none;
    background: transparent;
    position: absolute;
    top: 10px;
    right: 10px;
  }
`

export function EventDialog({ data }) {

  const { title, start, end } = data
  const { setEventDialogData, setEventsArray } = useStore(state => state)
  const [resultMessage, setResultMessage] = useState(null)
  console.log(data)

  const deleteEvent = async () => {
    try {
      const response = await fetch(`https://calendar.adalia.pp.ua/api/events/${data.id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setResultMessage('刪除成功')
        const response = await fetch('https://calendar.adalia.pp.ua/api/events')
        const data = await response.json()
        const formatedData = data.map((item) => ({
            ...item,
            start: new Date(item.start),
            end: new Date(item.end),
        }))
        setEventsArray(formatedData)
      }
    } catch (err) {
      setResultMessage('刪除失敗')
      console.log(err)
    }
  }
  return (
    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      { resultMessage ? (
        <h3 onClick={() => setEventDialogData(null)}>{resultMessage}</h3>
      ) : (
        <>
          <h3>{title}</h3>
          <h5>{moment(start).format('LLLL')}</h5>
          <h5>{moment(end).format('LLLL')}</h5>
          <h6 onClick={deleteEvent}>刪除</h6>
        </>
      )}
      <button onClick={() => setEventDialogData(null)}>x</button>
    </Root>
  )
}