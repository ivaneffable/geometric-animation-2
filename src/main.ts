import './style.css'
import * as THREE from 'three'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
renderer.domElement.setAttribute('class', 'webgl')

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  500
)
camera.position.set(0, 0, 75)

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
})

const clock = new THREE.Clock()
const scene = new THREE.Scene()
scene.background = new THREE.Color('#353848')

const geometry = new THREE.SphereGeometry(1)
const materialRed = new THREE.MeshBasicMaterial({ color: '#EE9E9F' })
const materialWhite = new THREE.MeshBasicMaterial({ color: '#F5E8D3' })

const createSphereGroup = (material: THREE.MeshBasicMaterial) => {
  const spheres = []
  for (let i = 0; i < 10; i++) {
    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.x = i * 5 - 20
    scene.add(sphere)

    spheres.push(sphere)
  }

  return spheres
}

const animateSpheres = (
  spheres: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>[],
  index: number
) => {
  const elapsedTime = clock.getElapsedTime()
  spheres.forEach((s, i) => {
    s.position.z =
      10 * Math.cos(elapsedTime + (Math.PI / 6) * i + (Math.PI / 2) * index)
    s.position.y =
      10 * Math.sin(elapsedTime + (Math.PI / 6) * i + (Math.PI / 2) * index)
    s.scale.setScalar((s.position.z + 10) * 0.08)
  })
}

const sphereGroups: THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshBasicMaterial
>[][] = []
for (let i = 0; i < 5; i++) {
  const group = createSphereGroup(i % 2 === 0 ? materialRed : materialWhite)
  sphereGroups.push(group)
}

function animate() {
  requestAnimationFrame(animate)
  sphereGroups.forEach(animateSpheres)
  renderer.render(scene, camera)
}
animate()
