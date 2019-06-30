let score, highScore, level, game

highScore = 0


class BootScene extends Phaser.Scene {
    constructor() {
        super('boot')
    }

    preload() {
        console.log('[BOOT] preload')
    }

    create() {
        game.scene.start('load')
        game.scene.remove('boot')
    }

    update() {
        console.log('[BOOT] update')
    }
}


class LoadScene extends Phaser.Scene {
    constructor() {
        super('load')
    }

    preload() {
        let loadLbl

        loadLbl = this.add.text(80, 160, 'loading...',
                                {font: '30px Courier',
                                 fill: '#ffffff'})

        // Load images
        this.load.image('gun', 'assets/gun-blue.png')
        this.load.image('bullet', 'assets/bullet.png')
        // this.load.image('enemy', 'assets/circle-red.png')
        this.load.image('block', 'assets/square-blue.png')
        this.load.spritesheet(
            'enemy', 'assets/circles.png',
            {frameWidth: 32,
             frameHeight: 32}
        )

        // Load sound effects
        this.load.audio('wheelC4', 'assets/C4.wav')
        this.load.audio('wheelCs4', 'assets/Cs4.wav')
        this.load.audio('wheelD4', 'assets/D4.wav')
        this.load.audio('wheelDs4', 'assets/Ds4.wav')
        this.load.audio('wheelE4', 'assets/E4.wav')
        this.load.audio('wheelF4', 'assets/F4.wav')
        this.load.audio('wheelFs4', 'assets/Fs4.wav')
        this.load.audio('wheelG4', 'assets/G4.wav')
        this.load.audio('wheelGs4', 'assets/Gs4.wav')
        this.load.audio('wheelA4', 'assets/A4.wav')
        this.load.audio('wheelAs4', 'assets/As4.wav')
        this.load.audio('wheelB4', 'assets/B4.wav')
        this.load.audio('wheelC5', 'assets/C5.wav')
        this.load.audio('explosion', 'assets/explosion.wav')
        this.load.audio('hit1', 'assets/hit1.wav')
        this.load.audio('hit2', 'assets/hit2.wav')
        this.load.audio('hit3', 'assets/hit3.wav')
        this.load.audio('ping1', 'assets/ping1.wav')
        this.load.audio('ping2', 'assets/ping2.wav')
        this.load.audio('ping3', 'assets/ping3.wav')
    }

    create() {
        game.scene.start('title')
        game.scene.remove('load')
    }

    update() {
        console.log('[LOAD] update')
    }
}


class TitleScene extends Phaser.Scene {
    constructor() {
        super('title')
    }

    preload() {
        console.log('[TITLE] preload')
    }

    create() {
        let nameLbl, startLbl

        nameLbl = this.add.text(80, 160, 'Factorizor',
                                {font: '50px Courier',
                                 fill: '#ffffff'})
        startLbl = this.add.text(80, 240, 'press "W" to start',
                                 {font: '30px Courier',
                                  fill: '#ffffff'})

        this.input.keyboard.on('keydown_W', this.play, this)
    }

    update() {
        console.log('[TITLE] update')
    }

    play() {
        console.log('[TITLE] play')
        score = 0
        level = 0
        game.scene.switch('title', 'play')
    }
}


/**
 * Level setup info list.
 * For each level, there's a list of factors with frequency weights.
 */
const levels = [
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
]

const factors = {
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
}


class PlayScene extends Phaser.Scene {
    constructor() {
        super('play')
    }

