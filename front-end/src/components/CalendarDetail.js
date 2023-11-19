import React from 'react'
import { useStore } from '../zustand/store'
import styled from 'styled-components'
import moment from 'moment'

const Root = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  h6 {
    width: max-content;
    margin-left: auto;
    margin-bottom: 5px;
    font-size: 16px;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-size: 14px;
    span:nth-of-type(1) {
      padding: 2px 10px;
      border-radius: 5px;
      background: #ccc;
    }
  }
`

export function CalendarDetail() {

  const { selectedDayInfo } = useStore(state => state)
  
  return (
    <Root>
      {selectedDayInfo?.events?.map((event, idx) => (
        <div key={idx}>
          <span style={{ background: `${event.background || '#ccc'}` }}>
            {event.title}
          </span>
          <span>編輯</span>
        </div>
      ))}
    </Root>
  )
}