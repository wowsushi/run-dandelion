const gamePlay = {
  key: 'gamePlay',
  preload: function(){
    this.load.image('bg1', 'images/bg/bg1.png');
    this.load.image('bg2', 'images/bg/bg2.png');
    this.load.image('bg3', 'images/bg/bg3.png');
    this.load.image('bg4', 'images/bg/bg4.png');
    this.load.image('footer', 'images/bg/footer.png');
    this.load.spritesheet('player', 'images/player.png', {frameWidth: 144, frameHeight: 120});

    this.load.image('monster11', 'images/item-level-1-branch.png')
    this.load.image('monster12', 'images/item-level-1-rock.png')
    this.load.image('monster21', 'images/item-level-2-smoke-lg.png')
    this.load.image('monster22', 'images/item-level-2-smoke-sm.png')
    this.load.image('monster31', 'images/item-level-3-fire-lg.png')
    this.load.image('monster32', 'images/item-level-3-fire-sm.png')
    this.load.image('endTitle', 'images/ui/txt-congratulations.png')
    this.load.image('btnPlayAgain', 'images/ui/btn-play-again.png')

    this.timeInt = 30;
    this.speedLV = 1;
    this.gameStop = false;
  },
  create: function(){
    this.bg4 = this.add.tileSprite( cw/2 , ch/2, cw, ch, 'bg4');
    this.bg3 = this.add.tileSprite( cw/2, ch/2, cw, ch, 'bg3');
    this.bg2 = this.add.tileSprite( cw/2, ch/2, cw, ch, 'bg2');
    this.bg1 = this.add.tileSprite( cw/2, ch/2, cw, ch, 'bg1');
    this.footer = this.add.tileSprite( cw/2, 404, cw, 90, 'footer');

    this.player = this.physics.add.sprite( 164, ch/2, 'player');
    this.player.setScale(0.7);
    this.player.setBounce(1);
    this.player.setCollideWorldBounds(true);

    this.physics.add.existing(this.footer);
    this.footer.body.immovable = true;
    this.footer.body.moves = false;

    this.physics.add.collider(this.player,this.footer);

    this.monster11 = this.physics.add.sprite( cw/2 , 65, 'monster11');
    this.monster11.setScale(0.8)
    this.physics.add.existing(this.monster11);
    this.monster11.body.immovable = true;
    this.monster11.body.moves = false;

    //時間控制
    this.TimeText = this.add.text(50, ch - 50, `Time: ${this.timeInt}`, { color: '#fff', fontSize: '30px' });

    let timer = setInterval(() => {
      this.timeInt--;
      this.TimeText.setText(`Time: ${this.timeInt}`);

      if (this.timeInt < 20 && this.timeInt > 10) {
        this.speedLV = 1.5;
      }
      if (this.timeInt < 10 && this.timeInt > 0) {
        this.speedLV = 2.5;
      }

      if (this.timeInt <= 0) {
        this.gameStop = true;
        this.player.setBounce(0);
        clearInterval(timer);

        this.endTitle = this.add.image(cw/2, 120, 'endTitle')
        this.endTitle.setScale(0.6)

        this.btnPlayAgain = this.add.image(cw/2, 240, 'btnPlayAgain');
        this.btnPlayAgain.setScale(0.6);
        this.btnPlayAgain.setInteractive();
        this.btnPlayAgain.on('pointerdown', () => {
          this.scene.start('gamePlay');
        })

        this.input.keyboard.on('keydown-SPACE', () => {
          this.scene.start('gamePlay');
        })
      }
    }, 1000);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player', {start: 2, end: 3}),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'speed',
      frames: this.anims.generateFrameNumbers('player', {start: 4, end: 5}),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'dead',
      frames: this.anims.generateFrameNumbers('player', {start: 6, end: 6}),
      frameRate: 3,
      repeat: -1
    });


  },
  update: function(){
    if (this.gameStop) return
    this.bg4.tilePositionX += 1 * this.speedLV;
    this.bg3.tilePositionX += 2 * this.speedLV;
    this.bg2.tilePositionX += 3 * this.speedLV;
    this.bg1.tilePositionX += 3 * this.speedLV;
    this.footer.tilePositionX += 3 * this.speedLV;
    this.monster11.PositionX -= 3 * this.speedLV;

    //鍵盤事件
    const keyboard = this.input.keyboard.createCursorKeys();

    if (keyboard.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play('speed', true);
      this.player.flipX = false;
      this.player.setSize(144, 120, 0)

    } else if (keyboard.left.isDown) {
      this.player.setVelocityX(-220)
      this.player.anims.play('speed', true);
      this.player.flipX = true;
      this.player.setSize(144, 120, 0)
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('run', true);
      this.player.flipX = false;
      this.player.setSize(114, 120, 0)
    }

    if (keyboard.up.isDown ) {
      if (this.isKeyJump) {
        this.isKeyJump = false;
        this.player.setVelocityY(-200);
        this.player.anims.play('jump', true);
      }
    } else {
      this.isKeyJump = true;
    }
  }
}
