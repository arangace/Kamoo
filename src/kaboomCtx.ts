import { GameObj, KaboomCtx } from "kaboom";

interface Player extends GameObj {}

export let kaboomContext: KaboomCtx;
export let playerCharacter: Player;

export const setContext = (KContext: KaboomCtx) => {
  kaboomContext = KContext;
};
export const setPlayer = (player: Player) => {
  playerCharacter = player;
};
