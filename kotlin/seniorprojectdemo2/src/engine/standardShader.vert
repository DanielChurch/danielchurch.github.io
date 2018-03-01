precision mediump float;

attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_tex_coords;

uniform mat4 projectionMatrix;
uniform mat4 vMat;
uniform mat4 viewMatrix;
uniform mat4 normMat;

varying vec3 surfacePos;
varying vec2 tex_coords;
varying vec3 normal;

void main(void) {
    normal = -normalize(normMat * vec4(a_normal, 1.0)).xyz;
    tex_coords = a_tex_coords;
    surfacePos = vec3(vMat * vec4(a_position.xyz, 1.0));
    gl_Position = projectionMatrix * viewMatrix * vec4(surfacePos, 1.0);
}