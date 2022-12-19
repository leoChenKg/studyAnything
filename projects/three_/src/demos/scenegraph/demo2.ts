import * as THREE from 'three'
import { Material } from 'three'
import GUI from 'lil-gui'
import { useEffect } from 'react'
import resizeRendererToDisplaySize from '@utils/resizeRendererToDisplaySize'

export default function useDemo(canvasConRef: React.RefObject<HTMLDivElement>) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  useEffect(() => {
    canvasConRef.current!.append(renderer.domElement)
  }, [])

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100)
  camera.position.set(0, 50, 0)
  camera.up.set(0, 0, 1) // camera.up 是什么 ??
  camera.lookAt(0, 0, 0)

  const objects: (THREE.Mesh | THREE.Object3D<THREE.Event>)[] = []

  // radius 半径 ；widthSegments：宽项分段  heightSegments：纵向分段
  const sphereGeometry = new THREE.SphereGeometry(1, 6, 6)

  // 思路 =》先将框架定好===》然后再将 Mesh 中的内容添加到框架中
  const solarSystem = new THREE.Object3D()
  scene.add(solarSystem)
  objects.push(solarSystem)

  const earthOrbit = new THREE.Object3D()
  earthOrbit.position.x = 20
  solarSystem.add(earthOrbit)
  objects.push(earthOrbit)

  const moonOrbit = new THREE.Object3D()
  moonOrbit.position.x = 2
  earthOrbit.add(moonOrbit)

  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
  sunMesh.scale.set(6, 6, 6) // 扩大太阳的大小
  solarSystem.add(sunMesh)
  objects.push(sunMesh)

  const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 })
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)
  earthOrbit.add(earthMesh)
  objects.push(earthMesh)

  const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 })
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
  moonMesh.scale.set(0.5, 0.5, 0.5)
  moonOrbit.add(moonMesh)
  objects.push(moonMesh)

  // PointLight 点光源
  const light = new THREE.PointLight(0xffffff, 3)
  scene.add(light)

  class AxisGridHelper {
    grid: THREE.GridHelper
    axes: THREE.AxesHelper
    private _visible: boolean = false
    constructor(node: THREE.Mesh | THREE.Object3D<THREE.Event>, units = 10) {
      const axes = new THREE.AxesHelper()
      ;(axes.material as Material).depthTest = false
      axes.renderOrder = 2 // 在网格渲染之后再渲染
      node.add(axes)

      const grid = new THREE.GridHelper(units, units)
      ;(grid.material as Material).depthTest = false
      grid.renderOrder = 1
      node.add(grid)

      this.grid = grid
      this.axes = axes
      this.visible = false
    }
    get visible() {
      return this._visible
    }
    set visible(v) {
      this._visible = v
      this.grid.visible = v
      this.axes.visible = v
    }
  }

  const gui = new GUI()
  function makeAxisGrid(node: THREE.Mesh | THREE.Object3D<THREE.Event>, label: string, units?: number) {
    const helper = new AxisGridHelper(node, units)
    gui.add(helper, 'visible').name(label)
  }

  makeAxisGrid(solarSystem, 'solarSystem', 25)
  makeAxisGrid(sunMesh, 'sunMesh')
  makeAxisGrid(earthOrbit, 'earthOrbit')
  makeAxisGrid(earthMesh, 'earthMesh')
  makeAxisGrid(moonOrbit, 'moonOrbit')
  makeAxisGrid(moonMesh, 'moonMesh')

  function render(time: number) {
    if (resizeRendererToDisplaySize(renderer)) {
      // 解决拉伸问题
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight // 计算canvas的宽高比
      camera.updateProjectionMatrix() //更新投影矩阵
    }

    objects.forEach((node, idx) => {
      node.rotation.y = time / 1000
    })

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}
