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
        game.load.image('block', 'assets/square-blue.png');

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
    },
    create: function() {
        'use strict';
        var block, i, primeStyle;

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
        // this.createEnemies();
        this.enemies.createMultiple(30, 'enemy');
        // this.enemies.setAll('outOfBoundsKill', true);
        // this.enemies.setAll('checkWorldBounds', true);
        this.enemies.setAll('anchor.x', 0.5);
        this.enemies.setAll('anchor.y', 0.5);
        this.enemiesKilled = 0;
        this.enemyTime = 0;
        this.enemyTimeOffset = 2000;
        this.enemySpeed = 20;
        // this.explosion = game.add.audio('explosion');

        // Factor wheel
        this.primes = [2, 3, 5, 7, 11, 13, 17, 19];
        primeStyle = {
            font: '20px Arial',
            fill: '#666666',
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
        this.wheel[2].fill = '#ffffff';
        this.chosenPrime = this.primes[2];   // active prime
        this.tweenPrimes = [0, 1, 2, 3, 4];
        this.primeTime = 0;
        this.primeTimeOffset = 200;

        // Blocks
        block = game.add.sprite(400, 443, 'block');
        block.anchor.setTo(0.5, 0.5);
        block = game.add.sprite(400, 550, 'block');
        block.anchor.setTo(0.5, 0.5);
        
        // Controls
        this.cursors = game.input.keyboard.addKeys({
            'up': Phaser.Keyboard.W,
            'down': Phaser.Keyboard.S,
            'left': Phaser.Keyboard.A,
            'right': Phaser.Keyboard.D,
            'fire': Phaser.Keyboard.SPACEBAR
        });

        // Score
        score = 0;
        this.scoreText = game.add.text(600, 475, 'Score: ' + score,
                                       {font: '30px Courier',
                                        fill: '#ffffff'});
    },
    update: function() {
        'use strict';

        game.physics.arcade.overlap(this.gun, this.enemies,
                                    this.end, null, this);
        game.physics.arcade.overlap(this.bullets, this.enemies,
                                    this.hitEnemy, null, this);

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
        
        if (game.time.now > this.enemyTime) {
            this.dispatchEnemy();
        }
        
        this.scoreText.text = 'Score: ' + score;
    },
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
     * Create the underlying enemy pool.
     */
    createEnemies: function() {
        'use strict';
        var textStyle, i, enemy, text;
        
        textStyle = {
            font: '20px Arial',
            fill: '#ffffff',
            // wordWrap: true,
            // wordWrapWidth: sprite.width,
            align: 'center',
            // backgroundColor: '#ffff00'
        };
        
        for (i=2; i<8; i++) {
            enemy = this.enemies.create((i-2)*100 + 50, 100, 'enemy');
            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.setCircle(16);
            enemy.number = game.rnd.integerInRange(2,22);
            enemy.text = game.add.text(enemy.x,
                                       enemy.y + 2,
                                       enemy.number,
                                       textStyle);
            enemy.text.anchor.set(0.5);
        }
    },
    /**
     * Add a single enemy to the screen.
     */
    dispatchEnemy: function() {
        'use strict';
        var enemy, textStyle, xPos, approachAngle;

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
            enemy.number = game.rnd.integerInRange(2,22);
            xPos = game.rnd.integerInRange(1,6)*100;
            enemy.reset(xPos, 30);
            approachAngle = game.physics.arcade.angleBetween(enemy, this.gun);
            game.physics.arcade.velocityFromRotation(
                approachAngle, this.enemySpeed, enemy.body.velocity
            );
            enemy.text = game.add.text(enemy.x,
                                       enemy.y + 2,
                                       enemy.number,
                                       textStyle);
            enemy.text.anchor.set(0.5);
            game.physics.arcade.enable(enemy.text);
            game.physics.arcade.velocityFromRotation(
                approachAngle, this.enemySpeed, enemy.text.body.velocity
            );
            this.enemyTime = game.time.now +
                this.enemyTimeOffset +
                game.rnd.integerInRange(0,8)*200;
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
        var factors;
        
        bullet.kill();

        factors = this.factors[enemy.number];
        if (factors === null) {
            if (this.chosenPrime === enemy.number) {
                this.killEnemy(enemy);
            }
            else {
                console.log('bounce 1');
            }
        }
        else if (factors[this.chosenPrime] != null) {
            enemy.number /= this.chosenPrime;
            enemy.text.text = enemy.number;
        }
        else {
            console.log('bounce 2');
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
        // this.explosion.play();
        score += 10;
        this.enemiesKilled++;
    },
    /**
     * Move to end screen.
     */
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
