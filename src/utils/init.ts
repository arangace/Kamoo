import { KaboomCtx } from "kaboom";
import { setCamScale } from "./set-camscale";
import { scaleFactor } from "../constants";
import { setPlayer } from "../kaboomCtx";

export default function init(context: KaboomCtx) {
  const characterSpriteOffset = 24;
  context.loadSprite("spritesheet", "/assets/spritesheet.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
      "idle-down": 936 + characterSpriteOffset,
      "walk-down": {
        from: 936 + characterSpriteOffset,
        to: 939 + characterSpriteOffset,
        loop: true,
        speed: 8,
      },
      "idle-side": 975 + characterSpriteOffset,
      "walk-side": {
        from: 975 + characterSpriteOffset,
        to: 978 + characterSpriteOffset,
        loop: true,
        speed: 8,
      },
      "idle-up": 1014 + characterSpriteOffset,
      "walk-up": {
        from: 1014 + characterSpriteOffset,
        to: 1017 + characterSpriteOffset,
        loop: true,
        speed: 8,
      },
    },
  });

  context.loadSprite("map", "./assets/map/map.png");
  context.loadSprite("forest", "./assets/map/forest.png");
  context.loadSound("town-music", "./assets/sound/just-relax.mp3");

  context.setBackground(context.Color.fromHex("#311047"));
  // Resizing based on screen size
  setCamScale(context);
  // Create the player
  const player = context.make([
    context.sprite("spritesheet", { anim: "idle-down" }),
    context.area({ shape: new context.Rect(context.vec2(0, 3), 10, 10) }),
    context.body(),
    context.anchor("center"),
    context.pos(),
    context.scale(scaleFactor),
    {
      speed: 250,
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ]);
  setPlayer(player);
}