    // enemyCounts: [5, 10, 10, 10, 10, 20, 20, 20, 20],
    // enemyCounts: [5, 5, 5, 5, 10, 10, 10, 10, 10],
    create() {
        let block, i, j, primeStyle
        let that = this

        console.log('[PLAY] create')

        this.lastDir = null
        this.dirTime1 = 0
        this.dirTime2 = 0
        this.dirTime1Offset = 200
        this.dirTime2Offset = 500

        // Gun
        this.gun = this.physics.add.sprite(400, 400, 'gun')
        this.gun.body.setCircle(28)
        this.gun.angle -= 90

        // Bullets
        this.bullets = this.physics.add.group({
            key: 'bullet',
            active: false,
            repeat: 30,
            setXY: { x: 0, y: -200},
        })
        this.bullets.children.iterate(function(bullet) {
            that.bullets.killAndHide(bullet)
            bullet.body.onWorldBounds = true
        })

        this.bulletTime = 0
        this.bulletTimeOffset = 200
        this.bulletSpeed = 500

        this.hits = []
        this.hits.push(this.sound.add('hit1'))
        this.hits.push(this.sound.add('hit2'))
        this.hits.push(this.sound.add('hit3'))

        this.pings = []
        this.pings.push(this.sound.add('ping1'))
        this.pings.push(this.sound.add('ping2'))
        this.pings.push(this.sound.add('ping3'))

        // Enemies
        this.enemies = this.physics.add.group({
            key: 'enemy',
            active: false,
            repeat: 30,
            setXY: { x: 0, y: -300},
        })
        this.enemies.children.iterate(function(enemy) {
            that.enemies.killAndHide(enemy)
            // enemy.body.onWorldBounds = true
        })
        // this.enemies.setAll('outOfBoundsKill', true)
        // this.enemies.setAll('checkWorldBounds', true)
        // this.enemies.setAll('anchor.x', 0.5)
        // this.enemies.setAll('anchor.y', 0.5)
        // this.enemies.callAll('animations.add', 'animations', 'shield', [2, 0], 10, false)
        // this.enemies.callAll('animations.add', 'animations', 'hurt', [3, 0], 10, false)
        this.enemiesDispatched = 0
        this.enemiesKilled = 0
        this.enemyTime = 0
        this.enemyTimeOffset = 2000
        this.enemySpeed = 20
        this.explosion = this.sound.add('explosion')

        // Set up enemy frequencies based on level info.
        this.levelIdx = level
        if (this.levelIdx >= levels.length) {
            this.levelIdx = levels.length-1
        }
        this.enemyCounts = [5, 5, 5, 5, 10, 10, 10, 10, 10]
        this.enemyTotal = this.enemyCounts[this.levelIdx]
        this.enemyFreqs = []
        for (i=0; i<levels[this.levelIdx].length; i++) {
            for (j=0; j<levels[this.levelIdx][i][1]; j++) {
                this.enemyFreqs.push(i)
            }
        }

        // Factor wheel
        this.primes = [2, 3, 5, 7, 11, 13, 17, 19]
        primeStyle = {
            font: '20px Arial',
            fill: '#666666',
            align: 'center',
        }
        this.wheel = []
        for (i=0; i<this.primes.length; i++) {
            this.wheel.push(this.add.text(400, 450,
                                          this.primes[i],
                                          primeStyle))
            // this.wheel[i].anchor.set(0.5)
        }
        this.wheel[3].y = 475
        this.wheel[2].y = 500
        this.wheel[1].y = 525
        this.wheel[0].y = 550
        this.wheel[2].fill = '#ffffff'
        this.chosenPrime = this.primes[2]   // active prime
        this.tweenPrimes = [0, 1, 2, 3, 4]
        this.primeTime = 0
        this.primeTimeOffset = 200

        this.wheelScale = [
            this.sound.add('wheelC4'),
            this.sound.add('wheelD4'),
            this.sound.add('wheelE4'),
            this.sound.add('wheelF4'),
            this.sound.add('wheelG4'),
            this.sound.add('wheelA4'),
            this.sound.add('wheelB4'),
            this.sound.add('wheelC5')
        ]

        // Blocks
        block = this.physics.add.sprite(400, 443, 'block')
        block = this.physics.add.sprite(400, 550, 'block')

        // Controls
        this.cursors = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'fire': Phaser.Input.Keyboard.KeyCodes.SPACEBAR
        })

        // Score
        this.scoreText = this.add.text(
            600, 475, 'Score: ' + score,
            {font: '30px Courier',
             fill: '#ffffff'}
        )
    }

    update() {
        let now

        // console.log('[PLAY] update')

        now = this.time.now
        // game.physics.arcade.overlap(this.gun, this.enemies,
        //                             this.end, null, this)
        // game.physics.arcade.overlap(this.bullets, this.enemies,
        //                             this.hitEnemy, null, this)

        if (this.cursors.left.isDown) {
            this.gun.angle -= 1
            // console.log('angle: ' + this.gun.angle)
            if (this.lastDir != 'left') {
                this.lastDir = 'left'
                this.dirTime1 = now + this.dirTime1Offset
                this.dirTime2 = now + this.dirTime2Offset
            }
            else {
                if (now > this.dirTime2) {
                    this.gun.angle -= 3
                }
                else if (now > this.dirTime1) {
                    this.gun.angle -= 2
                }
                else {
                    this.gun.angle -= 1
                }
            }
        }
        else if (this.cursors.right.isDown) {
            // console.log('angle: ' + this.gun.angle)
            if (this.lastDir != 'right') {
                this.lastDir = 'right'
                this.dirTime1 = now + this.dirTime1Offset
                this.dirTime2 = now + this.dirTime2Offset
            }
            else {
                if (now > this.dirTime2) {
                    this.gun.angle += 3
                }
                else if (now > this.dirTime1) {
                    this.gun.angle += 2
                }
                else {
                    this.gun.angle += 1
                }
            }
        }
        else {
            if (this.lastDir != null) {
                this.lastDir = null
            }
        }

        if (now > this.primeTime) {
            if (this.cursors.up.isDown) {
                this.primeSelect('up')
            }
            else if (this.cursors.down.isDown) {
                this.primeSelect('down')
            }
        }

        if (this.cursors.fire.isDown) {
            this.fire()
        }

        if (now > this.enemyTime &&
            this.enemiesDispatched < this.enemyTotal) {
            this.dispatchEnemy()
        }

        this.scoreText.text = 'Score: ' + score
    }

    /**
     * Move prime factor wheel up or down.
     * @param scrollDir {string} - direction to move: 'up' or 'down'
     */
    primeSelect(scrollDir) {
        let tween, prime, i

        if (scrollDir === 'down') {
            this.primeTime = this.time.now +
                this.primeTimeOffset
            for (i=0; i<4; i++) {
                prime = this.wheel[this.tweenPrimes[i]]
                // tween = game.add.tween(prime)
                //     .to({y: prime.y-25}, 180,
                //         Phaser.Easing.Linear.None,
                //         true)
                tween = this.tweens.add({
                    targets: prime,
                    y: prime.y - 25,         // '+=100'
                    ease: 'Linear',          // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 180
                    // repeat: -1,              // -1: infinity
                    // yoyo: true
                })

                if (i === 1) {
                    tween.onComplete = function() {
                        this.fill = '#ffffff'
                    }
                    tween.onCompleteScope = prime
                }
                else if (i === 2) {
                    prime.fill = '#666666'
                }
            }

            for (i=4; i>0; i--) {
                this.tweenPrimes[i] = this.tweenPrimes[i-1]
            }

            if (this.tweenPrimes[0] === 0) {
                this.tweenPrimes[0] = this.primes.length-1
            }
            else {
                this.tweenPrimes[0] = this.tweenPrimes[0]-1
            }
            this.wheel[this.tweenPrimes[0]].y = 550
        }
        else {
            this.primeTime = this.time.now +
                this.primeTimeOffset
            for (i=1; i<5; i++) {
                prime = this.wheel[this.tweenPrimes[i]]
                // tween = game.add.tween(prime)
                //     .to({y: prime.y+25}, 180,
                //         Phaser.Easing.Linear.None,
                //         true)

                tween = this.tweens.add({
                    targets: prime,
                    y: prime.y + 25,            // '+=100'
                    ease: 'Linear',          // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 180
                    // repeat: -1,              // -1: infinity
                    // yoyo: true
                })

                if (i === 3) {
                    tween.onComplete = function() {
                        this.fill = '#ffffff'
                    }
                    tween.onCompleteScope = prime
                }
                else if (i === 2) {
                    prime.fill = '#666666'
                }
            }

            for (i=0; i<4; i++) {
                this.tweenPrimes[i] = this.tweenPrimes[i+1]
            }

            if (this.tweenPrimes[4] === this.primes.length-1) {
                this.tweenPrimes[4] = 0
            }
            else {
                this.tweenPrimes[4] = this.tweenPrimes[4]+1
            }
            this.wheel[this.tweenPrimes[4]].y = 450
        }

        this.chosenPrime = this.primes[this.tweenPrimes[2]]
        this.wheelScale[this.tweenPrimes[2]].play()

        console.log(this.chosenPrime)
    }

    /**
     * Fire the main gun.
     */
    fire() {
        let bullet, bulletOffset

        if (this.time.now > this.bulletTime) {
            this.bulletTime = this.time.now + this.bulletTimeOffset
            bullet = this.bullets.getFirstDead(false)

            if (bullet) {
                bullet.active = true
                bullet.visible = true
                bullet.body.collideWorldBounds = true
                bullet.prime = this.chosenPrime
                bulletOffset = game.physics.arcade.velocityFromAngle(
                    this.gun.angle, 28
                )
                // bullet.reset(this.gun.x + bulletOffset.x,
                //              this.gun.y + bulletOffset.y)
                bullet.setPosition(this.gun.x + bulletOffset.x,
                                   this.gun.y + bulletOffset.y)
                game.physics.arcade.velocityFromAngle(
                    this.gun.angle, this.bulletSpeed, bullet.body.velocity
                )
            }
        }
    }

    /**
     * Add a single enemy to the screen.
     */
    dispatchEnemy() {
        let enemy, textStyle, enemyIdx, xPos, approachAngle

        // console.log('dispatchEnemy()')

        enemy = this.enemies.getFirstDead(false)

        textStyle = {
            font: '20px Arial',
            fill: '#ffffff',
            // wordWrap: true,
            // wordWrapWidth: sprite.width,
            align: 'center',
            // backgroundColor: '#ffff00'
        }

        if (enemy) {
            enemy.active = true
            enemy.visible = true
            enemy.body.setCircle(16)
            // enemyIdx = game.rnd.integerInRange(0, this.enemyFreqs.length-1)
            enemyIdx = Phaser.Math.Between(0, this.enemyFreqs.length-1)
            enemy.number = levels[this.levelIdx][this.enemyFreqs[enemyIdx]][0]
            // xPos = game.rnd.integerInRange(1,6)*100
            xPos = Phaser.Math.Between(1, 6)*100
            // enemy.reset(xPos, 30)
            enemy.setPosition(xPos, 30)
            // approachAngle = game.physics.arcade.angleBetween(enemy, this.gun)
            // approachAngle = this.physics.angleBetween(enemy, this.gun)
            approachAngle = Phaser.Math.Angle.BetweenPoints(enemy.x, enemy.y, this.gun.x, this.gun.y)
            // game.physics.arcade.velocityFromRotation(
            //     approachAngle, this.enemySpeed, enemy.body.velocity
            // )
            this.physics.velocityFromRotation(
                approachAngle, this.enemySpeed, enemy.body.velocity
            )
            enemy.text = this.add.text(enemy.x, enemy.y + 2,
                                       enemy.number, textStyle)
            // enemy.text.anchor.set(0.5)
            this.physics.world.enable(enemy.text)
            this.physics.velocityFromRotation(
                approachAngle, this.enemySpeed, enemy.text.body.velocity
            )
            this.enemyTime = this.time.now +
                this.enemyTimeOffset +
                Phaser.Math.Between(0, 8)*200
                // game.rnd.integerInRange(0,8)*200
            this.enemiesDispatched++
        }
    }

    /**
     * Process events after a bullet strikes an enemy.  If the bullet
     * was fired with a factor of the enemy's number, remove that
     * factor from the number, otherwise the enemy proceeds without
     * damage.
     * @param bullet
     * @param enemy
     */
    hitEnemy(bullet, enemy) {
        let prime

        prime = bullet.prime
        bullet.kill()

        if (factors[enemy.number] === null) {
            if (prime === enemy.number) {
                this.killEnemy(enemy)
            }
            else {
                // console.log('bounce 1')
                this.angerEnemy(enemy)
            }
        }
        else if (factors[enemy.number][prime] != null) {
            this.hurtEnemy(enemy, prime)
        }
        else {
            // console.log('bounce 2')
            this.angerEnemy(enemy)
        }
    }

    /**
     * Destroy and remove an enemy from the screen.
     * @param enemy
     */
    killEnemy(enemy) {
        enemy.text.kill()
        enemy.kill()
        this.explosion.play()
        score += 10
        this.enemiesKilled++

        if (this.enemiesKilled === this.enemyTotal) {
            game.state.start('level')
        }
    }

    /**
     * Damage an enemy.
     * @param enemy
     */
    hurtEnemy(enemy, prime) {
        let soundIdx

        // soundIdx = game.rnd.integerInRange(0,2)
        soundIdx = Phaser.Math.Between(0, 2)
        this.hits[soundIdx].play()

        enemy.animations.play('hurt')

        enemy.number /= prime
        enemy.text.text = enemy.number
    }

    /**
     * Increase an enemy's velocity due to a bad hit.
     * @param enemy
     */
    angerEnemy(enemy) {
        let soundIdx, velX, velY

        // soundIdx = game.rnd.integerInRange(0,2)
        soundIdx = Phaser.Math.Between(0, 2)
        this.pings[soundIdx].play()

        enemy.animations.play('shield')

        velX = enemy.body.velocity.x
        velX += velX * 0.2
        velY = enemy.body.velocity.y
        velY += velY * 0.2

        enemy.body.velocity.x = velX
        enemy.body.velocity.y = velY
        enemy.text.body.velocity.x = velX
        enemy.text.body.velocity.y = velY
    }

    /**
     * Move to end screen.
     */
    end() {
        console.log('[PLAY] end')

        this.explosion.play()
        // game.state.start('end')

        this.scene.restart()
        game.scene.switch('play', 'end')
        this.cursors.right.isDown = false
        this.cursors.left.isDown = false
        this.cursors.up.isDown = false
        this.cursors.down.isDown = false
        console.log('CURSORS OFF')
    }
}


