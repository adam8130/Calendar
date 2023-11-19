import styled from 'styled-components';
import { motion } from "framer-motion"
import { useState } from 'react';
import { useStore } from '../zustand/store'

const Root = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  background: rgb(204, 190, 181);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  div {
    color: rgb(230, 225, 221)
  }
`;

export function Opening() {

  // const { audioRef } = useStore(state => state)
  const { setIsOpeningEnd } = useStore(state => state)
  const [isAnimated, setIsAnimated] = useState(false)

  return (
    <Root
      onTouchStart={() => {
        // audioRef.current.play()
        setIsOpeningEnd()
      }}
      onClick={() => {
        // audioRef.current.play()
        setIsOpeningEnd()
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 2 }}
        transition={{ duration: 1, ease: "easeOut", }}
        onAnimationComplete={() => setIsAnimated(true)}
      >
        NINA's Calendar
      </motion.div>
      {isAnimated && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ position: 'fixed', top: '54%' }}
        >
          Tap Me
        </motion.div>
      )}
    </Root>
  )
}