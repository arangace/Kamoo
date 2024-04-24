import { GameObj } from "kaboom";
import { keyBoardSpeed } from "./constants";

// export const MovePlayer = (mouseButtonDown: any, player: GameObj) => {
//   //Check if the user is using the left mouse click and isn't currently locked in dialogue
//   if (mouseButtonDown !== "left" || player.isInDialogue) {
//     return;
//   }
//   const worldMousePos = k.toWorld(k.mousePos());
//   player.moveTo(worldMousePos, player.speed);

//   const mouseAngle = player.pos.angle(worldMousePos);
//   const lowerBound = 50;
//   const upperBound = 125;

//   // Walk Up
//   if (
//     mouseAngle > lowerBound &&
//     mouseAngle < upperBound &&
//     player.curAnim() !== "walk-up"
//   ) {
//     player.play("walk-up");
//     player.direction = "up";
//     return;
//   }
//   // Walk Down
//   if (
//     mouseAngle < -lowerBound &&
//     mouseAngle > -upperBound &&
//     player.curAnim() !== "walk-down"
//   ) {
//     player.play("walk-down");
//     player.direction = "down";
//     return;
//   }
//   // Walk Right
//   if (Math.abs(mouseAngle) > upperBound) {
//     player.flipX = false;
//     if (player.curAnim() !== "walk-side") player.play("walk-side");
//     player.direction = "right";
//     return;
//   }
//   // Walk Left
//   if (Math.abs(mouseAngle) < lowerBound) {
//     player.flipX = true;
//     if (player.curAnim() !== "walk-side") player.play("walk-side");
//     player.direction = "left";
//     return;
//   }
// };

export const MovePlayerKeyboard = (direction: string, player: GameObj) => {
  if (player.isInDialogue) {
    return;
  }
  // Walk Up
  if (direction === "up") {
    if (player.curAnim() !== "walk-up") player.play("walk-up");
    player.direction = "up";
    player.pos.y = player.pos.y - keyBoardSpeed();
    return;
  }
  // Walk Down
  else if (direction === "down") {
    if (player.curAnim() !== "walk-down") player.play("walk-down");
    player.pos.y = player.pos.y + keyBoardSpeed();
    player.direction = "down";
    return;
  }
  // Walk Right
  else if (direction === "right") {
    player.flipX = false;
    if (player.curAnim() !== "walk-side") player.play("walk-side");
    player.pos.x = player.pos.x + keyBoardSpeed();
    player.direction = "right";
    return;
  }
  // Walk Left
  else if (direction === "left") {
    player.flipX = true;
    if (player.curAnim() !== "walk-side") player.play("walk-side");
    player.pos.x = player.pos.x - keyBoardSpeed();
    player.direction = "left";
    return;
  } else {
    return;
  }
};
