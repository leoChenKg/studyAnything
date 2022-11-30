import { useEffect, createRef } from 'react'
import { useDemo1 } from './script'
export default function scenegraph() {
  const canvas1 = createRef<HTMLCanvasElement>()

  useEffect(() => {
    useDemo1(canvas1.current!)
  }, [])


  return <div>
    <canvas style={{
      width: ' 100%',
      height: '100%',
      display: 'block',

    }} ref={canvas1}></canvas>
  </div >
}
