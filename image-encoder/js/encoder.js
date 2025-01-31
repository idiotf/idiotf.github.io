import * as util from "./webgl_utils.js";
var Options;
(function (Options) {
    Options.width = document.getElementById("width");
    Options.compression = document.getElementById("compression");
})(Options || (Options = {}));
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
button.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file)
        return fileInput.click();
    let blob;
    if (Options.compression.value != "none")
        try {
            const gzip = file.stream().pipeThrough(new CompressionStream(Options.compression.value));
            blob = await new Response(gzip).blob();
        }
        catch {
            return alert("Incorrect compression algorithm");
        }
    else
        blob = file;
    const data = new Uint8Array(await blob.arrayBuffer());
    const tempArr = [0, 0, 0, 0, ...data];
    canvas.width = +Options.width.value;
    canvas.height = Math.ceil(Math.ceil(tempArr.length / 3) / canvas.width);
    const random = new Array(canvas.width * canvas.height * 3 - tempArr.length).fill(null).map(() => data[Math.floor(Math.random() * data.length)]);
    view.setUint32(0, canvas.width * canvas.height * 3 - tempArr.length);
    tempArr.splice(0, 4, ...new Uint8Array(view.buffer));
    const arr = new Uint8Array([...tempArr, ...random]);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, canvas.width, canvas.height, 0, gl.RGB, gl.UNSIGNED_BYTE, arr);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);
    util.bindAttribute(gl, posAttribLoc, posBuffer, 2, gl.FLOAT, false, 0, 0);
    util.bindAttribute(gl, texAttribLoc, texBuffer, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.toBlob(async (blob) => {
        const blobURL = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobURL;
        anchor.download = file.name + ".png";
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(blobURL));
    }, "image/png", 1);
});
