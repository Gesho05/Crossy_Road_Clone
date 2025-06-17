import * as THREE from "three";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import { metadata as rows, addRows } from "./Map";

export const player = Player();

function Player() {
  const player = new THREE.Group();

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(8, 9, 8),
    new THREE.MeshLambertMaterial({
      color: "white",
      flatShading: true,
    })
  );
  head.castShadow = true;
  head.receiveShadow = true;
  head.position.z = 17;
  head.position.y = 5;
  player.add(head);

  const cap = new THREE.Mesh(
    new THREE.BoxGeometry(2, 4, 2),
    new THREE.MeshLambertMaterial({
      color: 0xff5b24,
      flatShading: true,
    })
  );
  cap.position.z = 21;
  cap.castShadow = true;
  cap.receiveShadow = true;
  cap.position.y = 6;
  player.add(cap);

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(10, 16, 10),
    new THREE.MeshLambertMaterial({
      color: "white",
      flatShading: true,
    })
  );
  body.castShadow = true;
  body.receiveShadow = true;
  body.position.z = 8;
  player.add(body);

  const beak = new THREE.Mesh(
    new THREE.BoxGeometry(3, 4, 2),
    new THREE.MeshLambertMaterial({
      color: 0xf0619a,
      flatShading: true,
    })
  );
  beak.position.z = 16;
  beak.castShadow = true;
  beak.receiveShadow = true;
  beak.position.y = 10;
  player.add(beak);

  const wings = new THREE.Mesh(
    new THREE.BoxGeometry(12, 10, 8),
    new THREE.MeshLambertMaterial({
      color: "white",
      flatShading: true,
    })
  );
  wings.castShadow = true;
  //wings.receiveShadow = true;// can remove to look more detailed
  wings.position.z = 8;
  player.add(wings);
  
  const tail = new THREE.Mesh(
    new THREE.BoxGeometry(5, 16, 3),
    new THREE.MeshLambertMaterial({
      color: "white",
      flatShading: true,
    })
  );
  tail.castShadow = true;
  tail.receiveShadow = true;
  tail.position.y = -2;
  tail.position.z = 11.5;
  player.add(tail);

  const playerContainer = new THREE.Group();
  playerContainer.add(player);

  return playerContainer;
}

export const position = {
  currentRow: 0,
  currentTile: 0,
};

export const movesQueue = [];

export function initializePlayer() {
  // Initialize the Three.js player object
  player.position.x = 0;
  player.position.y = 0;
  player.children[0].position.z = 0;

  // Initialize metadata
  position.currentRow = 0;
  position.currentTile = 0;

  // Clear the moves queue
  movesQueue.length = 0;
}

export function queueMove(direction) {
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
    },
    [...movesQueue, direction]
  );

  if (!isValidMove) return;

  movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  if (direction === "forward") position.currentRow += 1;
  if (direction === "backward") position.currentRow -= 1;
  if (direction === "left") position.currentTile -= 1;
  if (direction === "right") position.currentTile += 1;

  // Add new rows if the player is running out of them
  if (position.currentRow > rows.length - 10) addRows();

  const scoreDOM = document.getElementById("score");
  if (scoreDOM) {
    const currentScore = parseInt(scoreDOM.innerText, 10) || 0;
    if (position.currentRow > currentScore) {
      scoreDOM.innerText = position.currentRow.toString();
    }
  }
}