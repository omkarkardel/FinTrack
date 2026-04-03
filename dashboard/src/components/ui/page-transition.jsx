import { AnimatePresence, motion } from 'framer-motion'

const MotionDiv = motion.div

export default function PageTransition({ pageKey, children }) {
  return (
    <AnimatePresence mode="wait">
      <MotionDiv
        key={pageKey}
        initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
      >
        {children}
      </MotionDiv>
    </AnimatePresence>
  )
}
