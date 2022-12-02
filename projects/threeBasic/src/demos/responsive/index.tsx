import { useEffect, useRef, FC } from 'react'
import { useDemo1 } from './script'
import styled from 'styled-components'

const BaseCon = styled.div`
  width:100%;
  height:100%
`

const Divider = styled.div`
  width:100%;
  border-bottom: 1px solid #dcdcdc
`

const CanvasCon = styled.div`
  width: 100%;
  height: 100%;
  & > canvas {
    width: 100%;
    height: 100%;
    margin-bottom: 50px
  }
`

const responsive: FC = () => {
  const canvasContainer = useRef<HTMLDivElement>(null)
  useDemo1(canvasContainer)
  return (
    <BaseCon >
      <h3>responsive</h3>
      <Divider />
      <CanvasCon ref={canvasContainer} />
    </BaseCon>
  )
}

export default responsive