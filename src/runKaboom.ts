import init from "./utils/init";
import { kaboomContext } from "./kaboomCtx";
import forestScene from "./scenes/Forest";
import TownScene from "./scenes/Town";

export default function runKaboom() {
  const k = kaboomContext;
  // Initialise the games scene, player, map, etc
  init(k);
  // Register all the scenes for the game
  TownScene(k);
  forestScene(k);
  //Starts the game on the 'main' screen
  k.go("town", "player");
}
