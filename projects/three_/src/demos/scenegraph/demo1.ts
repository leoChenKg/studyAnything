/**
 * canvas 响应式 相关的东西
 */
import * as THREE from 'three'
import { useEffect } from 'react'
import resizeRendererToDisplaySize from '@utils/resizeRendererToDisplaySize'

export default function useDemo1(canvasConRef: React.RefObject<HTMLDivElement>) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })

  useEffect(() => {
    canvasConRef.current!.append(renderer.domElement)
  },[])
  const secen = new THREE.Scene()
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-4, 4, 4)
  secen.add(light)

  const camera = new THREE.PerspectiveCamera(85, 2, 0.1, 10)
  camera.position.z = 10

  const geometry = new THREE.BoxGeometry(5, 5, 5)
  const material = new THREE.MeshPhongMaterial({ color: 'red' })

  const SphMesh = new THREE.Mesh(geometry, material)
  SphMesh.position.x = 0
  secen.add(SphMesh)

  function render(time: number) {
    let rotation = time * 0.001

    if (resizeRendererToDisplaySize(renderer)) {
      // 解决拉伸问题
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight // 计算canvas的宽高比
      camera.updateProjectionMatrix() //更新投影矩阵
    }

    SphMesh.rotation.x = rotation
    SphMesh.rotation.y = rotation
    SphMesh.rotation.z = rotation
    renderer.render(secen, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}
