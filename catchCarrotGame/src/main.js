"use strict";
import * as sound from "./sound.js";
import PopUp from "./popUp.js";
import { GameBuilder, gameResult } from "./game.js";

const popUp = new PopUp();
const game = new GameBuilder()
  .withProgressTime(10) //
  .withCarrotCount(5)
  .withBugCount(4)
  .builder();

game.setGameResult(Result);

function Result(result) {
  if (result === gameResult.win) {
    sound.playwinBgm();
    popUp.creatMsg("YOU WIN 👏");
  } else if (result === gameResult.lose) {
    sound.playlostBgm();
    popUp.creatMsg("YOU LOST 🤣");
  } else {
    sound.playalert();
    popUp.creatMsg("REPLAY ?");
  }

  sound.stopbg();
}
popUp.setOnclick(() => {
  game.start();
});
