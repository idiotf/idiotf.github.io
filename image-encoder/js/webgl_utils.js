/**
 * Create a shader.
 * @param gl The WebGL context.
 * @param type The type of the shader.
 * @param source The source of the shader.
 */
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    if (!shader)
        throw new TypeError("Shader create failed.");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success)
        return shader;
    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw error;
}
/**
 * Create a program.
 *
 * @example
 *  const [vertexShader, fragmentShader] = await getShaderById(gl, "example");
 *  const program = createProgram(gl, vertexShader, fragmentShader);
 * @param gl The WebGL context.
 * @param vertexShader The vertex shader.
 * @param fragmentShader The fragment shader.
 */
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    if (!program)
        throw new TypeError("Program create failed.");
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success)
        return program;
    const error = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw error;
}
/**
 * Create a buffer.
 * @param gl The WebGL context.
 * @param data The typed array.
 */
function createBuffer(gl, data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return buffer;
}
/**
 * Create a texture.
 * @param gl The WebGL context.
 * @param image The image.
 * @param mipmap
 */
function createTexture(gl, image, mipmap, minFilter, magFilter) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    if (mipmap) {
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter || gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter || gl.LINEAR);
    }
    else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter || gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter || gl.LINEAR);
    }
    return texture;
}
/**
 * Bind the attribute.
 * @param gl The WebGL context.
 * @param location The location of the attribute.
 * @param buffer The buffer.
 * @param size The size of vertex.
 * @param type The type of the buffer.
 * @param normalized Whether to normalize the data.
 * @param stride
 * @param offset
 */
function bindAttribute(gl, location, buffer, size, type, normalized, stride, offset) {
    gl.enableVertexAttribArray(location);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
}
/**
 * Load uniforms.
 * @param gl The WebGL context.
 * @param program The program.
 * @param list Uniforms list.
 */
function loadUniformLocations(gl, program, [...list]) {
    return Object.fromEntries(list.map((name, i) => [list[i], gl.getUniformLocation(program, name)]));
}
export { createShader, createProgram, createBuffer, createTexture, bindAttribute, loadUniformLocations };
