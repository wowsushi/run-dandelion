const keyframe = (self) => {
  self.anims.create({
    key: 'run',
    frames: self.anims.generateFrameNumbers('player', {start: 0, end: 1}),
    frameRate: 3,
    repeat: -1
  });

  self.anims.create({
    key: 'jump',
    frames: self.anims.generateFrameNumbers('player', {start: 2, end: 3}),
    frameRate: 3,
    repeat: -1
  });

  self.anims.create({
    key: 'speed',
    frames: self.anims.generateFrameNumbers('player', {start: 4, end: 5}),
    frameRate: 3,
    repeat: -1
  });

  self.anims.create({
    key: 'dead',
    frames: self.anims.generateFrameNumbers('player', {start: 6, end: 6}),
    frameRate: 3,
    repeat: -1
  });
}
