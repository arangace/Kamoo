import { dialogueData, scaleFactor } from "./constants";
import init from "./utils/init";
import { k } from "./kaboomCtx";
import { displayDialogue } from "./utils/display-dialogue";
import { setCamScale } from "./utils/set-camscale";
import { MovePlayerKeyboard } from "./playerMovement";

type BoundaryProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
};

// Initialise the games scene, player, map, etc
init(k);

k.scene("main", async () => {
  const mapData = await (await fetch("./assets/map/map.json")).json();
  const layers: any = mapData.layers;

  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);
  const player = k.make([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10) }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor),
    {
      speed: 250,
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ]);
  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (let boundary in layer.objects) {
        const currentBoundary: BoundaryProps = layer.objects[boundary];
        map.add([
          k.area({
            shape: new k.Rect(
              k.vec2(0),
              currentBoundary.width,
              currentBoundary.height
            ),
          }),
          k.body({ isStatic: true }),
          k.pos(currentBoundary.x, currentBoundary.y),
          currentBoundary.name,
        ]);
        if (currentBoundary.name) {
          player.onCollide(currentBoundary.name, () => {
            player.isInDialogue = true;
            displayDialogue(dialogueData[currentBoundary.name], () => {
              player.isInDialogue = false;
            });
          });
        }
      }
      continue;
    }
    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  }

  k.onResize(() => {
    setCamScale(k);
  });
  // Camera movement
  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  // Player movement
  // Mouse movement
  // k.onMouseDown((mouseBtn) => MovePlayer(mouseBtn, player));
  // Left
  // k.onKeyDown("left", () => MovePlayerKeyboard("left", player));
  k.onKeyDown("a", () => MovePlayerKeyboard("left", player));
  // Right
  // k.onKeyDown("right", () => MovePlayerKeyboard("right", player));
  k.onKeyDown("d", () => MovePlayerKeyboard("right", player));
  // Up
  // k.onKeyDown("up", () => MovePlayerKeyboard("up", player));
  k.onKeyDown("w", () => MovePlayerKeyboard("up", player));
  // Down
  // k.onKeyDown("down", () => MovePlayerKeyboard("down", player));
  k.onKeyDown("s", () => MovePlayerKeyboard("down", player));

  function stopAnims() {
    if (player.direction === "down") {
      player.play("idle-down");
      return;
    }
    if (player.direction === "up") {
      player.play("idle-up");
      return;
    }

    player.play("idle-side");
  }

  k.onMouseRelease(stopAnims);
  k.onKeyRelease(() => {
    stopAnims();
  });
});

//Starts the game on the 'main' screen
k.go("main");
