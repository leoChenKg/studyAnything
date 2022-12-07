import { useRef, FC } from 'react'
import { useDemo1, useDemo2 } from './script'
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
box-sizing:border-box;
  padding:32px;
  width: 100%;
  height: 100%;
  & > canvas {
    width: 100%;
    height: calc((100vw - 64px) / 2);
    margin-bottom: 50px
  }
`

const Scenegraph: FC = () => {
  const canvasContainer = useRef<HTMLDivElement>(null)
  useDemo1(canvasContainer)
  useDemo2(canvasContainer)
  return (
    <BaseCon >
      <h3>scenegraph</h3>
      <Divider />
      <CanvasCon ref={canvasContainer} />
    </BaseCon>
  )
}

export default Scenegraph