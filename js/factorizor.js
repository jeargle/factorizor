var score, bootState, loadState, titleState, playState, endState, game;

score = 0;

bootState = {
    create: function() {
        'use strict';

        // Load physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
};

loadState = {
    preload: function() {
        'use strict';
        var loadLbl;

        loadLbl = game.add.text(80, 160, 'loading...',
                                {font: '30px Courier',
                                 fill: '#ffffff'});
        
        // Load images
        game.load.image('gun', 'assets/gun-blue.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('enemy', 'assets/circle-red.png');

        // Load sound effects
    },
    create: function() {
        'use strict';
        game.state.start('title');
    }
};

titleState = {
    create: function() {
        'use strict';
        var nameLbl, startLbl, wKey;

        nameLbl = game.add.text(80, 160, 'Factorizor',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = game.add.text(80, 240, 'press "W" to start',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(this.start, this);
    },
    start: function() {
        'use strict';
        game.state.start('play');
    }
};

playState = {
    create: function() {
        'use strict';
        var block, i, enemy, textStyle, text, primeStyle;

        this.keyboard = game.input.keyboard;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Gun
        this.gun = game.add.sprite(400, 400, 'gun');
        this.gun.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.gun);
        this.gun.body.setCircle(28);
        this.gun.angle -= 90;

        // Bullets
        this.bullets = game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
        
        this.bulletTime = 0;
        this.bulletTimeOffset = 200;
        this.bulletSpeed = 500;

        // this.fireButton = this.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // Enemies
        this.enemies = game.add.physicsGroup(Phaser.Physics.ARCADE);
        textStyle = {
            font: '20px Arial',
            fill: '#ffffff',
            // wordWrap: true,
            // wordWrapWidth: sprite.width,
            align: 'center',
            // backgroundColor: '#ffff00'
        };
        for (i=0; i<5; i++) {
            enemy = this.enemies.create(i*100 + 50, 100, 'enemy');
            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.setCircle(16);
            text = game.add.text(enemy.x,
                                 enemy.y + 2,
                                 i+1, textStyle);
            text.anchor.set(0.5);
        }

        // Factor wheel
        this.primes = [2, 3, 5, 7, 11, 13, 17, 19];
        primeStyle = {
            font: '20px Arial',
            fill: '#ffffff',
            align: 'center',
        };
        this.wheel = [];
        for (i=0; i<this.primes.length; i++) {
            this.wheel.push(game.add.text(400, 450,
                                          this.primes[i],
                                          primeStyle));
            this.wheel[i].anchor.set(0.5);
        }
        this.wheel[3].y = 475;
        this.wheel[2].y = 500;
        this.wheel[1].y = 525;
        this.wheel[0].y = 550;
        this.chosenPrime = this.primes[2];   // active prime
        this.tweenPrimes = [0, 1, 2, 3, 4];
        this.primeTime = 0;
        this.primeTimeOffset = 200;
        
        // Controls
        this.cursors = game.input.keyboard.addKeys({
            'up': Phaser.Keyboard.W,
            'down': Phaser.Keyboard.S,
            'left': Phaser.Keyboard.A,
            'right': Phaser.Keyboard.D,
            'fire': Phaser.Keyboard.SPACEBAR
        });

    },
    update: function() {
        'use strict';

        game.physics.arcade.overlap(this.gun, this.enemies,
                                    this.end, null, this);

        if (this.cursors.left.isDown) {
            this.gun.angle -= 1;
            // console.log('angle: ' + this.gun.angle);
        }
        
        if (this.cursors.right.isDown) {
            this.gun.angle += 1;
            // console.log('angle: ' + this.gun.angle);
        }
        
        if (game.time.now > this.primeTime) {
            if (this.cursors.up.isDown) {
                this.primeSelect('up');
            }
            else if (this.cursors.down.isDown) {
                this.primeSelect('down');
            }
        }
        
        if (this.cursors.fire.isDown) {
            this.fire();
        }
    },
    /**
     * Move prime factor wheel up or down.
     * @param scrollDir {string} - direction to move: 'up' or 'down'
     */
    primeSelect: function(scrollDir) {
        'use strict';
        var tween, prime, i;

        if (scrollDir === 'up') {
            this.primeTime = game.time.now +
                this.primeTimeOffset;
            for (i=0; i<4; i++) {
                prime = this.wheel[this.tweenPrimes[i]];
                tween = game.add.tween(prime)
                    .to({y: prime.y-25}, 200,
                        Phaser.Easing.Linear.None,
                        true);
            }
            
            for (i=4; i>0; i--) {
                this.tweenPrimes[i] = this.tweenPrimes[i-1];
            }
            
            if (this.tweenPrimes[0] === 0) {
                this.tweenPrimes[0] = this.primes.length-1;
            }
            else {
                this.tweenPrimes[0] = this.tweenPrimes[0]-1;
            }
            this.wheel[this.tweenPrimes[0]].y = 550;
        }
        else {
            this.primeTime = game.time.now +
                this.primeTimeOffset;
            for (i=1; i<5; i++) {
                prime = this.wheel[this.tweenPrimes[i]];
                tween = game.add.tween(prime)
                    .to({y: prime.y+25}, 200,
                        Phaser.Easing.Linear.None,
                        true);
            }
            
            for (i=0; i<4; i++) {
                this.tweenPrimes[i] = this.tweenPrimes[i+1];
            }
            
            if (this.tweenPrimes[4] === this.primes.length-1) {
                this.tweenPrimes[4] = 0;
            }
            else {
                this.tweenPrimes[4] = this.tweenPrimes[4]+1;
            }
            this.wheel[this.tweenPrimes[4]].y = 450;
        }
        this.chosenPrime = this.primes[this.tweenPrimes[2]];
        console.log(this.chosenPrime);
    },
    fire: function() {
        'use strict';
        var bullet, bulletOffset;
        
        if (game.time.now > this.bulletTime) {
            this.bulletTime = game.time.now + this.bulletTimeOffset;
            bullet = this.bullets.getFirstExists(false);
            
            if (bullet) {
                bulletOffset = game.physics.arcade.velocityFromAngle(
                    this.gun.angle, 28
                );
                bullet.reset(this.gun.x + bulletOffset.x,
                             this.gun.y + bulletOffset.y);
                game.physics.arcade.velocityFromAngle(
                    this.gun.angle, this.bulletSpeed, bullet.body.velocity
                );
            }
        }
    },
    end: function() {
        'use strict';
        game.state.start('end');
    }
};

endState = {
    create: function() {
        'use strict';
        var scoreLbl, nameLbl, startLbl, wKey;

        scoreLbl = game.add.text(600, 10, 'Score: ' + score,
                                 {font: '30px Courier',
                                  fill: '#ffffff'});
        nameLbl = game.add.text(80, 160, 'YOU DIED',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = game.add.text(80, 240, 'press "W" to restart',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(this.restart, this);
    },
    restart: function() {
        'use strict';
        game.state.start('title');
    }
};


game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-div');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('play', playState);
game.state.add('end', endState);

game.state.start('boot');
