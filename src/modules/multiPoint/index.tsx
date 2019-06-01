import React, { Component } from 'react'
import {
  createGLContext,
  createShader,
  createProgram,
  initVertexBuffers
} from '@/components/WebGL'

import vertexShader from '@/shaders/init/vertex.glsl'
import fragmentShader from '@/shaders/init/fragment.glsl'
import './index.less'

export default class MultiPoint extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const gl = createGLContext('canvas-01')
    // 创建顶点着色器
    const vShader: WebGLShader = createShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShader
    )
    // 创建片段着色器
    const fShader: WebGLShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShader
    )

    // 创建着色程序
    const program: WebGLProgram = createProgram(gl, vShader, fShader)
    // resizeCanvas(gl)
    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
    const n = initVertexBuffers(gl, program, vertices, 3)
    if (n < 0) {
      console.log('Failed to set the positions of the vertices')
      return
    }
    // 使用着色程序
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.drawArrays(gl.POINTS, 0, n)

    // // 获取顶点属性的指针
    // const Location_attr_position: number = gl.getAttribLocation(
    //   program,
    //   'a_position'
    // )
    // // 获取全局变量的指针
    // const Location_uni_resolution: WebGLUniformLocation = gl.getUniformLocation(
    //   program,
    //   'u_resolution'
    // )

    // // 创建缓冲区
    // const Buffer_postion: WebGLBuffer = gl.createBuffer()
    // // 绑定缓冲区指针
    // gl.bindBuffer(gl.ARRAY_BUFFER, Buffer_postion)
    // // 将顶点数据写入缓冲区
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)

    // resizeCanvas(gl)
    // // 设置视图区域
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    // // 使用着色程序
    // gl.useProgram(program)
    // // 设置全局变量值
    // gl.uniform2f(Location_uni_resolution, gl.canvas.width, gl.canvas.height)
    // // 启用缓冲区
    // gl.enableVertexAttribArray(Location_attr_position)
    // // 设置缓冲区读取规则  将缓存区对象分配给一个attribute变量
    // gl.vertexAttribPointer(Location_attr_position, 2, gl.FLOAT, false, 0, 0)

    // gl.clearColor(0, 0, 0, 0)
    // gl.clear(gl.COLOR_BUFFER_BIT)
    // // 绘制
    // gl.drawArrays(gl.LINE_STRIP, 0, ~~(data.length / 2))
  }

  render() {
    return <canvas id="canvas-01" className="canvas" />
  }
}
