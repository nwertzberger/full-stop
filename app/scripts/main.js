"user strict";

var Phaser = Phaser || window.Phaser || null;

var game = (function(Phaser) {
    var self = this;

    self.preload = function() {
        self.game.load.tilemap('testmap', 'maps/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        self.game.load.image('village', 'images/village.png');
        self.game.load.spritesheet('chocobo', 'images/chocobo.png', 24, 32);
    };

    self.create = function() {
        self.game.stage.backgroundColor= "#000000";
        self.map = game.add.tilemap("testmap");
        self.map.addTilesetImage("village", "village");
        self.ground = map.createLayer("ground");
        self.objects = map.createLayer("objects");
        self.ground.resizeWorld();

        self.chocobo = game.add.sprite(100,100, 'chocobo');
        chocobo.animations.add('walk-up',[12,13,14]);
        chocobo.animations.play('walk-up', 6, true);

        self.cursors = game.input.keyboard.createCursorKeys();
    };

    self.update = function() {

    };

    self.render = function() {
        self.game.debug.renderCameraInfo(game.camera, 16, 16);
    };

    self.go = function() {
        self.game = new Phaser.Game(
                320, 480,
                Phaser.AUTO,
                'game-window', 
                self);
    };

    return self;
})(Phaser);

game.go();
