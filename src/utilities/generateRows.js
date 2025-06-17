import * as THREE from "three";
import { minTileIndex, maxTileIndex } from "../constants";

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateForesMetadata() {
  const occupiedTiles = new Set();
  const trees = Array.from({ length: 4 }, () => {
    let tileIndex;
    do {
      tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex); // Restrict trees to playable area
    } while (occupiedTiles.has(tileIndex));
    occupiedTiles.add(tileIndex);

    const height = randomElement([20, 45, 60]);

    return { tileIndex, height };
  });

  return { type: "forest", trees };
}

function generateCarLaneMetadata() {
  const direction = randomElement([true, false]);
  const speed = randomElement([125, 156, 188]);

  const occupiedTiles = new Set();

  const vehicles = Array.from({ length: 3 }, () => {
    let initialTileIndex;
    do {
      initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex); // Restrict vehicles to playable area
    } while (occupiedTiles.has(initialTileIndex));
    occupiedTiles.add(initialTileIndex - 1);
    occupiedTiles.add(initialTileIndex);
    occupiedTiles.add(initialTileIndex + 1);

    const color = randomElement([0xa52523, 0xbdb638, 0x78b14b]);

    return { initialTileIndex, color };
  });

  return { type: "car", direction, speed, vehicles };
}

function generateTruckLaneMetadata() {
  const direction = randomElement([true, false]);
  const speed = randomElement([125, 156, 188]);

  const occupiedTiles = new Set();

  const vehicles = Array.from({ length: 2 }, () => {
    let initialTileIndex;
    do {
      initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex); // Restrict vehicles to playable area
    } while (occupiedTiles.has(initialTileIndex));
    occupiedTiles.add(initialTileIndex - 2);
    occupiedTiles.add(initialTileIndex - 1);
    occupiedTiles.add(initialTileIndex);
    occupiedTiles.add(initialTileIndex + 1);
    occupiedTiles.add(initialTileIndex + 2);

    const color = randomElement([0xa52523, 0xbdb638, 0x78b14b]);

    return { initialTileIndex, color };
  });

  return { type: "truck", direction, speed, vehicles };
}

export function generateRows(count) {
  const rows = [];
  let consecutiveRoadCount = 0; // Track consecutive road rows

  for (let i = 0; i < count; i++) {
    let rowType;

    // Ensure no more than 4 consecutive road rows
    if (consecutiveRoadCount >= 4) {
      rowType = "forest"; // Force a non-road row
      consecutiveRoadCount = 0; // Reset the counter
    } else {
      rowType = randomElement(["forest", "car", "truck"]);
      if (rowType === "car" || rowType === "truck") {
        consecutiveRoadCount++; // Increment road counter
      } else {
        consecutiveRoadCount = 0; // Reset road counter for non-road rows
      }
    }

    if (rowType === "forest") rows.push(generateForesMetadata());
    if (rowType === "car") rows.push(generateCarLaneMetadata());
    if (rowType === "truck") rows.push(generateTruckLaneMetadata());
  }

  return rows;
}