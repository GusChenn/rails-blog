import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["canvas"]

  connect() {
    this.gl = this.canvasTarget.getContext("webgl")
    if (!this.gl) {
      console.error("WebGL is not supported by your browser.")
      this.element.innerHTML = "<p>Sorry, WebGL is not supported by your browser.</p>"
      return
    }

    const vertexShaderSource = `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        vec3 color = 0.5 + 0.5 * cos(u_time + st.xyx + vec3(0.0, 2.0, 4.0));
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const vertexShader = this._createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = this._createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource)
    const program = this._createProgram(this.gl, vertexShader, fragmentShader)

    this.programInfo = {
      program,
      attribLocations: {
        position: this.gl.getAttribLocation(program, "a_position"),
      },
      uniformLocations: {
        resolution: this.gl.getUniformLocation(program, "u_resolution"),
        time: this.gl.getUniformLocation(program, "u_time"),
      },
    }

    this._initBuffers()
    this.renderLoop = this.render.bind(this)
    this.animationFrameId = requestAnimationFrame(this.renderLoop)
  }

  disconnect() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }

  render(time) {
    time *= 0.001 // convert to seconds

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    this.gl.useProgram(this.programInfo.program)

    this.gl.enableVertexAttribArray(this.programInfo.attribLocations.position)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
    this.gl.vertexAttribPointer(this.programInfo.attribLocations.position, 2, this.gl.FLOAT, false, 0, 0)

    this.gl.uniform2f(this.programInfo.uniformLocations.resolution, this.gl.canvas.width, this.gl.canvas.height)
    this.gl.uniform1f(this.programInfo.uniformLocations.time, time)

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)

    this.animationFrameId = requestAnimationFrame(this.renderLoop)
  }

  _initBuffers() {
    this.positionBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)
    const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW)
  }

  _createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader

    console.error(`Error compiling shader: ${gl.getShaderInfoLog(shader)}`)
    gl.deleteShader(shader)
  }

  _createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program

    console.error(`Error linking program: ${gl.getProgramInfoLog(program)}`)
    gl.deleteProgram(program)
  }
}
