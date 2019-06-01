export function createGLContext(domId) {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById(`${domId}`)
  )
  const gl: WebGLRenderingContext = canvas.getContext('webgl')
  return gl
}

/**
 * 创建shader
 */
export function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {
  const Shader: WebGLShader = gl.createShader(type)
  gl.shaderSource(Shader, source)
  gl.compileShader(Shader)
  if (gl.getShaderParameter(Shader, gl.COMPILE_STATUS)) {
    return Shader
  }
}

/**
 * 创建program
 */
export function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram {
  const Program: WebGLProgram = gl.createProgram()
  gl.attachShader(Program, vertexShader)
  gl.attachShader(Program, fragmentShader)
  gl.linkProgram(Program)
  if (gl.getProgramParameter(Program, gl.LINK_STATUS)) {
    return Program
  }
}

export function initVertexBuffers(gl, program, vertices, n) {
  //   let vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
  //   let n = 3 // The number of vertices

  // 创建缓冲区
  let vertexBuffer = gl.createBuffer()
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object')
    return -1
  }

  //  绑定缓冲区指针
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // 将数据写入缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  let a_Position = gl.getAttribLocation(program, 'a_Position')
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return -1
  }
  // 将缓存区对象分配给一个attribute变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

  // 启用缓冲区
  gl.enableVertexAttribArray(a_Position)

  return n
}
/**
 * 设置canvas像素和尺寸
 */
export function resizeCanvas(gl: WebGLRenderingContext) {
  const RealToCSSPixels: number = window.devicePixelRatio

  // 获取浏览器显示的画布的CSS像素值
  // 然后计算出设备像素设置drawingbuffer
  const DisplayWidth: number = Math.floor(
    gl.canvas.clientWidth * RealToCSSPixels
  )
  const DisplayHeight: number = Math.floor(
    gl.canvas.clientHeight * RealToCSSPixels
  )

  // 检查画布尺寸是否相同
  if (gl.canvas.width !== DisplayWidth || gl.canvas.height !== DisplayHeight) {
    // 设置为相同的尺寸
    gl.canvas.width = DisplayWidth
    gl.canvas.height = DisplayHeight
  }
}
