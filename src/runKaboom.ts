import init from "./utils/init";
import { kaboomContext } from "./kaboomCtx";
import forestScene from "./scenes/Forest";
import townScene from "./scenes/Town";
import { MovePlayerKeyboard } from "./playerMovement";
import { setCamScale } from "./utils/set-camscale";
import { BoundaryProps } from "./types";
import { scaleFactor } from "./constants";

export default function runKaboom() {
  const k = kaboomContext;
  // Initialise the games scene, player, map, etc
  init(k);
  // Register all the scenes for the game
  // townScene(k);
  // forestScene(k);

  k.scene("town", async (spawnPoints) => {
    const mapData = await (await fetch("/assets/map/map.json")).json();
    const layers = mapData.layers;

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
        for (const boundary in layer.objects) {
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
          // Commented out boundary dialogue code

          if (currentBoundary.name) {
            player.onCollide(currentBoundary.name, () => {
              // player.isInDialogue = true;
              // displayDialogue(dialogueData[currentBoundary.name], () => {
              //   player.isInDialogue = false;
              // });
            });
          }
        }
        continue;
      }
      if (layer.name === "spawnpoints") {
        layer.objects.forEach((entity) => {
          if (entity.name === spawnPoints) {
            player.pos = k.vec2(
              (map.pos.x + entity.x) * scaleFactor,
              (map.pos.y + entity.y) * scaleFactor
            );
            k.add(player);
          }
        });
      }
      if (layer.name === "transitions") {
        for (const transitions in layer.objects) {
          const currentBoundary: BoundaryProps = layer.objects[transitions];
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
          // Commented out boundary dialogue code
          if (currentBoundary.name) {
            player.onCollide(currentBoundary.name, () => {
              k.go("forest");
            });
          }
        }
        continue;
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
  k.scene("forest", async () => {
    console.log("forest");
    const mapData = await (await fetch("/assets/map/forest.json")).json();
    const layers = mapData.layers;

    const map = k.add([k.sprite("forest"), k.pos(0), k.scale(scaleFactor)]);
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
        for (const boundary in layer.objects) {
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
      if (layer.name === "transitions") {
        for (const transitions in layer.objects) {
          const currentBoundary: BoundaryProps = layer.objects[transitions];
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
          // Commented out boundary dialogue code
          if (currentBoundary.name) {
            player.onCollide(currentBoundary.name, () => {
              console.log("transitioning..");
              k.go("town", "forest");
            });
          }
        }
        continue;
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
  k.go("town", "player");
}
