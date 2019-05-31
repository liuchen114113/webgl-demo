import React from 'react'
import './index.less'
import * as THREE from 'three'
import ThreeBox from '@/components/ThreeBox'

import vertexShader from '@/shaders/DemoPage/vertex.glsl'
import fragmentShader from '@/shaders/DemoPage/fragment.glsl'

import cloud from '@/assets/textures/leva/cloud.png'
import lavatile from '@/assets/textures/leva/lavatile.jpg'

class DemoPage extends ThreeBox {
  mesh: THREE.Mesh
  clock: THREE.Clock
  uniforms: any
  constructor(props) {
    super(props)
    this.clock = new THREE.Clock()
    this.uniforms = {
      fogDensity: { value: 0.45 },
      fogColor: { value: new THREE.Vector3(0, 0, 0) },
      time: { value: 1.0 },
      uvScale: { value: new THREE.Vector2(3.0, 1.0) }
    }
    this.mesh = null
  }

  componentDidMount() {
    const container = document.querySelector('#canvas')
    this.initThreeBox(container)
    this.addCube()
  }

  addCube = () => {
    let textureLoader = new THREE.TextureLoader()
    let { uniforms } = this
    uniforms = {
      ...uniforms,
      texture1: { value: textureLoader.load(cloud) },
      texture2: { value: textureLoader.load(lavatile) }
    }
    uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT =
      THREE.RepeatWrapping
    uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT =
      THREE.RepeatWrapping
    let material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    })

    this.mesh = new THREE.Mesh(
      new THREE.TorusBufferGeometry(0.65, 0.3, 30, 30),
      material
    )
    this.mesh.rotation.x = 0.3
    this.scene.add(this.mesh)

    this.animate()
    this.renderGL()
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    var delta = 5 * this.clock.getDelta()

    this.uniforms.time.value += 0.2 * delta

    this.mesh.rotation.y += 0.0125 * delta
    this.mesh.rotation.x += 0.05 * delta

    this.renderer.clear()
    this.renderGL()
  }
  render() {
    return <div id="canvas" className="canvas" />
  }
}

export default DemoPage
