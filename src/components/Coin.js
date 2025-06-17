import * as THREE from "three";
import { tileSize } from "../constants";

export function Coin(tileIndex, rowIndex) {
  const coin = new THREE.Group(); // Create a group to hold all coin meshes

  // First mesh (left part of the coin)
  const left = new THREE.Mesh(
    new THREE.BoxGeometry(15, 10, 2),
    new THREE.MeshLambertMaterial({
        color: 0xffd700, // Gold color
      flatShading: true,
    })
  );
  left.position.z = 5; // Slightly above the ground
  left.castShadow = true;
  left.receiveShadow = true;
  coin.add(left); // Add the mesh to the coin group

  const right = new THREE.Mesh(
    new THREE.BoxGeometry(10, 15, 2),
    new THREE.MeshLambertMaterial({
      color: 0xffd700, // Gold color
      flatShading: true,
    })
  );
  right.position.z = 5; 
  right.castShadow = true;
  right.receiveShadow = true;
  coin.add(right);

  const light = new THREE.Mesh(
    new THREE.BoxGeometry(5, 15, 2),
    new THREE.MeshLambertMaterial({
      color: 0xffe863, // Gold color
      flatShading: true,
    })
  );
  light.position.z = 5.1;
  light.position.x = -2; 
  light.castShadow = true;
  light.receiveShadow = true;
  coin.add(light); 

  // Position the entire coin group
  coin.position.x = tileIndex * tileSize;
  coin.position.y = rowIndex * tileSize;

  return coin; // Return the coin group
}