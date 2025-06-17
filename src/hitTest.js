import * as THREE from "three";
import { metadata as rows, coins, map } from "./components/Map";
import { player, position } from "./components/Player";

const resultDOM = document.getElementById("result-container");
const finalScoreDOM = document.getElementById("final-score");
const highestScoreDOM = document.getElementById("highest-score");
const highestScoreResultDOM = document.getElementById("highest-score-result");
const newHighScoreMessageDOM = document.getElementById("new-high-score-message");
const coinCounterDOM = document.getElementById("coin-counter");
const closeCallMessageDOM = document.getElementById("close-call-message"); // Added Close Call message

export let isGameOver = false;
export let collectedCoins = 0;
export let highestScore = 0;

export function resetGameOverFlag() {
  isGameOver = false;
}

export function hitTest() {
  if (isGameOver) return;

  const row = rows[position.currentRow - 1];
  if (!row) return;

  // Detect collision with vehicles
  if (row.type === "car" || row.type === "truck") {
    const playerBoundingBox = new THREE.Box3();
    playerBoundingBox.setFromObject(player);

    row.vehicles.forEach(({ ref }) => {
      if (!ref) throw Error("Vehicle reference is missing");

      const vehicleBoundingBox = new THREE.Box3();
      vehicleBoundingBox.setFromObject(ref);

      // Check for collision
      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        if (!resultDOM || !finalScoreDOM || !highestScoreResultDOM) return;

        const currentScore = position.currentRow;

        // Check if a new high score is achieved
        if (currentScore > highestScore) {
          highestScore = currentScore;
          newHighScoreMessageDOM.style.display = "block"; // Show "New High Score" message

          // Add exactly one point to the current score
          const scoreDOM = document.getElementById("score");
          if (scoreDOM) {
            const displayedScore = parseInt(scoreDOM.innerText.split(": ")[1], 10) || 0;
            scoreDOM.innerText = `Score: ${displayedScore + 1}`;
          }
        } else {
          newHighScoreMessageDOM.style.display = "none"; // Hide the message
        }

        // Update the result screen
        resultDOM.style.visibility = "visible";
        finalScoreDOM.innerText = currentScore.toString();
        highestScoreResultDOM.innerText = highestScore.toString();
        isGameOver = true;

        return;
      }

      // Check for near miss (player comes very close but doesn't collide)
      const nearMissDistance = 50; // Increased distance for near miss
      const vehicleCenter = vehicleBoundingBox.getCenter(new THREE.Vector3());
      const distanceToVehicle = playerBoundingBox.distanceToPoint(vehicleCenter);

      if (distanceToVehicle < nearMissDistance) {
        const scoreDOM = document.getElementById("score");
        if (scoreDOM) {
          const currentScore = parseInt(scoreDOM.innerText.split(": ")[1], 10) || 0;
          scoreDOM.innerText = `Score: ${currentScore + 1}`; // Add an extra point for the near miss

          // Display the "Close Call" message
          closeCallMessageDOM.style.display = "block";
          setTimeout(() => {
            closeCallMessageDOM.style.display = "none"; // Hide the message after 2 seconds
          }, 2000);
        }
      }
    });
  }

  // Detect collision with coins
  const playerBoundingBox = new THREE.Box3();
  playerBoundingBox.setFromObject(player);

  coins.forEach((coin, index) => {
    const coinBoundingBox = new THREE.Box3();
    coinBoundingBox.setFromObject(coin);

    if (playerBoundingBox.intersectsBox(coinBoundingBox)) {
      collectedCoins += 1;
      coinCounterDOM.innerText = collectedCoins.toString();
      map.remove(coin);
      coins.splice(index, 1);
    }
  });

  // Update the highest score during gameplay
  const currentScore = position.currentRow;
  if (currentScore > highestScore) {
    highestScore = currentScore;
    highestScoreDOM.innerText = `Highest: ${highestScore}`; // Update the text
  }
}