import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { DirectionalLight } from "./components/DirectionalLight";
import { player, initializePlayer } from "./components/Player";
import { map, initializeMap } from "./components/Map";
import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import { hitTest, resetGameOverFlag, highestScore } from "./hitTest";
import "./style.css";
import "./collectUserInput";

document.querySelector("#retry")?.addEventListener("click", () => {
  initializeGame();
  resetGameOverFlag();
});

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
dirLight.target = player;
player.add(dirLight);

const camera = Camera();
player.add(camera);

const scoreDOM = document.getElementById("score");
const highestScoreDOM = document.getElementById("highest-score");
const resultDOM = document.getElementById("result-container");

initializeGame();

document.querySelector("#retry")?.addEventListener("click", initializeGame);

function initializeGame() {
  initializePlayer();
  initializeMap();

  // Initialize UI
  if (scoreDOM) scoreDOM.innerText = "Score: 0";
  if (highestScoreDOM) highestScoreDOM.innerText = `Highest: ${highestScore}`;
  if (resultDOM) resultDOM.style.visibility = "hidden";

  // Show welcome message
  showWelcomeMessage();
}

function showWelcomeMessage() {
  const welcomeMessage = document.getElementById("welcome-message");
  const closeButton = document.getElementById("close-welcome-message");

  if (welcomeMessage) {
    welcomeMessage.style.display = "block";

    // Allow the user to close the message manually
    closeButton.addEventListener("click", () => {
      welcomeMessage.style.display = "none";
    });

    // Automatically hide the message after 3 seconds
    setTimeout(() => {
      welcomeMessage.style.display = "none";
    }, 3000);
  }
}

const renderer = Renderer();
renderer.setAnimationLoop(animate);

function animate() {
  animateVehicles();
  animatePlayer();
  hitTest();

  renderer.render(scene, camera);
}