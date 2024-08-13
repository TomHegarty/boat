in vec3 out_localSpacePosition; // Input variable from vertex shader

varying vec2 vUvs;
uniform sampler2D diffuse;

void main() {

    vec3 localSpacePosition = out_localSpacePosition;

    vec3 color = vec3(0.0);

    vec3 darkBlue = vec3(0.0, 0.1, 0.9);
    vec3 blue = vec3(0.0, 0.5, 1.0);
    vec3 white = vec3(1.0, 1.0, 1.0);

    color = mix(darkBlue, white, localSpacePosition.z + 0.2);

    gl_FragColor = vec4(color  ,1.0);
    gl_FragColor = vec4(color  ,1.0);
}
