import * as THREE from "three";
import { tilesPerRow, tileSize, minTileIndex, maxTileIndex, extendedMinTileIndex, extendedMaxTileIndex } from "../constants";

export function Road(rowIndex) {
  const road = new THREE.Group();
  road.position.y = rowIndex * tileSize;

  // Create a material for the playable area
  const playableMaterial = new THREE.MeshLambertMaterial({ color: 0x454a59 });

  // Create a material for the extended area
  const extendedMaterial = new THREE.MeshLambertMaterial({ color: 0x2c2f38 });

  // Add the playable area
  const playableWidth = (maxTileIndex - minTileIndex + 1) * tileSize;
  const playableFoundation = new THREE.Mesh(
    new THREE.PlaneGeometry(playableWidth, tileSize),
    playableMaterial
  );
  playableFoundation.position.x = 0; // Center the playable area
  playableFoundation.receiveShadow = true;
  road.add(playableFoundation);

  // Add the extended area on the left
  const leftWidth = (minTileIndex - extendedMinTileIndex) * tileSize;
  const leftFoundation = new THREE.Mesh(
    new THREE.PlaneGeometry(leftWidth, tileSize),
    extendedMaterial
  );
  leftFoundation.position.x = -playableWidth / 2 - leftWidth / 2; // Position to the left
  leftFoundation.receiveShadow = true;
  road.add(leftFoundation);

  // Add the extended area on the right
  const rightWidth = (extendedMaxTileIndex - maxTileIndex) * tileSize;
  const rightFoundation = new THREE.Mesh(
    new THREE.PlaneGeometry(rightWidth, tileSize),
    extendedMaterial
  );
  rightFoundation.position.x = playableWidth / 2 + rightWidth / 2; // Position to the right
  rightFoundation.receiveShadow = true;
  road.add(rightFoundation);

  // Create the dashed lane separator for the playable area
  const dashedLineMaterial = new THREE.LineDashedMaterial({
    color: 0xffffff,
    dashSize: 10, // Length of each dash
    gapSize: 5,   // Gap between dashes
  });

  const dashedLineGeometry = new THREE.BufferGeometry();
  const points = [
    new THREE.Vector3(-playableWidth / 2, 0, 0.1), // Start point
    new THREE.Vector3(playableWidth / 2, 0, 0.1),  // End point
  ];
  dashedLineGeometry.setFromPoints(points);

  const distances = [];
  for (let i = 0; i < points.length - 1; i++) {
    distances.push(points[i].distanceTo(points[i + 1]));
  }
  dashedLineGeometry.setAttribute('lineDistance', new THREE.Float32BufferAttribute(distances, 1));

  const dashedLine = new THREE.LineSegments(dashedLineGeometry, dashedLineMaterial);
  dashedLine.position.y = tileSize / 2; // Place it at the end of the road
  road.add(dashedLine);

  // Create dashed lines for the extended areas
  const extendedDashedLineGeometryLeft = new THREE.BufferGeometry();
  const extendedPointsLeft = [
    new THREE.Vector3(-playableWidth / 2 - leftWidth, 0, 0.1), // Start point
    new THREE.Vector3(-playableWidth / 2, 0, 0.1),             // End point
  ];
  extendedDashedLineGeometryLeft.setFromPoints(extendedPointsLeft);

  const extendedDashedLineLeft = new THREE.LineSegments(extendedDashedLineGeometryLeft, dashedLineMaterial);
  extendedDashedLineLeft.position.y = tileSize / 2; // Place it at the end of the road
  road.add(extendedDashedLineLeft);

  const extendedDashedLineGeometryRight = new THREE.BufferGeometry();
  const extendedPointsRight = [
    new THREE.Vector3(playableWidth / 2, 0, 0.1),              // Start point
    new THREE.Vector3(playableWidth / 2 + rightWidth, 0, 0.1), // End point
  ];
  extendedDashedLineGeometryRight.setFromPoints(extendedPointsRight);

  const extendedDashedLineRight = new THREE.LineSegments(extendedDashedLineGeometryRight, dashedLineMaterial);
  extendedDashedLineRight.position.y = tileSize / 2; // Place it at the end of the road
  road.add(extendedDashedLineRight);

  return road;
}