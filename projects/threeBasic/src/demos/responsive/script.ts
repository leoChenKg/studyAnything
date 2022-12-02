import { useEffect } from 'react'
import * as THREE from 'three'

export function useDemo1(canvasContainer: React.RefObject<HTMLDivElement>) {
  // const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })

  useEffect(() => {
    canvasContainer.current!.append(renderer.domElement)
  }, [])

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5)
  camera.position.z = 2

  const scene = new THREE.Scene()

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-1, 2, 4)
  scene.add(light)

  const geometry = new THREE.BoxGeometry(1, 1, 1)

  function makeInstance(geometry: THREE.BoxGeometry, color: THREE.ColorRepresentation, x: number) {
    const material = new THREE.MeshPhongMaterial({ color })

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    cube.position.x = x

    return cube
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2)
  ]

  function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  function render(time: number) {
    time *= 0.001

    if (resizeRendererToDisplaySize(renderer)) {
      // 解决拉伸问题
      /**
       * 绘制的元素变形得原因是：canvas 宽高都设置为 100% (自适应与父元素)，那么父元素拉伸得时候，canvas 元素也会被拉伸
       * 解决方案 设置 canvas 得宽高比为父元素的实时宽高比这样就不会出现压缩变形的问题了
       */
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight // 计算canvas的宽高比
      camera.updateProjectionMatrix() //更新投影矩阵
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1
      const rot = time * speed
      cube.rotation.x = rot
      cube.rotation.y = rot
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}
