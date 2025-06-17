import * as THREE from 'three';

export function Renderer() {
    // get the canvas element from the the html
    const canvas = document.querySelector("canvas.game");
    if (!canvas) {
        throw new Error("Canvas element not found");
    }

    const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true,
    canvas: canvas 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // enable shadow map

    return renderer
}