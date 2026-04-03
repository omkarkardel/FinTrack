import { animate } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AnimatedNumber({ value, formatter }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(latest),
    })

    return () => controls.stop()
  }, [value])

  return <span>{formatter(displayValue)}</span>
}
