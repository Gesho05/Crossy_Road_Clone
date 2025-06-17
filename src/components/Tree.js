import * as THREE from "three";
import { tileSize } from "../constants";

export function Tree(tileIndex, height) {
  const tree = new THREE.Group();
  tree.position.x = tileIndex * tileSize;

  const trunk = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 20),
    new THREE.MeshLambertMaterial({
      color: 0x4d2926,
      flatShading: true,
    })
  );
  trunk.position.z = 10;
  tree.add(trunk);

  const crown = new THREE.Mesh(
    new THREE.BoxGeometry(30, 30, height),
    new THREE.MeshLambertMaterial({
      color: 0x7aa21d,
      flatShading: true,
    })
  );
  crown.position.z = height / 2 + 20;
  crown.castShadow = true;
  crown.receiveShadow = true;
  tree.add(crown);

  const shadow = new THREE.Mesh(
    new THREE.BoxGeometry(31, 31, 5),
    new THREE.MeshLambertMaterial({
      color: 0x6c8f1b,
      flatShading: true,
    })
  );
  shadow.position.z = height / 2 + 10;
  shadow.castShadow = true;
  shadow.receiveShadow = true;
  tree.add(shadow);

  const shadow1 = new THREE.Mesh(
    new THREE.BoxGeometry(31, 31, 5),
    new THREE.MeshLambertMaterial({
      color: 0x6c8f1b,
      flatShading: true,
    })
  );
  shadow1.position.z = height / 2 + 30;
  shadow1.castShadow = true;
  shadow1.receiveShadow = true;
  tree.add(shadow1);

  return tree;
}