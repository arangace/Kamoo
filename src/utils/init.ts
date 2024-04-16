import { KaboomCtx } from "kaboom";
import { setCamScale } from "./set-camscale";

export default function init(context: KaboomCtx) {
  context.loadSprite("spritesheet", "./assets/spritesheet.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
      "idle-down": 936,
      "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
      "idle-side": 975,
      "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
      "idle-up": 1014,
      "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
    },
  });

  context.loadSprite("map", "./assets/map/map.png");

  context.setBackground(context.Color.fromHex("#311047"));
  // Resizing based on screen size
  setCamScale(context);
}
