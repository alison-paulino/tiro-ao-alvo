
const music = new Array();
music[0] = new Audio('./sound/crash.wav');
music[1] = new Audio('./sound/music-game.mp3');
music[2] = new Audio('./sound/game-over.wav');

music[0].volume = 0.25;
music[1].volume = 0.25;
music[2].volume = 0.25;

music[1].loop = true;