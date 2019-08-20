const getRandom = (max, min) =>{
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const gamePlay = {
  key: 'gamePlay',
  preload: function(){
    this.load.image('bg1', 'images/bg/bg1.png');
    this.load.image('bg2', 'images/bg/bg2.png');
    this.load.image('bg3', 'images/bg/bg3.png');
    this.load.image('bg4', 'images/bg/bg4.png');
    this.load.image('footer', 'images/bg/footer.png');
    this.load.spritesheet('player', 'images/player.png', {frameWidth: 144, frameHeight: 120});

    this.load.image('rock3', 'images/item-level-1-branch.png')
    this.load.image('rock1', 'images/item-level-1-rock.png')
    this.load.image('rock4', 'images/item-level-2-smoke-lg.png')
    this.load.image('rock2', 'images/item-level-2-smoke-sm.png')
    this.load.image('monster31', 'images/item-level-3-fire-lg.png')
    this.load.image('monster32', 'images/item-level-3-fire-sm.png')
    this.load.image('endTitle', 'images/ui/txt-congratulations.png')
    this.load.image('btnPlayAgain', 'images/ui/btn-play-again.png')
    this.load.image('gameover', 'images/ui/txt-game-over.png')
    this.load.image('btnTryAgain', 'images/ui/btn-try-again.png')

    this.timeInt = 30;
    this.speedLV = 1;
    this.gameStop = false;
    this.monsterArr = [];    // 存放所有怪物實體
    this.monsterArr2 = [];   // 存放所有怪物實體2
    this.masIdx = 0;         // 怪物索引
    this.masIdx2 = 1;        // 怪物索引2
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

    keyframe(this)

    // 加入物理效果
    const addPhysics = GameObject =>{
      this.physics.add.existing(GameObject);
      GameObject.body.immovable = true;
      GameObject.body.moves = false;
    }

    const masPos = [
      {name: 'rock1', x: cw + 200, y: 320, w: 160, h: 83},
      {name: 'rock2', x: cw + 200, y: ch / 2 - 30 , w: 200, h: 94},
      {name: 'rock3', x: cw + 200, y: 70, w: 130, h: 160},
    ]

    //碰撞到後停止遊戲
    const hittest = (player, rock) => {
      this.gameStop = true;
      this.player.setBounce(0);
      this.player.setSize(110, 100, 0);
      this.player.anims.play('dead', true);
      clearInterval(timer);
      let gameover = this.add.image(cw / 2, ch / 2 - 40, 'gameover');
      gameover.setScale(0.8);
      let btnTryAgain = this.add.image(cw / 2, ch / 2 + 30, 'btnTryAgain');
      btnTryAgain.setScale(0.6);
      btnTryAgain.setInteractive();
      btnTryAgain.on('pointerdown', () => this.scene.start('gameStart'));
    }

    // 產生怪物
    for (let i = 0; i < 10; i++) {
      let BoolIdx = getRandom(2, 0);
      let BoolIdx2 = getRandom(2, 0);
      this['rock'+ i] = this.add.tileSprite(masPos[BoolIdx].x, masPos[BoolIdx].y, masPos[BoolIdx].w, masPos[BoolIdx].h, masPos[BoolIdx].name);
      this['rockB'+ i] = this.add.tileSprite(masPos[BoolIdx2].x, masPos[BoolIdx2].y, masPos[BoolIdx2].w, masPos[BoolIdx2].h, masPos[BoolIdx2].name);
      this.monsterArr.push(this['rock'+ i]);
      this.monsterArr2.push(this['rockB'+ i]);
      addPhysics(this['rock'+i]);
      addPhysics(this['rockB'+i]);
      this.physics.add.collider(this.player, this['rock'+i], hittest);
      this.physics.add.collider(this.player, this['rockB'+i], hittest);
    }
  },
  update: function(){
    if (this.gameStop) return
    this.bg4.tilePositionX += 1 * this.speedLV;
    this.bg3.tilePositionX += 2 * this.speedLV;
    this.bg2.tilePositionX += 3 * this.speedLV;
    this.bg1.tilePositionX += 3 * this.speedLV;
    this.footer.tilePositionX += 3 * this.speedLV;

    this.monsterArr[this.masIdx].x -= 3 * this.speedLV;

    if(this.timeInt < 10 && this.timeInt > 0 ){
        this.monsterArr2[this.masIdx2].x -= 3 * this.speedLV;
    }

    // 檢測怪物是否超出邊界然後返回
    for (let i = 0; i < this.monsterArr.length; i++) {
      if(this.monsterArr[i].x <= -100){
          this.monsterArr[i].x = cw + 200;
          this.masIdx = getRandom(this.monsterArr.length - 1, 0);
      }
      if(this.monsterArr2[i].x <= -100){
          this.monsterArr2[i].x = cw + getRandom(400, 200);
          this.masIdx2 = getRandom(this.monsterArr2.length - 1, 0);
      }
    }

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
