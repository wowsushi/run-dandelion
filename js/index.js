const config = {
  type: Phaser.AUTO,
  width: cw,
  height: ch,
  parent: 'app',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 700
      },
      //debug: true
    }
  },
  scene: [
    gameStart,
    gamePlay
  ]
}

const game = new Phaser.Game(config);
