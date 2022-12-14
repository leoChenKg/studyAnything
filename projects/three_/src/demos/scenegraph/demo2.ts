import * as THREE from 'three'
import { useEffect } from 'react'
import resizeRendererToDisplaySize from '@utils/resizeRendererToDisplaySize'

export default function useDemo(canvasConRef: React.RefObject<HTMLDivElement>) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  useEffect(() => {
    canvasConRef.current!.append(renderer.domElement)
  }, [])

  const secen = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100)
  camera.position.x = -1
  camera.lookAt(0, 0, 0)

  const planetGeometry = new THREE.SphereGeometry(1)
  const material = new THREE.MeshPhongMaterial({ color: 'yellow' })

  const Sun = new THREE.Mesh(planetGeometry, material)
  secen.add(Sun)

  

}
