const gameStart = {
  key: 'gameStart',
  preload: function(){
    this.load.image('bg1', 'images/bg/bg1.png');
    this.load.image('bg2', 'images/bg/bg2.png');
    this.load.image('bg3', 'images/bg/bg3.png');
    this.load.image('bg4', 'images/bg/bg4.png');
    this.load.image('footer', 'images/bg/footer.png');

    this.load.image('logo', 'images/ui/txt-title.png');
    this.load.image('btnStart', 'images/ui/btn-press-start.png');
    this.load.image('playerEnd', 'images/ui/player-end.png');

  },
  create: function(){
    this.bg4 = this.add.tileSprite( cw/2 , ch/2, cw, ch, 'bg4');
    this.bg3 = this.add.tileSprite( cw/2, ch/2, cw, ch, 'bg3');
    this.bg2 = this.add.tileSprite( cw/2, ch/2, cw, ch, 'bg2');
    this.bg1 = this.add.tileSprite( cw/2, ch/2, cw, ch, 'bg1');
    this.footer = this.add.tileSprite( cw/2, 404, cw, 90, 'footer');

    this.logo = this.add.image(cw/2, 120, 'logo')
    this.logo.setScale(0.6)

    this.btnStart = this.add.image(cw/2, 240, 'btnStart');
    this.btnStart.setScale(0.6);
    this.btnStart.setInteractive();
    this.btnStart.on('pointerdown', () => {
      this.scene.start('gamePlay');
    })

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('gamePlay');
    })

    this.playerEnd = this.add.image(cw/2, 320, 'playerEnd')
    this.playerEnd.setScale(0.4)


  },
  update: function(){
    this.bg4.tilePositionX += 1
    this.bg3.tilePositionX += 2
    this.bg2.tilePositionX += 3
    this.bg1.tilePositionX += 3
    this.footer.tilePositionX += 3

  }
}
