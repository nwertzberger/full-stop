"user strict";

var Phaser = Phaser || window.Phaser || null;

var game = (function(Phaser) {
    var self = this;

    self.preload = function() {
        self.game.load.image('rail', 'images/rail.png');
        self.game.load.image('car', 'images/car.png');
    };

    self.create = function() {
        self.game.stage.backgroundColor= "#444444";
        self.obstacles = self.game.add.group();

        self.rail = self.obstacles.create(0,0, 'rail');
        self.rail.body.maxVelocity.y = 200;
        self.rail.body.minVelocity.y = 0;

        self.car = self.game.add.sprite(self.game.world.width/2 - 150,300, 'car');

        self.badFont ={ font: "32px Arial", fill: "#F00" };
        self.goodFont ={ font: "32px Arial", fill: "#0F0" };
        self.scoreText = self.game.add.text (16, 16, "Safe Crossings: 0", { font: "32px Arial", fill: "#FFF" });
        self.lookLeftText = self.game.add.text (16, self.game.world.height - 100, "Look Left!", self.badFont);
        self.stopText = self.game.add.text (self.game.world.width * .5 - 40, 100,"Stop!", self.badFont);
        self.lookRightText = self.game.add.text (self.game.world.width - 170, self.game.world.height - 100,  "Look Right!", self.badFont);
        self.safeCrossings = 0;
        self.safeStop = false;
        self.lookedLeft = false;
        self.lookedRight = false;
        self.gameOver = false;

        self.cursors = self.game.input.keyboard.createCursorKeys();
    };

    self.update = function() {
        if (self.gameOver) {
            return;
        }

        if (self.cursors.up.isDown) {
            self.rail.body.acceleration.y = 200;
        } else if (self.cursors.down.isDown) {
            self.rail.body.acceleration.y = -300;
        }

        if (self.cursors.left.isDown) {
            self.lookedLeft = true;
            self.lookLeftText.font = self.goodFont;
        } else if (self.cursors.right.isDown) {
            self.lookedRight = true;
            self.lookRightText.font = self.goodFont;
        }

        if (self.rail.body.y > self.game.world.height) {
            self.rail.body.y = 0;
            self.passedRail = false;
        }
        if (self.rail.body.velocity.y < 0) {
            self.rail.body.velocity.y = 0;
            self.rail.body.acceleration.y = 0;
            self.safeStop = true;
            self.stopText.font = self.goodFont;
        }

        if (self.rail.body.y > self.car.body.y && !self.passedRail) {
            self.passedRail = true;
            if (self.safeStop && self.lookedLeft && self.lookedRight) {
                self.safeCrossings++;
                self.scoreText.content = "Safe Crossings: " + self.safeCrossings;
            } else {
                self.gameOver = true;
                self.game.add.text(130, self.game.world.height * 0.35, "Game Over!", { font: "64px Arial", fill: "#F00" });
                self.game.add.text(50, self.game.world.height * 0.35 + 80, "You need to look left, right, and stop!", self.badFont);
                return;
            }

            self.safeStop = false;
            self.lookedLeft = false;
            self.lookedRight = false;
            
            self.stopText.font = self.badFont;
            self.lookLeftText.font = self.badFont;
            self.lookRightText.font = self.badFont;
        }
    };

    self.render = function() {
        self.game.debug.renderCameraInfo(self.game.camera, 16, 16);
    };

    self.go = function() {
        self.game = new Phaser.Game(
                640, 480,
                Phaser.AUTO,
                'game-window', 
                self);
    };

    return self;
})(Phaser);

game.go();
