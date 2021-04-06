"use strict";

const clickDown = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3"
);
const clickUp = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3"
);
const bg = new Audio("sound/bg.mp3");
const winBgm = new Audio("sound/game_win.mp3");
const lostBgm = new Audio("sound/lost.mp3");
const alert = new Audio("sound/alert.wav");
const carrotPull = new Audio("sound/carrot_pull.mp3");

export function PlayclickDown() {
  playSound(clickDown);
}
export function PlayclickUp() {
  playSound(clickUp);
}

export function Playbg() {
  playSound(bg);
}

export function stopbg() {
  stopSound(bg);
}
export function playwinBgm() {
  playSound(winBgm);
}
export function playlostBgm() {
  playSound(lostBgm);
}
export function playalert() {
  playSound(alert);
}
export function playcarrotPull() {
  playSound(carrotPull);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
