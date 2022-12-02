import * as THREE from 'three'

export function useDemo1(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })

  const fov = 40
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 50, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  const scene = new THREE.Scene()

  // 光线
  const light = new THREE.PointLight(0xffffff, 3)
  scene.add(light)

  // 旋转列表
  const objects: Array<any> = []

  const radius = 1
  const widthSegments = 6
  const heightSegments = 6
  // 球形几何体
  const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
  sunMesh.scale.set(5, 5, 5)
  scene.add(sunMesh)
  objects.push(sunMesh)

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
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    objects.forEach(obj => {
      obj.rotation.y = time
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}
