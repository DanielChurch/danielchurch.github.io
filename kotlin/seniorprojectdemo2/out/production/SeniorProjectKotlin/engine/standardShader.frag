precision highp float;

uniform vec3 cameraPosition;

uniform sampler2D materialTex;
uniform float materialShininess;
uniform vec3 materialSpecularColor;
uniform bool useLighting;

uniform struct Light {
    vec3 position;
    vec3 color;
    float attenuation;
    float ambientCoefficient;
} light;

varying vec3 surfacePos;
varying vec2 tex_coords;
varying vec3 normal;

void main(void) {
    vec4 surfaceColor = texture2D(materialTex, tex_coords);

    if (!useLighting) {
        gl_FragColor = surfaceColor;
        return;
    }

    vec3 surfaceToLight = normalize(light.position - surfacePos);
    vec3 surfaceToCamera = normalize(cameraPosition - surfacePos);

    // Ambient
    vec3 ambient = light.ambientCoefficient * surfaceColor.rgb * light.color;

    // Diffuse
    float diffuseCoefficient = max(0.0, dot(normal, surfaceToLight));
    vec3 diffuse = diffuseCoefficient * surfaceColor.rgb * light.color;

    // Specular
    float specularCoefficient = 0.0;
    if (diffuseCoefficient > 0.0) {
        specularCoefficient = pow(max(0.0, dot(surfaceToCamera, reflect(-surfaceToLight, normal))), materialShininess);
    }

    vec3 specular = specularCoefficient * materialSpecularColor * light.color;

    // Attenuation
    float distanceToLight = length(light.position - surfacePos);
    float attenuation = 1.0 / (1.0 + light.attenuation * distanceToLight * distanceToLight);

    // Linear color (color before gamma correction)
    vec3 linearColor = ambient + attenuation * (diffuse + specular);

    // Final color (after gamma correction)
    vec3 gamma = vec3(1.0 / 2.2);
    gl_FragColor = vec4(pow(linearColor, gamma), surfaceColor.a);
}