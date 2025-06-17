import * as THREE from 'three';

export function DirectionalLight() {
    const dirLight = new THREE.DirectionalLight();
    dirLight.position.set(-100,-100,200); // Position the light above the scene
    dirLight.up.set(0, 0, 1); // Set the up direction of the light
    dirLight.castShadow = true; // Enable shadow casting

    dirLight.shadow.mapSize.width = 2048; // Set the size of the shadow map
    dirLight.shadow.mapSize.height = 2048; // Set the size of the shadow map

    dirLight.shadow.camera.up.set(0, 0, 1); // Set the up direction of the shadow camera
    dirLight.shadow.camera.left = -400; // Set the left boundary of the shadow camera
    dirLight.shadow.camera.right = 400; // Set the right boundary of the shadow camera
    dirLight.shadow.camera.top = 400; // Set the top boundary of the shadow camera
    dirLight.shadow.camera.bottom = -400; // Set the bottom boundary of the shadow camera
    dirLight.shadow.camera.near = 50; // Set the near clipping plane of the shadow camera
    dirLight.shadow.camera.far = 400; // Set the far clipping plane of the shadow camera

    return dirLight;
}