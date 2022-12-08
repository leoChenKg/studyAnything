import * as THREE from 'three'
import { useEffect } from 'react'
import resizeRendererToDisplaySize from '@utils/resizeRendererToDisplaySize'

import Stats from './js/stats.module.js'

import { OrbitControls } from './js/OrbitControls.js'
import { RoomEnvironment } from './js/RoomEnvironment.js'

import { GLTFLoader } from './js/GLTFLoader.js'
import { DRACOLoader } from './js/DRACOLoader.js'

export default function useDemo(canvasConRef: React.RefObject<HTMLDivElement>) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  useEffect(() => {
    canvasConRef.current!.append(renderer.domElement)
  }, [])

  let mixer: any
  const clock = new THREE.Clock()
  const stats = new (Stats as any)()

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputEncoding = THREE.sRGBEncoding

  const pmremGenerator = new THREE.PMREMGenerator(renderer)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xbfe3dd)
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100)
  camera.position.set(5, 2, 8)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0.5, 0)
  controls.update()
  controls.enablePan = false
  controls.enableDamping = true

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./gltf/')

  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)
  loader.load(
    './LittlestTokyo.glb',
    function (gltf: any) {
      const model = gltf.scene
      model.position.set(1, 1, 0)
      model.scale.set(0.01, 0.01, 0.01)
      scene.add(model)

      mixer = new THREE.AnimationMixer(model)
      mixer.clipAction(gltf.animations[0]).play()

      animate()
    },
    undefined,
    function (e: any) {
      console.error(e)
    }
  )

  window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  function animate() {
    requestAnimationFrame(animate)

    const delta = clock.getDelta()

    mixer.update(delta)

    controls.update()

    stats.update()

    renderer.render(scene, camera)
  }
}