class LevelScene extends Phaser.Scene {
    constructor() {
        super('level')
    }

    create() {
        let nameLbl, startLbl

        nameLbl = this.add.text(80, 160, 'LEVEL ' + (level+1) + ' COMPLETE',
                                {font: '50px Courier',
                                 fill: '#ffffff'})
        startLbl = this.add.text(80, 240, 'press "W" to start next level',
                                 {font: '30px Courier',
                                  fill: '#ffffff'})

        this.input.keyboard.on('keydown_W', this.start, this)
    }

    start() {
        level += 1
        game.state.start('play')
    }
}


class EndScene extends Phaser.Scene {
    constructor() {
        super('end')
    }

    create() {
        let scoreLbl, nameLbl, startLbl

        scoreLbl = this.add.text(600, 10, 'Score: ' + score,
                                 {font: '30px Courier',
                                  fill: '#ffffff'})
        nameLbl = this.add.text(80, 160, 'YOU DIED',
                                {font: '50px Courier',
                                 fill: '#ffffff'})
        startLbl = this.add.text(80, 240, 'press "W" to restart',
                                 {font: '30px Courier',
                                  fill: '#ffffff'})

        if (score <= highScore) {
            highScoreLbl = this.add.text(510, 50, 'High Score: ' + highScore,
                                         {font: '30px Courier',
                                          fill: '#ffffff'})
        }
        else {
            highScoreLbl = this.add.text(300, 50, 'New High Score!',
                                         {font: '30px Courier',
                                          fill: '#ffffff'})
            highScore = score
        }

        this.input.keyboard.on('keydown_W', this.restart, this)
    }

    restart() {
        game.scene.switch('end', 'title')
    }
}


const gameConfig = {
    // type: Phaser.CANVAS,
    type: Phaser.AUTO,
    parent: 'game-div',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        BootScene,
        LoadScene,
        TitleScene,
        PlayScene,
        LevelScene,
        EndScene
    ]
}

game = new Phaser.Game(gameConfig)
game.scene.start('boot', { someData: '...arbitrary data' })
