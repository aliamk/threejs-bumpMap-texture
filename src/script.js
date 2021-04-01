import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(5, 64, 64 );

// Texture Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('NormalMap.png')
normalTexture.repeat.x = 2
normalTexture.wrapS = THREE.Wrapping



// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 1
material.roughness = 0.8
material.normalMap = normalTexture
material.wireframe = false

material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight( 0x4b0082, 0.1)
pointLight.position.x = 10
pointLight.position.y = -6
pointLight.position.z = 4
pointLight.intensity = 0.5
scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
scene.add(pointLightHelper)

// Light 2 - blue
const pointLight2 = new THREE.PointLight(0x0000ff, 2)
pointLight2.position.set(0, 0, 0) //-1.86, 1, -1, -1.65
pointLight2.intensity = 1
scene.add(pointLight2)

const light1 = gui.addFolder('Light 2')
light1.add(pointLight2.position, 'x').min(-6).max(10).step(0.01)
light1.add(pointLight2.position, 'y').min(-5).max(10).step(0.01)
light1.add(pointLight2.position, 'z').min(-5).max(10).step(0.01)
light1.add(pointLight2, 'intensity').min(-5).max(10).step(0.01)

const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelper2)

// Light 3 - red
const light3 = gui.addFolder('Light 3')
const pointLight3 = new THREE.PointLight(0xFF0000, 2)
pointLight3.position.set(-6, 5, 5)
pointLight3.intensity = 0.23
scene.add(pointLight3)

const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
scene.add(pointLightHelper3)

const light3Color = {
  color: 0xff0000
}

light3.addColor(light3Color, 'color').onChange(() => {
  pointLight3.color.set(light3Color.color)
})

light3.add(pointLight3.position, 'x').min(-6).max(5).step(0.01)
light3.add(pointLight3.position, 'y').min(-5).max(5).step(0.01)
light3.add(pointLight3.position, 'z').min(-5).max(5).step(0.01)
light3.add(pointLight3, 'intensity').min(-5).max(5).step(0.01)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 20
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

 document.addEventListener('mousemove', onDocumentMouseMove)
 let mouseX = 0
 let mouseY = 0
 let targetX = 0
 let targetY = 0
 
 const windowX = window.innerWidth / 2;
 const windowY = window.innerHeight / 2;
 
 function onDocumentMouseMove(event) {
   mouseX = (event.clientX - windowX)
   mouseY = (event.clientY - windowY)
 }
 
 const updateSphere = (event) => {
   sphere.position.y = window.scrollY * .001
 }
 window.addEventListener('scroll', updateSphere)
 

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.position.z += -.004 * (targetY - sphere.position.y)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()