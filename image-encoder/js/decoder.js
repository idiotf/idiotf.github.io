import * as util from "./webgl_utils.js";
const fileInput = document.getElementById("file");
const button = document.getElementById("encode");
const canvas = document.getElementById("output");
const gl = canvas.getContext("webgl");
const [vertexShaderSource, fragmentShaderSource] = await Promise.all([
    fetch("./shaders/main.vs").then(v => v.text()),
    fetch("./shaders/main.fs").then(v => v.text()),
]);
const vertexShader = util.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = util.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = util.createProgram(gl, vertexShader, fragmentShader);
const posAttribLoc = gl.getAttribLocation(program, "a_position");
const texAttribLoc = gl.getAttribLocation(program, "a_texCoord");
const posBuffer = util.createBuffer(gl, new Float32Array());
const texBuffer = util.createBuffer(gl, new Float32Array());
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1.0, -1.0,
    3.0, -1.0,
    -1.0, 3.0,
]), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0, 1.0,
    2.0, 1.0,
    0.0, -1.0,
]), gl.STATIC_DRAW);
const view = new DataView(new ArrayBuffer(4));
function getPixels(x, y, width, height) {
    const length = width * height * 4;
    const row = width * 4;
    const end = (height - 1) * row;
    const arr = new Uint8Array(length);
    const pixels = new Uint8Array(length);
    gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, arr);
    for (let i = 0; i < length; i += row) {
        pixels.set(arr.subarray(i, i + row), end - i);
    }
    return pixels;
}
button.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file)
        return fileInput.click();
    const fileURL = URL.createObjectURL(file);
    const image = new Image;
    image.src = fileURL;
    await new Promise(resolve => image.addEventListener("load", resolve));
    canvas.width = image.width;
    canvas.height = image.height;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);
    util.bindAttribute(gl, posAttribLoc, posBuffer, 2, gl.FLOAT, false, 0, 0);
    util.bindAttribute(gl, texAttribLoc, texBuffer, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    // const dataAlpha = new Uint8Array(canvas.width * canvas.height * 4);
    // gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, dataAlpha);
    const dataAlpha = getPixels(0, 0, canvas.width, canvas.height);
    const data = new Uint8Array(canvas.width * canvas.height * 3);
    for (let i = 0, j = 0; i < dataAlpha.length; i += 4, j += 3)
        data.set(dataAlpha.subarray(i, i + 3), j);
    const viewArr = new Uint8Array(view.buffer);
    viewArr.set(data.subarray(0, 4));
    const padding = view.getUint32(0);
    const dataPad = data.subarray(4, data.length - padding);
    const blob = new Blob([dataPad]);
    const blobURL = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = blobURL;
    anchor.download = file.name.replace(/\.([^\.]+)$/, "");
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(blobURL));
});
