import { WebGLRenderer, PerspectiveCamera, Scene, PointLight, Object3D, SphereGeometry, MeshPhongMaterial, Mesh } from 'three'
import { useEffect } from "react";
import resizeRendererToDisplaySize from '@utils/resizeRendererToDisplaySize'


export default function SolarSystem(canvasConRef: React.RefObject<HTMLDivElement>) {

    const rendered = new WebGLRenderer({
        antialias: true,
    })

    useEffect(() => {
        canvasConRef.current!.append(rendered.domElement)
    }, [])

    const scene = new Scene()
    const camera = new PerspectiveCamera(75, 2, 0.1, 100)
    camera.position.set(0, 50, 0)
    camera.up.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    // PointLight 点光源
    const light = new PointLight(0xffffff, 3)
    scene.add(light)

    const rotationObjs: Array<Mesh | Object3D> = []
    const solarSystem = new Object3D()
    scene.add(solarSystem)
    const erthSystem = new Object3D()
    erthSystem.position.x = 20
    solarSystem.add(erthSystem)
    const moonSystem = new Object3D()
    moonSystem.position.x = 3
    erthSystem.add(moonSystem)


    const sphereGeometry = new SphereGeometry(1, 6, 6)
    const sunMaterial = new MeshPhongMaterial({ emissive: 0xffff00 })
    const sunMesh = new Mesh(sphereGeometry, sunMaterial)
    sunMesh.scale.set(5, 5, 5)
    solarSystem.add(sunMesh)
    const erthMaterial = new MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 })
    const erthMesh = new Mesh(sphereGeometry, erthMaterial)
    erthSystem.add(erthMesh)
    const moonMaterial = new MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 })
    const moonMesh = new Mesh(sphereGeometry, moonMaterial)
    moonMesh.scale.set(.5, .5, .5)
    moonSystem.add(moonMesh)

    rotationObjs.push(solarSystem, erthSystem, sunMesh, erthMesh, moonMesh)

    function render(time: number) {
        if (resizeRendererToDisplaySize(rendered)) {
            const canvas = rendered.domElement
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix() //更新投影矩阵
        }

        rotationObjs.forEach((node) => {
            node.rotation.y = time / 1000
        })

        rendered.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}



