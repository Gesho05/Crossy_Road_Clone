import * as THREE from "three";
import { tilesPerRow, tileSize, minTileIndex, maxTileIndex, extendedMinTileIndex, extendedMaxTileIndex } from "../constants";

export function Grass(rowIndex) {
  const grass = new THREE.Group();
  grass.position.y = rowIndex * tileSize;

  // Create the foundation for the entire row
  const foundationGeometry = new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3);

  // Create a material for the playable area
  const playableMaterial = rowIndex % 2 === 0 ? new THREE.MeshLambertMaterial({ color: 0xbaf455 }) : new THREE.MeshLambertMaterial({ color: 0xade34f });

  // Create a material for the extended area
  const extendedMaterial = new THREE.MeshLambertMaterial({ color: 0x95bf47});

  // Create the foundation mesh
  const foundation = new THREE.Mesh(foundationGeometry, playableMaterial);
  foundation.position.z = 1.5;
  foundation.receiveShadow = true;

  // Add the playable area
  const playableWidth = (maxTileIndex - minTileIndex + 1) * tileSize;
  const playableFoundation = new THREE.Mesh(
    new THREE.BoxGeometry(playableWidth, tileSize, 3),
    playableMaterial
  );
  playableFoundation.position.x = 0; // Center the playable area
  playableFoundation.position.z = 1.5;
  grass.add(playableFoundation);

  // Add the extended area on the left
  const leftWidth = (minTileIndex - extendedMinTileIndex) * tileSize;
  const leftFoundation = new THREE.Mesh(
    new THREE.BoxGeometry(leftWidth, tileSize, 3),
    extendedMaterial
  );
  leftFoundation.position.x = -playableWidth / 2 - leftWidth / 2; // Position to the left
  leftFoundation.position.z = 1.5;
  grass.add(leftFoundation);

  // Add the extended area on the right
  const rightWidth = (extendedMaxTileIndex - maxTileIndex) * tileSize;
  const rightFoundation = new THREE.Mesh(
    new THREE.BoxGeometry(rightWidth, tileSize, 3),
    extendedMaterial
  );
  rightFoundation.position.x = playableWidth / 2 + rightWidth / 2; // Position to the right
  rightFoundation.position.z = 1.5;
  grass.add(rightFoundation);

  return grass;
}