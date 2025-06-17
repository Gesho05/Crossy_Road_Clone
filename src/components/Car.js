import * as THREE from 'three';
import { tileSize } from '../constants';
import { Wheel } from './Wheel';

// Function to darken a color by a certain percentage
function darkenColor(color, percentage) {
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;

    const darken = (channel) => Math.max(0, Math.floor(channel * (1 - percentage)));

    const darkerColor = (darken(r) << 16) | (darken(g) << 8) | darken(b);
    return darkerColor;
}

export function Car(initialTileIndex, direction, color) {
    const car = new THREE.Group();
    car.position.x = initialTileIndex * tileSize;
    if (!direction) car.rotation.z = Math.PI;

    // Create the body of the car
    const main = new THREE.Mesh(
        new THREE.BoxGeometry(60, 30, 15),
        new THREE.MeshLambertMaterial({ color, flatShading: true })
    );
    main.position.z = 12;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main);

    // Create the line with a darker color
    const darkerColor = darkenColor(color, 0.2); // Darken by 20%
    const line = new THREE.Mesh(
        new THREE.BoxGeometry(61, 10, 16),
        new THREE.MeshLambertMaterial({ color: darkerColor, flatShading: true })
    );
    line.position.z = 12;
    line.castShadow = true;
    line.receiveShadow = true;
    car.add(line);

    // Create the upper part of the car
    const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(33, 24, 12),
        new THREE.MeshLambertMaterial({ color: "white", flatShading: true })
    );
    cabin.position.x = -6;
    cabin.position.z = 25.5;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add(cabin);

    const windows = new THREE.Mesh(
        new THREE.BoxGeometry(13, 25, 7),
        new THREE.MeshLambertMaterial({ color: "black", flatShading: true })
    );
    windows.position.x = 1;
    windows.position.z = 25.5;
    windows.castShadow = true;
    windows.receiveShadow = true;
    car.add(windows);

    const windows_back = new THREE.Mesh(
        new THREE.BoxGeometry(10, 25, 7),
        new THREE.MeshLambertMaterial({ color: "black", flatShading: true })
    );
    windows_back.position.x = -15;
    windows_back.position.z = 25.5;
    windows_back.castShadow = true;
    windows_back.receiveShadow = true;
    car.add(windows_back);

    const windows_middle = new THREE.Mesh(
        new THREE.BoxGeometry(34, 20, 7),
        new THREE.MeshLambertMaterial({ color: "black", flatShading: true })
    );
    windows_middle.position.x = -6;
    windows_middle.position.z = 25.5;
    windows_middle.castShadow = true;
    windows_middle.receiveShadow = true;
    car.add(windows_middle);

    const frontWheel = Wheel(18);
    car.add(frontWheel);

    const backWheel = Wheel(-18);
    car.add(backWheel);

    return car;
}