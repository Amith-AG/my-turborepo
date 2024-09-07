'use client'

import { AuroraBackground } from '@repo/ui/components/ui/aurora-background'
import { motion, HTMLMotionProps } from 'framer-motion'
type MotionDivProps = HTMLMotionProps<'div'>

type AuroraBackgroundProps = {
  children: React.ReactNode
  rest?: MotionDivProps
  className?: string
}
const DefaultMotionDivProps: MotionDivProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay: 0.3, duration: 0.9, ease: 'easeInOut' },
}
export const AuroraBackgroundComp = ({
  children,
  rest = DefaultMotionDivProps,
  className = 'relative flex flex-col gap-4 items-center justify-center px-4',
}: AuroraBackgroundProps) => {
  return (
    <AuroraBackground>
      <motion.div {...rest} className={className}>
        {children}
      </motion.div>
    </AuroraBackground>
  )
}
