import React from 'react'
import { useStore } from '../zustand/store'
import styled from 'styled-components'
import moment from 'moment'

const Root = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    font-size: 14px;
    span:nth-of-type(1) {
      padding: 2px 10px;
      border-radius: 5px;
      background: #ccc;
    }
  }
`

export function TodoDetail() {

  const { selectedDayInfo } = useStore(state => state)

  return (
    <Root>
      {selectedDayInfo?.todos?.map((item, idx) => (
        <div key={idx}>
          <span style={{ 
              background: `${item.background || '#ccc'}`,
              textDecoration: `${item.checked ? 'line-through' : 'none'}`,
              color: `${item.checked ? 'gray' : '#000'}`
            }}
          >
            {item.title}
          </span>
        </div>
      ))}
    </Root>
  )
}