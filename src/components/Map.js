import * as THREE from "three";
import { generateRows } from "../utilities/generateRows";
import { Grass } from "./Grass";
import { Road } from "./Road";
import { Tree } from "./Tree";
import { Car } from "./Car";
import { Truck } from "./Truck";
import { Coin } from "./Coin"; // Import the Coin component

export const metadata = [];
export const map = new THREE.Group();
export const coins = []; // Track coins on the map

export function initializeMap() {
  // Remove all rows and coins
  metadata.length = 0;
  coins.length = 0;
  map.remove(...map.children);

  // Add new rows
  for (let rowIndex = 0; rowIndex > -10; rowIndex--) {
    const grass = Grass(rowIndex);
    map.add(grass);
  }
  addRows();
}

export function addRows() {
  const newMetadata = generateRows(20);

  const startIndex = metadata.length;
  metadata.push(...newMetadata);

  newMetadata.forEach((rowData, index) => {
    const rowIndex = startIndex + index + 1;

    if (rowData.type === "forest") {
      const row = Grass(rowIndex);

      rowData.trees.forEach(({ tileIndex, height }) => {
        const tree = Tree(tileIndex, height);
        row.add(tree);
      });

      map.add(row);
    }

    if (rowData.type === "car") {
      const row = Road(rowIndex);

      rowData.vehicles.forEach((vehicle) => {
        const car = Car(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        vehicle.ref = car;
        row.add(car);
      });

      map.add(row);
    }

    if (rowData.type === "truck") {
      const row = Road(rowIndex);

      rowData.vehicles.forEach((vehicle) => {
        const truck = Truck(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        vehicle.ref = truck;
        row.add(truck);
      });

      map.add(row);
    }

    // Spawn one coin per row, avoiding trees
    if (rowData.type === "forest" || rowData.type === "grass") {
      const occupiedTiles = rowData.trees?.map((tree) => tree.tileIndex) || [];
      let tileIndex;

      do {
        tileIndex = THREE.MathUtils.randInt(-8, 8); // Restrict coins to playable area
      } while (occupiedTiles.includes(tileIndex)); // Ensure the coin doesn't spawn on a tree

      const coin = Coin(tileIndex, rowIndex);
      coins.push(coin); // Track the coin
      map.add(coin); // Add the coin to the map
    }
  });
}