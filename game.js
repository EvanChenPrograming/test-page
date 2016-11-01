
var landingPage = landingPage || {};

landingPage.Boot = function(){};
landingPage.Preload = function(){};
landingPage.Menu = function(){};
landingPage.inGame = function(){};

var bgm;

landingPage.Boot.prototype = {
  preload: function(){
    this.load.image('icon', 'assets/icon.png');
    this.load.image('loadbar', 'assets/preloader-bar.png');
    this.load.audio('bgm', ['sounds/maple_story_login.mp3','sounds/maple_story_login.ogg']);
  },
  create: function(){
    this.game.stage.backgroundColor = '#fff';
    this.game.physics.startSystem(Phaser.Physics.ARCAD);
    bgm = this.game.add.audio('bgm');
    bgm.play();
    this.state.start('Preload');
  }
};

landingPage.Preload.prototype = {
  preload: function(){
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'icon');
    this.splash.anchor.setTo(0.5);
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

  },
  create: function(){
    this.state.start('Menu');
  }
};

landingPage.Menu.prototype ={
  onClicked: function(){
    alert('clicked');
    this.state.start('inGame');
  },
  create: function(){
    this.tree = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tree');
    this.tree.anchor.setTo(0.5);
    this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'explore', this.onClicked, this);
  }
};

landingPage.inGame.prototype ={
  /*create: function(){
    this.tree = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tree');
    this.tree.anchor.setTo(0.5);
    this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'explore', onClicked, this);
  },
  onClicked: function(){
    this.state.start('inGame');
  }*/
}


landingPage.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

landingPage.game.state.add('Boot', landingPage.Boot);
landingPage.game.state.add('Preload', landingPage.Preload);
landingPage.game.state.add('Menu', landingPage.Menu);
landingPage.game.state.add('inGame', landingPage.inGame);

landingPage.game.state.start('Boot');
