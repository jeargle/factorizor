var score, highScore, level, levels, bootState, loadState, titleState, playState, levelState, endState, game;

highScore = 0;


bootScene = {
    key: 'boot',
    active: true,
    init: (config) => {
        console.log('[BOOT] init', config);
    },
    preload: () => {
        console.log('[BOOT] preload');
    },
    create: function() {
        'use strict';

        game.scene.start('load');
        game.scene.remove('boot');
    },
    update: () => {
        console.log('[BOOT] update');
    }
};


loadScene = {
    key: 'load',
    renderToTexture: true,
    x: 64,
    y: 64,
    width: 320,
    height: 200,
    init: (config) => {
        console.log('[LOAD] init', config);
    },
    preload: function() {
        'use strict';
        var loadLbl;

        loadLbl = this.add.text(80, 160, 'loading...',
                                {font: '30px Courier',
                                 fill: '#ffffff'});

        // Load images
        this.load.image('gun', 'assets/gun-blue.png');
        this.load.image('bullet', 'assets/bullet.png');
        // this.load.image('enemy', 'assets/circle-red.png');
        this.load.image('block', 'assets/square-blue.png');
        this.load.spritesheet(
            'enemy', 'assets/circles.png',
            {frameWidth: 32,
             frameHeight: 32}
        );

        // Load sound effects
        this.load.audio('wheelC4', 'assets/C4.wav');
        this.load.audio('wheelCs4', 'assets/Cs4.wav');
        this.load.audio('wheelD4', 'assets/D4.wav');
        this.load.audio('wheelDs4', 'assets/Ds4.wav');
        this.load.audio('wheelE4', 'assets/E4.wav');
        this.load.audio('wheelF4', 'assets/F4.wav');
        this.load.audio('wheelFs4', 'assets/Fs4.wav');
        this.load.audio('wheelG4', 'assets/G4.wav');
        this.load.audio('wheelGs4', 'assets/Gs4.wav');
        this.load.audio('wheelA4', 'assets/A4.wav');
        this.load.audio('wheelAs4', 'assets/As4.wav');
        this.load.audio('wheelB4', 'assets/B4.wav');
        this.load.audio('wheelC5', 'assets/C5.wav');
        this.load.audio('explosion', 'assets/explosion.wav');
        this.load.audio('hit1', 'assets/hit1.wav');
        this.load.audio('hit2', 'assets/hit2.wav');
        this.load.audio('hit3', 'assets/hit3.wav');
        this.load.audio('ping1', 'assets/ping1.wav');
        this.load.audio('ping2', 'assets/ping2.wav');
        this.load.audio('ping3', 'assets/ping3.wav');
    },
    create: function() {
        'use strict';
        game.scene.start('title');
        game.scene.remove('load');
    },
    update: () => {
        console.log('[LOAD] update');
    }
};


