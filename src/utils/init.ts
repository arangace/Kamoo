import { KaboomCtx } from "kaboom";
import { setCamScale } from "./set-camscale";

export default function init(context: KaboomCtx) {
  const characterSpriteOffset = 24;
  context.loadSprite("spritesheet", "./assets/spritesheet.png", {
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

  context.setBackground(context.Color.fromHex("#311047"));
  // Resizing based on screen size
  setCamScale(context);
}
