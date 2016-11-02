
var landingPage = landingPage || {};
var bgm;

landingPage.Boot = function(){};
landingPage.Preload = function(){};
landingPage.Menu = function(){};
landingPage.Game = function(){};

landingPage.Boot.prototype = {
  preload: function(){
    this.load.image('icon', 'assets/icon.jpg');
    this.load.image('loadbar', 'assets/preloader-bar.png');
  },
  create: function(){
    this.game.stage.backgroundColor = '#fff';
    this.game.physics.startSystem(Phaser.Physics.ARCAD);
    this.state.start('Preload');
  }
};
landingPage.Preload.prototype = {
  preload: function(){
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'icon');
    this.splash.anchor.setTo(0.5);
    this.splash.scale.setTo(0.7, 0.7);
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'loadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    //load things
    this.load.spritesheet('sprite', 'assets/org_h01.png', 32, 32);
    this.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileIIM','assets/IIMfront_fixed.jpg');
    this.load.image('tile2','assets/2.png');
    this.load.image('tileCampus','assets/campus.png');
    this.load.image('tree', 'assets/tree.jpg');
    this.load.image('explore', 'assets/explore.png');
    this.load.audio('bgm', ['sounds/maple_story_login.mp3','sounds/maple_story_login.ogg']);

  },
  create: function(){
    bgm = this.game.add.audio('bgm', 1, true);
    bgm.play();
    this.state.start('Menu');
  }
};
landingPage.Menu.prototype ={
  onClicked: function(){
    this.state.start('Game');
  },
  create: function(){
    this.tree = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tree');
    this.tree.anchor.setTo(0.5);
    this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'explore', this.onClicked, this);
  }
};
landingPage.Game.prototype ={
  create: function(){
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('IIMfront_fixed', 'tileIIM');
    this.map.addTilesetImage('2', 'tile2');
    this.map.addTilesetImage('campus', 'tileCampus');
    this.map.createLayer('layer1');
    this.map.createLayer('layer2');
    this.map.createLayer('layer3');
    this.collisionLayer = this.map.createLayer('collisionLayer');
    this.stairs = this.map.createLayer('stairs');

    this.sprite = this.game.add.sprite(100, 300,'sprite');
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;

    this.sprite.animations.add('left', [4, 5, 6], 2, true);
    this.sprite.animations.add('right', [7, 8, 9], 2, true);
    this.sprite.animations.add('up', [10, 11, 12], 8, true);

    this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    this.cursors = this.game.input.keyboard.createCursorKeys();

  },
  update: function(){
    this.game.physics.arcade.collide(this.sprite, this.collisionLayer);

    this.sprite.body.velocity.x = 0;
    if (this.cursors.left.isDown)
    {
        this.sprite.body.velocity.x = -150;
        this.sprite.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 150;
        this.sprite.animations.play('right');
    }
    else
    {
        this.sprite.animations.stop();
        this.sprite.frame = 2;
    }

    if (this.jump.isDown && this.sprite.body.touching.down)
    {
        this.sprite.body.velocity.y = -250;
    }
  }
}


landingPage.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

landingPage.game.state.add('Boot', landingPage.Boot);
landingPage.game.state.add('Preload', landingPage.Preload);
landingPage.game.state.add('Menu', landingPage.Menu);
landingPage.game.state.add('Game', landingPage.Game);

landingPage.game.state.start('Boot');
