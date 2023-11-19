import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components'

import { FullCalendar } from './views/Calendar';
import { Todolist } from './views/Todolist';

import { AddEventPanel } from './components/AddEventPanel';
import { DetailWrapper } from './components/DetailWrapper';
import { EventDialog } from './components/EventDialog';

import { Opening } from './layout/Opening';
import { Footer } from './layout/Footer';
import { useStore } from './zustand/store';
import { Header } from './layout/Header';
import { Cart } from './components/Cart';

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgb(204, 190, 181);
  position: relative;
  overflow: hidden;
`
const Container = motion(styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`)

export default function App() {

  const audioRef = useRef(null)
  const { isEventPanelOpen, eventDialogData, useOpening, isOpeningEnd, activeTab } = useStore(state => state)
  const { setAudioRef, SET_FETCH_URL } = useStore((store) => store)

  useEffect(() => {
    setAudioRef(audioRef)
    const FETCH_URL = process.env.NODE_ENV === 'development' 
      ? process.env.REACT_APP_FETCH_LOCALHOST 
      : process.env.REACT_APP_FETCH_URL
      SET_FETCH_URL(FETCH_URL)
  }, [setAudioRef, SET_FETCH_URL])

  return (
    <Root>
      {activeTab !== 0 && <Header />}
      {
        useOpening && !isOpeningEnd ? (
          <Opening />
        ) : (
          <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {activeTab === 0 && (
              <>
                <FullCalendar />
                <DetailWrapper />  
              </>
            )}
            {activeTab === 1 && (
              <Todolist />
            )}
            {activeTab === 2 && (
              <Cart />
            )}
          </Container>
        )
      }
      {
        isEventPanelOpen && (
          <AddEventPanel />
        )
      }
      {
        eventDialogData && (
          <EventDialog data={eventDialogData} />
        )
      }
      <audio ref={audioRef} src=""></audio>
      <Footer />
    </Root>
  );
}
