/*
 * @Author: chen.liu
 * @LastEditors: chen.liu
 * @Description: ThreeBox是基类，封装了Three渲染容器的一些基本方法
 * @Date: 2019-05-30 19:16:15
 * @LastEditTime: 2019-05-31 19:45:58
 */

import { Component } from 'react'
import * as THREE from 'three'
import Orbitcontrols from 'three-orbitcontrols'
export default class extends Component {
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  raycaster: THREE.Raycaster
  container: HTMLBodyElement
  camera: THREE.PerspectiveCamera
  orbitControls: any

  constructor(props) {
    super(props)
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer()
    this.raycaster = new THREE.Raycaster()
    this.raycaster.params.Points.threshold = 0.1
  }

  /**
   * @description:初始化three场景
   * @param {type}
   * @return:
   */
  initThreeBox = dom => {
    this.container = dom
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    this.camera = new THREE.PerspectiveCamera(35, width / height, 1, 3000)
    this.camera.position.z = 4

    const { container, camera, scene, renderer } = this
    camera.lookAt(scene.position)
    renderer.setPixelRatio(window.devicePixelRatio) // 设置设备像素比，防止高清设备模糊输出
    renderer.setClearColor(new THREE.Color(0x000000))
    renderer.setSize(width, height)

    /* 旋转，缩放控制器 */
    this.orbitControls = new Orbitcontrols(camera, container)
    this.orbitControls.addEventListener('change', this.renderGL)

    container.appendChild(renderer.domElement)

    this.renderGL()
    window.addEventListener('resize', this.resizeWindow)
  }

  /**
   * @description:重新设置three容器大小
   * @param {type}
   * @return:
   */
  resizeWindow = () => {
    const { camera, renderer, container } = this
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderGL()
  }
  /* 渲染/重绘 WebGL */
  renderGL = () => {
    const { renderer, scene, camera } = this
    renderer.render(scene, camera)
  }
  /**
   * @description: 移除监听事件
   * @param {type}
   * @return:
   */
  removeEvent = () => {
    window.removeEventListener('resize', this.resizeWindow, false)
  }
}
