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

export function Truck(initialTileIndex, direction, color) {
    const truck = new THREE.Group();
    truck.position.x = initialTileIndex * tileSize;
    if (!direction) truck.rotation.z = Math.PI;

    // Create the cargo part of the truck
    const cargo = new THREE.Mesh(
        new THREE.BoxGeometry(70, 35, 35),
        new THREE.MeshLambertMaterial({ color: 0xb4c6fc, flatShading: true })
    );
    cargo.position.x = -15;
    cargo.position.z = 25;
    cargo.castShadow = true;
    cargo.receiveShadow = true;
    truck.add(cargo);

    const cargo_line1 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 36, 36),
        new THREE.MeshLambertMaterial({ color: 0x99a6cf, flatShading: true })
    );
    cargo_line1.position.x = -30;
    cargo_line1.position.z = 25;
    cargo_line1.castShadow = true;
    cargo_line1.receiveShadow = true;
    truck.add(cargo_line1);

    const cargo_line2 = new THREE.Mesh(
        new THREE.BoxGeometry(10, 36, 36),
        new THREE.MeshLambertMaterial({ color: 0x99a6cf, flatShading: true })
    );
    cargo_line2.position.x = 0;
    cargo_line2.position.z = 25;
    cargo_line2.castShadow = true;
    cargo_line2.receiveShadow = true;
    truck.add(cargo_line2);

    // Create the cabin of the truck
    const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(25, 30, 30),
        new THREE.MeshLambertMaterial({ color, flatShading: true })
    );
    cabin.position.x = 30;
    cabin.position.z = 20;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    truck.add(cabin);

    // Create the front part of the truck
    const front = new THREE.Mesh(
        new THREE.BoxGeometry(30, 30, 15),
        new THREE.MeshLambertMaterial({ color, flatShading: true })
    );
    front.position.x = 35;
    front.position.z = 15;
    front.castShadow = true;
    front.receiveShadow = true;
    truck.add(front);

    // Create the line with a darker color
    const darkerColor = darkenColor(color, 0.2); // Darken by 20%
    const line = new THREE.Mesh(
        new THREE.BoxGeometry(31, 20, 16),
        new THREE.MeshLambertMaterial({ color: darkerColor, flatShading: true })
    );
    line.position.x = 35;
    line.position.z = 15;
    line.castShadow = true;
    line.receiveShadow = true;
    truck.add(line);

    const windows = new THREE.Mesh(
        new THREE.BoxGeometry(14, 31, 8),
        new THREE.MeshLambertMaterial({ color: "black", flatShading: true })
    );
    windows.position.x = 32;
    windows.position.z = 28;
    windows.castShadow = true;
    windows.receiveShadow = true;
    truck.add(windows);

    const windows_front = new THREE.Mesh(
        new THREE.BoxGeometry(22, 22, 8),
        new THREE.MeshLambertMaterial({ color: "black", flatShading: true })
    );
    windows_front.position.x = 32;
    windows_front.position.z = 28;
    windows_front.castShadow = true;
    windows_front.receiveShadow = true;
    truck.add(windows_front);


    // Add wheels
    const frontWheel = Wheel(37);
    truck.add(frontWheel);

    const middleWheel = Wheel(5);
    truck.add(middleWheel);

    const backWheel = Wheel(-35);
    truck.add(backWheel);

    return truck;
}