titleScene = {
    key: 'title',
    init: (config) => {
        console.log('[TITLE] init', config);
    },
    preload: () => {
        console.log('[TITLE] preload');
    },
    create: function() {
        'use strict';
        var nameLbl, startLbl;

        nameLbl = this.add.text(80, 160, 'Factorizor',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = this.add.text(80, 240, 'press "W" to start',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        this.input.keyboard.on('keydown_W', this.play, this);
    },
    update: () => {
        console.log('[TITLE] update');
    },
    extend: {
        play: function() {
            'use strict';
            console.log('[TITLE] play');
            score = 0;
            level = 0;
            game.scene.switch('title', 'play');
        }
    }
};

/**
 * Level setup info list.
 * For each level, there's a list of factors with frequency weights.
 */
levels = [
    [[2, 1], [3, 1], [5, 1], [7, 1]],
    [[2, 3], [3, 3], [4, 2], [5, 3], [6, 2], [7, 3], [8, 1], [9, 2]],
    [[2, 3], [3, 3], [4, 2], [5, 3], [6, 2], [7, 3], [8, 1], [9, 2], [10, 2],
     [11, 3], [12, 1], [13, 3], [14, 2], [15, 2]],
    [[2, 3], [3, 3], [4, 2], [5, 3], [6, 2], [7, 3], [8, 1], [9, 2], [10, 2],
     [11, 3], [12, 1], [13, 3], [14, 2], [15, 2],
     [16, 1], [17, 3], [18, 2], [19, 3], [20, 1]],
    [[2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],
     [11, 3], [12, 1], [13, 3], [14, 2], [15, 2],
     [16, 1], [17, 3], [18, 2], [19, 3], [20, 1]],
    [[2, 1], [3, 1], [4, 2], [5, 1], [6, 2], [7, 1], [8, 2], [9, 2], [10, 2],
     [11, 2], [12, 1], [13, 2], [14, 2], [15, 2],
     [16, 1], [17, 2], [18, 2], [19, 2], [20, 1],
     [21, 2], [22, 2], [23, 0], [24, 1], [25, 2],
     [26, 2], [27, 1], [28, 1], [29, 0], [30, 1]],
    [[2, 1], [3, 1], [4, 2], [5, 1], [6, 2], [7, 1], [8, 2], [9, 2], [10, 2],
     [11, 2], [12, 2], [13, 2], [14, 2], [15, 2],
     [16, 2], [17, 2], [18, 2], [19, 2], [20, 2],
     [21, 2], [22, 2], [23, 0], [24, 2], [25, 2],
     [26, 2], [27, 2], [28, 2], [29, 0], [30, 2]],
    [[2, 1], [3, 1], [4, 2], [5, 1], [6, 2], [7, 1], [8, 3], [9, 2], [10, 2],
     [11, 1], [12, 3], [13, 1], [14, 2], [15, 2],
     [16, 3], [17, 1], [18, 3], [19, 1], [20, 3],
     [21, 2], [22, 2], [23, 0], [24, 2], [25, 2],
     [26, 2], [27, 2], [28, 2], [29, 0], [30, 2],
     [31, 0], [32, 1], [33, 2], [34, 1], [35, 1],
     [36, 1], [37, 0], [38, 1], [39, 1], [40, 1]],
    [[2, 1], [3, 1], [4, 2], [5, 1], [6, 2], [7, 1], [8, 3], [9, 2], [10, 2],
     [11, 1], [12, 3], [13, 1], [14, 2], [15, 2],
     [16, 3], [17, 1], [18, 3], [19, 1], [20, 3],
     [21, 2], [22, 2], [23, 0], [24, 3], [25, 2],
     [26, 2], [27, 3], [28, 3], [29, 0], [30, 3],
     [31, 0], [32, 3], [33, 2], [34, 2], [35, 2],
     [36, 3], [37, 0], [38, 2], [39, 2], [40, 3]]
];

playState = {
    create: function() {
        'use strict';
    },
    update: function() {
        'use strict';
    },
};

playScene = {
    key: 'play',
    factors: {
        2: null,
        3: null,
        4: {2: 2},
        5: null,
        6: {2: 1, 3: 1},
        7: null,
        8: {2: 3},
        9: {3: 2},
        10: {2: 1, 5: 1},
        11: null,
        12: {2: 2, 3: 1},
        13: null,
        14: {2: 1, 7: 1},
        15: {3: 1, 5: 1},
        16: {2: 4},
        17: null,
        18: {2: 1, 3: 2},
        19: null,
        20: {2: 2, 5: 1},
        21: {3: 1, 7: 1},
        22: {2: 1, 11: 1},
        23: null,
        24: {2: 3, 3: 1},
        25: {5: 2},
        26: {2: 1, 13: 1},
        27: {3: 3},
        28: {2: 2, 7: 1},
        29: null,
        30: {2: 1, 3: 1, 5: 1},
        31: null,
        32: {2: 5},
        33: {3: 1, 11: 1},
        34: {2: 1, 17: 1},
        35: {5: 1, 7: 1},
        36: {2: 2, 3: 2},
        37: null,
        38: {2: 1, 19: 1},
        39: {3: 1, 13: 1},
        40: {2: 3, 5: 1}
    },
    // enemyCounts: [5, 10, 10, 10, 10, 20, 20, 20, 20],
    // enemyCounts: [5, 5, 5, 5, 10, 10, 10, 10, 10],
    create: function() {
        'use strict';
        // var block, height, width;


        var block, i, j, primeStyle;

        console.log('[PLAY] create');

        // this.keyboard = game.input.keyboard;

        // game.physics.startSystem(Phaser.Physics.ARCADE);

        this.lastDir = null;
        this.dirTime1 = 0;
        this.dirTime2 = 0;
        this.dirTime1Offset = 200;
        this.dirTime2Offset = 500;

        // Gun
        // this.gun = game.add.sprite(400, 400, 'gun');
        this.gun = this.physics.add.sprite(400, 400, 'gun');
        // this.gun.anchor.setTo(0.5, 0.5);
        // game.physics.arcade.enable(this.gun);
        this.gun.body.setCircle(28);
        this.gun.angle -= 90;

        // Bullets
        // this.bullets = game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.bullets = this.physics.add.group();
        this.bullets.createMultiple(30, 'bullet');
        // this.bullets.setAll('anchor.x', 0.5);
        // this.bullets.setAll('anchor.y', 0.5);
        // this.bullets.setAll('outOfBoundsKill', true);
        // this.bullets.setAll('checkWorldBounds', true);

        this.bulletTime = 0;
        this.bulletTimeOffset = 200;
        this.bulletSpeed = 500;

        this.hits = [];
        // this.hits.push(this.add.audio('hit1'));
        // this.hits.push(this.add.audio('hit2'));
        // this.hits.push(this.add.audio('hit3'));

        this.pings = [];
        // this.pings.push(this.add.audio('ping1'));
        // this.pings.push(this.add.audio('ping2'));
        // this.pings.push(this.add.audio('ping3'));

        // Enemies
        // this.enemies = game.add.physicsGroup(Phaser.Physics.ARCADE);
        this.enemies = this.physics.add.group();
        this.enemies.createMultiple(30, 'enemy');
        // this.enemies.setAll('outOfBoundsKill', true);
        // this.enemies.setAll('checkWorldBounds', true);
        // this.enemies.setAll('anchor.x', 0.5);
        // this.enemies.setAll('anchor.y', 0.5);
        // this.enemies.callAll('animations.add', 'animations', 'shield', [2, 0], 10, false);
        // this.enemies.callAll('animations.add', 'animations', 'hurt', [3, 0], 10, false);
        this.enemiesDispatched = 0;
        this.enemiesKilled = 0;
        this.enemyTime = 0;
        this.enemyTimeOffset = 2000;
        this.enemySpeed = 20;
        // this.explosion = game.add.audio('explosion');

        // Set up enemy frequencies based on level info.
        this.levelIdx = level;
        if (this.levelIdx >= levels.length) {
            this.levelIdx = levels.length-1;
        }
        this.enemyCounts = [5, 5, 5, 5, 10, 10, 10, 10, 10];
        this.enemyTotal = this.enemyCounts[this.levelIdx];
        this.enemyFreqs = [];
        for (i=0; i<levels[this.levelIdx].length; i++) {
            for (j=0; j<levels[this.levelIdx][i][1]; j++) {
                this.enemyFreqs.push(i);
            }
        }

        // Factor wheel
        this.primes = [2, 3, 5, 7, 11, 13, 17, 19];
        primeStyle = {
            font: '20px Arial',
            fill: '#666666',
            align: 'center',
        };
        this.wheel = [];
        for (i=0; i<this.primes.length; i++) {
            this.wheel.push(this.add.text(400, 450,
                                          this.primes[i],
                                          primeStyle));
            // this.wheel[i].anchor.set(0.5);
        }
        this.wheel[3].y = 475;
        this.wheel[2].y = 500;
        this.wheel[1].y = 525;
        this.wheel[0].y = 550;
        this.wheel[2].fill = '#ffffff';
        this.chosenPrime = this.primes[2];   // active prime
        this.tweenPrimes = [0, 1, 2, 3, 4];
        this.primeTime = 0;
        this.primeTimeOffset = 200;

        this.wheelScale = [
            // this.add.audio('wheelC4'),
            // this.add.audio('wheelD4'),
            // this.add.audio('wheelE4'),
            // this.add.audio('wheelF4'),
            // this.add.audio('wheelG4'),
            // this.add.audio('wheelA4'),
            // this.add.audio('wheelB4'),
            // this.add.audio('wheelC5')
        ]

        // Blocks
        // block = game.add.sprite(400, 443, 'block');
        block = this.physics.add.sprite(400, 443, 'block');
        // block.anchor.setTo(0.5, 0.5);
        // block = game.add.sprite(400, 550, 'block');
        block = this.physics.add.sprite(400, 550, 'block');
        // block.anchor.setTo(0.5, 0.5);

        // Controls
        // this.cursors = game.input.keyboard.addKeys({
        //     'up': Phaser.Keyboard.W,
        //     'down': Phaser.Keyboard.S,
        //     'left': Phaser.Keyboard.A,
        //     'right': Phaser.Keyboard.D,
        //     'fire': Phaser.Keyboard.SPACEBAR
        // });
        // Controls
        this.cursors = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'fire': Phaser.Input.Keyboard.KeyCodes.SPACEBAR
        });

        // Score
        this.scoreText = this.add.text(
            600, 475, 'Score: ' + score,
            {font: '30px Courier',
             fill: '#ffffff'}
        );









        // this.keyboard = game.input.keyboard;

        // Walls
        // this.walls = this.physics.add.staticGroup();


        // console.log(this.height);
        // console.log(this.game.height);
        // height = 600;
        // width = 800;
        // block = this.walls.create(0, height - 32, 'platform')
        //     .setOrigin(0, 0)
        //     .setScale(25, 1)
        //     .refreshBody();

        // block = this.walls.create(0, 0, 'platform')
        //     .setOrigin(0, 0)
        //     .setScale(25, 1)
        //     .refreshBody();

        // block = this.walls.create(0, 32, 'platform')
        //     .setOrigin(0, 0)
        //     .setScale(1, 17)
        //     .refreshBody();

        // block = this.walls.create(width - 32, 32, 'platform')
        //     .setOrigin(0, 0)
        //     .setScale(1, 17)
        //     .refreshBody();

        // block = this.walls.create(200, 200, 'platform')
        //     .setOrigin(0, 0)
        //     .setScale(8, 1)
        //     .refreshBody();

        // block = this.walls.create(400, 400, 'platform')
        //     .setOrigin(0, 0)
        //     .setScale(8, 1)
        //     .refreshBody();

        // Player
        // this.player = this.physics.add.sprite(150, 150, 'player');
        // this.player.setBounce(0.2);
        // this.player.setCollideWorldBounds(true);
        // this.playerSpeed = 300;

        // this.physics.add.collider(this.player, this.walls);

        // game.physics.arcade.enable(this.player);

        // Enemies
        // this.enemies = this.physics.add.group();

        // this.enemiesKilled = 0;
        // this.enemySpeed = 80;
        // this.createEnemies();

        // Woomp
        // this.woompTime = 0;
        // this.woompTimeOffset = 300;

        // Controls
        // this.cursors = this.input.keyboard.addKeys({
        //     'up': Phaser.Input.Keyboard.KeyCodes.W,
        //     'down': Phaser.Input.Keyboard.KeyCodes.S,
        //     'left': Phaser.Input.Keyboard.KeyCodes.A,
        //     'right': Phaser.Input.Keyboard.KeyCodes.D,
        //     'woomp': Phaser.Input.Keyboard.KeyCodes.SPACEBAR
        // });

        // this.physics.add.collider(this.enemies, this.walls);
        // this.physics.add.collider(this.enemies, this.enemies);
        // this.physics.add.overlap(this.player, this.enemies,
        //                          this.end, null, this);

    },
    update: function() {
        'use strict';
        // var enemy, that;
        var now;

        // console.log('[PLAY] update');

        now = this.time.now;
        // game.physics.arcade.overlap(this.gun, this.enemies,
        //                             this.end, null, this);
        // game.physics.arcade.overlap(this.bullets, this.enemies,
        //                             this.hitEnemy, null, this);

        if (this.cursors.left.isDown) {
            this.gun.angle -= 1;
            // console.log('angle: ' + this.gun.angle);
            if (this.lastDir != 'left') {
                this.lastDir = 'left';
                this.dirTime1 = now + this.dirTime1Offset;
                this.dirTime2 = now + this.dirTime2Offset;
            }
            else {
                if (now > this.dirTime2) {
                    this.gun.angle -= 3;
                }
                else if (now > this.dirTime1) {
                    this.gun.angle -= 2;
                }
                else {
                    this.gun.angle -= 1;
                }
            }
        }
        else if (this.cursors.right.isDown) {
            // console.log('angle: ' + this.gun.angle);
            if (this.lastDir != 'right') {
                this.lastDir = 'right';
                this.dirTime1 = now + this.dirTime1Offset;
                this.dirTime2 = now + this.dirTime2Offset;
            }
            else {
                if (now > this.dirTime2) {
                    this.gun.angle += 3;
                }
                else if (now > this.dirTime1) {
                    this.gun.angle += 2;
                }
                else {
                    this.gun.angle += 1;
                }
            }
        }
        else {
            if (this.lastDir != null) {
                this.lastDir = null;
            }
        }

        if (now > this.primeTime) {
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

        if (now > this.enemyTime &&
            this.enemiesDispatched < this.enemyTotal) {
            this.dispatchEnemy();
        }

        this.scoreText.text = 'Score: ' + score;









        // Update player.
        this.player.body.setVelocityX(0);
        this.player.body.setVelocityY(0);
        if (this.cursors.right.isDown) {
            console.log('RIGHT');
            this.player.body.setVelocityX(this.playerSpeed);
        }
        else if (this.cursors.left.isDown) {
            console.log('LEFT');
            this.player.body.setVelocityX(-this.playerSpeed);
        }
        else if (this.cursors.up.isDown) {
            console.log('UP');
            this.player.body.setVelocityY(-this.playerSpeed);
        }
        else if (this.cursors.down.isDown) {
            console.log('DOWN');
            this.player.body.setVelocityY(this.playerSpeed);
        }

        if (this.cursors.woomp.isDown) {
            this.woomp();
        }

        // Update enemies.
        // Also could use this.enemies.children (array of objects).
        that = this;
        // this.enemies.forEach(function(enemy) {
        //     if ((Math.abs(enemy.body.velocity.x) < that.enemySpeed &&
        //          Math.abs(enemy.body.velocity.y) < that.enemySpeed) ||
        //         game.time.now > enemy.moveTime) {
        //         enemy.body.velocity.x = 0;
        //         enemy.body.velocity.y = 0;
        //         switch(game.rnd.integerInRange(0, 3)) {
        //         case 0:
        //             enemy.body.velocity.x = that.enemySpeed;
        //             break;
        //         case 1:
        //             enemy.body.velocity.y = that.enemySpeed;
        //             break;
        //         case 2:
        //             enemy.body.velocity.x = -that.enemySpeed;
        //             break;
        //         case 3:
        //             enemy.body.velocity.y = -that.enemySpeed;
        //             break;
        //         }
        //         enemy.moveTime = game.time.now + game.rnd.integerInRange(5, 10)*200;
        //     }
        // });

    },
    extend: {
        /**
         * Move prime factor wheel up or down.
         * @param scrollDir {string} - direction to move: 'up' or 'down'
         */
        primeSelect: function(scrollDir) {
            'use strict';
            var tween, prime, i;

            if (scrollDir === 'down') {
                this.primeTime = game.time.now +
                    this.primeTimeOffset;
                for (i=0; i<4; i++) {
                    prime = this.wheel[this.tweenPrimes[i]];
                    tween = game.add.tween(prime)
                        .to({y: prime.y-25}, 180,
                            Phaser.Easing.Linear.None,
                            true);
                    if (i === 1) {
                        tween.onComplete.add(function() {
                            this.fill = '#ffffff';
                        }, prime);
                    }
                    else if (i === 2) {
                        prime.fill = '#666666';
                    }
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
                        .to({y: prime.y+25}, 180,
                            Phaser.Easing.Linear.None,
                            true);
                    if (i === 3) {
                        tween.onComplete.add(function() {
                            this.fill = '#ffffff';
                        }, prime);
                    }
                    else if (i === 2) {
                        prime.fill = '#666666';
                    }
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
            this.wheelScale[this.tweenPrimes[2]].play();

            console.log(this.chosenPrime);
        },
        /**
         * Fire the main gun.
         */
        fire: function() {
            'use strict';
            var bullet, bulletOffset;

            if (game.time.now > this.bulletTime) {
                this.bulletTime = game.time.now + this.bulletTimeOffset;
                bullet = this.bullets.getFirstExists(false);

                if (bullet) {
                    bullet.prime = this.chosenPrime;
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
        /**
         * Add a single enemy to the screen.
         */
        dispatchEnemy: function() {
            'use strict';
            var enemy, textStyle, enemyIdx, xPos, approachAngle;

            // console.log('dispatchEnemy()');

            enemy = this.enemies.getFirstExists(false);

            textStyle = {
                font: '20px Arial',
                fill: '#ffffff',
                // wordWrap: true,
                // wordWrapWidth: sprite.width,
                align: 'center',
                // backgroundColor: '#ffff00'
            };

            if (enemy) {
                enemy.body.setCircle(16);
                enemyIdx = game.rnd.integerInRange(0, this.enemyFreqs.length-1);
                enemy.number = levels[this.levelIdx][this.enemyFreqs[enemyIdx]][0];
                xPos = game.rnd.integerInRange(1,6)*100;
                enemy.reset(xPos, 30);
                approachAngle = game.physics.arcade.angleBetween(enemy, this.gun);
                game.physics.arcade.velocityFromRotation(
                    approachAngle, this.enemySpeed, enemy.body.velocity
                );
                enemy.text = game.add.text(enemy.x, enemy.y + 2,
                                           enemy.number, textStyle);
                enemy.text.anchor.set(0.5);
                game.physics.arcade.enable(enemy.text);
                game.physics.arcade.velocityFromRotation(
                    approachAngle, this.enemySpeed, enemy.text.body.velocity
                );
                this.enemyTime = game.time.now +
                    this.enemyTimeOffset +
                    game.rnd.integerInRange(0,8)*200;
                this.enemiesDispatched++;
            }
        },
        /**
         * Process events after a bullet strikes an enemy.  If the bullet
         * was fired with a factor of the enemy's number, remove that
         * factor from the number, otherwise the enemy proceeds without
         * damage.
         * @param bullet
         * @param enemy
         */
        hitEnemy: function(bullet, enemy) {
            'use strict';
            var prime, factors;

            prime = bullet.prime;
            bullet.kill();

            factors = this.factors[enemy.number];
            if (factors === null) {
                if (prime === enemy.number) {
                    this.killEnemy(enemy);
                }
                else {
                    // console.log('bounce 1');
                    this.angerEnemy(enemy);
                }
            }
            else if (factors[prime] != null) {
                this.hurtEnemy(enemy, prime);
            }
            else {
                // console.log('bounce 2');
                this.angerEnemy(enemy);
            }
        },
        /**
         * Destroy and remove an enemy from the screen.
         * @param enemy
         */
        killEnemy: function(enemy) {
            'use strict';

            enemy.text.kill();
            enemy.kill();
            this.explosion.play();
            score += 10;
            this.enemiesKilled++;

            if (this.enemiesKilled === this.enemyTotal) {
                game.state.start('level');
            }
        },
        /**
         * Damage an enemy.
         * @param enemy
         */
        hurtEnemy: function(enemy, prime) {
            'use strict';
            var soundIdx;

            soundIdx = game.rnd.integerInRange(0,2);
            this.hits[soundIdx].play();

            enemy.animations.play('hurt');

            enemy.number /= prime;
            enemy.text.text = enemy.number;
        },
        /**
         * Increase an enemy's velocity due to a bad hit.
         * @param enemy
         */
        angerEnemy: function(enemy) {
            'use strict';
            var soundIdx, velX, velY;

            soundIdx = game.rnd.integerInRange(0,2);
            this.pings[soundIdx].play();

            enemy.animations.play('shield');

            velX = enemy.body.velocity.x;
            velX += velX * 0.2;
            velY = enemy.body.velocity.y;
            velY += velY * 0.2;

            enemy.body.velocity.x = velX;
            enemy.body.velocity.y = velY;
            enemy.text.body.velocity.x = velX;
            enemy.text.body.velocity.y = velY;
        },
        /**
         * Move to end screen.
         */
        end: function() {
            'use strict';

            console.log('[PLAY] end');

            this.explosion.play();
            // game.state.start('end');

            this.scene.restart();
            game.scene.switch('play', 'end')
            this.cursors.right.isDown = false;
            this.cursors.left.isDown = false;
            this.cursors.up.isDown = false;
            this.cursors.down.isDown = false;
            console.log('CURSORS OFF');
        }



        // woomp: function() {
        //     'use strict';

        //     if (game.time.now > this.woompTime) {
        //         console.log('woomp');
        //         this.woompTime = game.time.now + this.woompTimeOffset;
        //     }
        // },
        // createEnemies: function() {
        //     'use strict';
        //     var i, positions, pos, enemy;

        //     console.log('createEnemies()');

        //     positions = [
        //         [50, 50],
        //         [150, 100],
        //         [250, 50],
        //         [350, 100]
        //     ];
        //     for (i=0; i<positions.length; i++) {
        //         pos = positions[i];
        //         enemy = this.enemies.create(pos[0], pos[1], 'enemy');
        //         // enemy.anchor.setTo(0.5, 0.5);
        //     }
        // },
        // die: function(player, enemy) {
        //     'use strict';

        //     console.log('die');

        //     this.end();
        // },
        // end: function() {
        //     'use strict';
        //     console.log('[PLAY] end');
        //     this.scene.restart();
        //     game.scene.switch('play', 'end')
        //     this.cursors.right.isDown = false;
        //     this.cursors.left.isDown = false;
        //     this.cursors.up.isDown = false;
        //     this.cursors.down.isDown = false;
        //     console.log('CURSORS OFF');
        // }
    }
};

levelState = {
    create: function() {
        'use strict';
        var nameLbl, startLbl, wKey;

        nameLbl = game.add.text(80, 160, 'LEVEL ' + (level+1) + ' COMPLETE',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = game.add.text(80, 240, 'press "W" to start next level',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(this.start, this);
    },
    start: function() {
        'use strict';
        level += 1;
        game.state.start('play');
    }
};

endState = {
    create: function() {
        'use strict';
        var scoreLbl, nameLbl, startLbl, highScoreLbl, wKey;

        scoreLbl = game.add.text(600, 10, 'Score: ' + score,
                                 {font: '30px Courier',
                                  fill: '#ffffff'});
        nameLbl = game.add.text(80, 160, 'YOU DIED',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = game.add.text(80, 240, 'press "W" to restart',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        if (score <= highScore) {
            highScoreLbl = game.add.text(510, 50, 'High Score: ' + highScore,
                                         {font: '30px Courier',
                                          fill: '#ffffff'});
        }
        else {
            highScoreLbl = game.add.text(300, 50, 'New High Score!',
                                         {font: '30px Courier',
                                          fill: '#ffffff'});
            highScore = score;
        }

        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(this.restart, this);
    },
    restart: function() {
        'use strict';
        game.state.start('title');
    }
};

endScene = {
    key: 'end',
    create: function() {
        'use strict';
        var scoreLbl, nameLbl, startLbl;



        var scoreLbl, nameLbl, startLbl, highScoreLbl, wKey;

        scoreLbl = this.add.text(600, 10, 'Score: ' + score,
                                 {font: '30px Courier',
                                  fill: '#ffffff'});
        nameLbl = this.add.text(80, 160, 'YOU DIED',
                                {font: '50px Courier',
                                 fill: '#ffffff'});
        startLbl = this.add.text(80, 240, 'press "W" to restart',
                                 {font: '30px Courier',
                                  fill: '#ffffff'});

        if (score <= highScore) {
            highScoreLbl = this.add.text(510, 50, 'High Score: ' + highScore,
                                         {font: '30px Courier',
                                          fill: '#ffffff'});
        }
        else {
            highScoreLbl = this.add.text(300, 50, 'New High Score!',
                                         {font: '30px Courier',
                                          fill: '#ffffff'});
            highScore = score;
        }

        // wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        // wKey.onDown.addOnce(this.restart, this);

        this.input.keyboard.on('keydown_W', this.restart, this);
    },
    extend: {
        restart: function() {
            'use strict';
            game.scene.switch('end', 'title')
        }
    }
};


const gameConfig = {
    // type: Phaser.CANVAS,
    type: Phaser.AUTO,
    parent: 'game-div',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ bootScene, loadScene, titleScene, playScene,
             // levelScene,
             endScene]
};

game = new Phaser.Game(gameConfig);
game.scene.start('boot', { someData: '...arbitrary data' });


// game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-div');

// game.state.add('boot', bootState);
// game.state.add('load', loadState);
// game.state.add('title', titleState);
// game.state.add('play', playState);
// game.state.add('level', levelState);
// game.state.add('end', endState);

// game.state.start('boot');
