let score, highScore, level, game

highScore = 0


class FactorWheel {
    constructor(scene) {
        this.scene = scene
        this.primes = [2, 3, 5, 7, 11, 13, 17, 19]
        this.primeTexts = ['02', '03', '05', '07', '11', '13', '17', '19']
        let primeStyle = {
            font: '20px Arial',
            fill: '#666666',
            align: 'center',
        }

        this.wheel = []
        for (let i=0; i<this.primeTexts.length; i++) {
            this.wheel.push(
                this.scene.add.text(400, 450,
                              this.primeTexts[i],
                              primeStyle)
            )
            this.wheel[i].setOrigin(0.5)
        }
        this.wheel[3].y = 475
        this.wheel[2].y = 500
        this.wheel[1].y = 525
        this.wheel[0].y = 550
        this.wheel[2].setFill('#ffffff')
        this.chosenPrimeIdx = 2
        this.chosenPrime = this.primes[this.chosenPrimeIdx]   // active prime
        this.tweenPrimes = [0, 1, 2, 3, 4]
        this.primeTime = 0
        this.primeTimeOffset = 180

        this.wheelScale = [
            this.scene.sound.add('wheelC4'),
            this.scene.sound.add('wheelD4'),
            this.scene.sound.add('wheelE4'),
            this.scene.sound.add('wheelF4'),
            this.scene.sound.add('wheelG4'),
            this.scene.sound.add('wheelA4'),
            this.scene.sound.add('wheelB4'),
            this.scene.sound.add('wheelC5')
        ]
    }

    /**
     * Move prime factor wheel up or down.
     * @param scrollDir {string} - direction to move: 'up' or 'down'
     */
    primeSelect(scrollDir) {
        let tween, prime, primesLen, i, currentIdx, duration

        // console.log('FactorWheel.primeSelect(' + scrollDir + ')')

        primesLen = this.primes.length
        this.primeTime = this.scene.time.now + this.primeTimeOffset
        duration = 75
        if (scrollDir === 'down') {
            for (i=this.chosenPrimeIdx-2;
                 i<this.chosenPrimeIdx+2;
                 i++) {
                currentIdx = (i + primesLen) % primesLen
                prime = this.wheel[currentIdx]

                prime.setFill('#666666')
                if (i === this.chosenPrimeIdx-1) {
                    tween = this.scene.tweens.add({
                        targets: prime,
                        y: prime.y - 25,         // '+=100'
                        ease: 'Linear',          // 'Cubic', 'Elastic', 'Bounce', 'Back'
                        duration: duration,
                        repeat: 0,                // -1: infinity
                        onComplete: function() {
                            this.setFill('#ffffff')
                        },
                        onCompleteScope: prime
                    })
                } else {
                    tween = this.scene.tweens.add({
                        targets: prime,
                        y: prime.y - 25,         // '+=100'
                        ease: 'Linear',          // 'Cubic', 'Elastic', 'Bounce', 'Back'
                        duration: duration,
                        repeat: 0                // -1: infinity
                    })
                }
            }

            i = this.chosenPrimeIdx-3
            currentIdx = (i + primesLen) % primesLen
            this.wheel[currentIdx].setY(550)
            this.chosenPrimeIdx = ((this.chosenPrimeIdx - 1) + primesLen) % primesLen
        } else {
            for (i=this.chosenPrimeIdx-1;
                 i<this.chosenPrimeIdx+3;
                 i++) {
                currentIdx = (i + primesLen) % primesLen
                prime = this.wheel[currentIdx]

                prime.setFill('#666666')
                if (i === this.chosenPrimeIdx+1) {
                    tween = this.scene.tweens.add({
                        targets: prime,
                        y: prime.y + 25,         // '+=100'
                        ease: 'Linear',          // 'Cubic', 'Elastic', 'Bounce', 'Back'
                        duration: duration,
                        repeat: 0,               // -1: infinity
                        onComplete: function() {
                            this.setFill('#ffffff')
                        },
                        onCompleteScope: prime
                    })
                } else {
                    tween = this.scene.tweens.add({
                        targets: prime,
                        y: prime.y + 25,         // '+=100'
                        ease: 'Linear',          // 'Cubic', 'Elastic', 'Bounce', 'Back'
                        duration: duration,
                        repeat: 0                // -1: infinity
                    })
                }
            }

            i = this.chosenPrimeIdx+3
            currentIdx = (i + primesLen) % primesLen
            this.wheel[currentIdx].setY(450)
            this.chosenPrimeIdx = ((this.chosenPrimeIdx + 1) + primesLen) % primesLen
        }

        this.chosenPrime = this.primes[this.chosenPrimeIdx]
        this.wheelScale[this.chosenPrimeIdx].play()
    }

}


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
        this.load.audio('fire1', 'assets/fire1.wav')
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

        this.input.keyboard.on('keydown-W', this.play, this)
    }

    update() {
        console.log('[TITLE] update')
    }

    play() {
        console.log('[TITLE] play')
        score = 0
        level = 0
        game.scene.getScene('level').resume()
        game.scene.switch('title', 'play')
    }
}


class PlayScene extends Phaser.Scene {
    constructor() {
        super('play')
    }

    create() {
        let block, i, j
        let that = this

        console.log('[PLAY] create')

        this.lastDir = null
        this.dirTime1 = 0
        this.dirTime2 = 0
        this.dirTime3 = 0
        this.dirTime1Offset = 50
        this.dirTime2Offset = 150
        this.dirTime3Offset = 300

        // Gun
        this.gun = this.physics.add.sprite(400, 400, 'gun')
        this.gun.body.setCircle(28, 4, 4)
        this.gun.angle -= 90
        this.gunSpeed = [1, 2, 4, 6]

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
        this.sound.add('fire1')

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
            // frame: 1,
            active: false,
            repeat: 30,
            setXY: { x: 0, y: -300},
        })
        this.enemies.children.iterate(function(enemy) {
            that.enemies.killAndHide(enemy)
        })
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
        this.enemyCounts = [5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10]
        this.enemyTotal = this.enemyCounts[this.levelIdx]
        this.enemyFreqs = []
        for (i=0; i<levels[this.levelIdx].length; i++) {
            for (j=0; j<levels[this.levelIdx][i][1]; j++) {
                this.enemyFreqs.push(i)
            }
        }

        // Factor wheel
        this.wheel = new FactorWheel(this)

        // Blocks
        block = this.physics.add.sprite(400, 445, 'block')
        block = this.physics.add.sprite(400, 552, 'block')

        // Controls
        this.cursors = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'fire': Phaser.Input.Keyboard.KeyCodes.SPACE
        })

        this.physics.add.overlap(this.gun, this.enemies,
                                 this.end, null, this)
        this.physics.add.overlap(this.bullets, this.enemies,
                                 this.hitEnemy, null, this)
        this.physics.world.on('worldbounds', function(body) {
            // console.log('WORLD BOUNDS')
            that.removeBullet(body.gameObject)
        })

        // Score
        this.scoreText = this.add.text(
            600, 475, 'Score: ' + score,
            {font: '30px Courier',
             fill: '#ffffff'}
        )
    }

    resume() {
        console.log('[PLAY] resume')

        this.enemiesDispatched = 0
        this.enemiesKilled = 0

        // Set up enemy frequencies based on level info.
        this.levelIdx = level
        if (this.levelIdx >= levels.length) {
            this.levelIdx = levels.length-1
        }

        this.enemyTotal = this.enemyCounts[this.levelIdx]
        this.enemyFreqs = []
        for (let i=0; i<levels[this.levelIdx].length; i++) {
            for (let j=0; j<levels[this.levelIdx][i][1]; j++) {
                this.enemyFreqs.push(i)
            }
        }

    }

    update() {
        let now

        // console.log('[PLAY] update')

        now = this.time.now

        if (this.cursors.left.isDown &&
            -180 < this.gun.angle &&
            this.gun.angle <= 0) {
            if (this.lastDir != 'left') {
                this.lastDir = 'left'
                this.dirTime1 = now + this.dirTime1Offset
                this.dirTime2 = now + this.dirTime2Offset
                this.dirTime3 = now + this.dirTime3Offset
            } else {
                if (now > this.dirTime3) {
                    this.gun.angle -= this.gunSpeed[3]
                } else if (now > this.dirTime2) {
                    this.gun.angle -= this.gunSpeed[2]
                } else if (now > this.dirTime1) {
                    this.gun.angle -= this.gunSpeed[1]
                } else {
                    this.gun.angle -= this.gunSpeed[0]
                }
            }
            if (this.gun.angle > 0) this.gun.angle = -180
        } else if (this.cursors.right.isDown &&
                   -180 <= this.gun.angle &&
                   this.gun.angle < 0) {
            if (this.lastDir != 'right') {
                this.lastDir = 'right'
                this.dirTime1 = now + this.dirTime1Offset
                this.dirTime2 = now + this.dirTime2Offset
                this.dirTime3 = now + this.dirTime3Offset
            } else {
                if (now > this.dirTime3) {
                    this.gun.angle += this.gunSpeed[3]
                } else if (now > this.dirTime2) {
                    this.gun.angle += this.gunSpeed[2]
                } else if (now > this.dirTime1) {
                    this.gun.angle += this.gunSpeed[1]
                } else {
                    this.gun.angle += this.gunSpeed[0]
                }
            }
            if (this.gun.angle > 0) this.gun.angle = 0
        } else {
            if (this.lastDir != null) {
                this.lastDir = null
            }
        }

        if (now > this.wheel.primeTime) {
            if (this.cursors.up.isDown) {
                this.wheel.primeSelect('up')
            } else if (this.cursors.down.isDown) {
                this.wheel.primeSelect('down')
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
     * Fire the main gun.
     */
    fire() {
        let bullet, bulletOffset, angle

        console.log('fire()')

        if (this.time.now > this.bulletTime) {
            this.bulletTime = this.time.now + this.bulletTimeOffset
            bullet = this.bullets.getFirstDead(false)

            if (bullet) {
                bullet.active = true
                bullet.visible = true
                bullet.body.collideWorldBounds = true
                bullet.prime = this.wheel.chosenPrime
                angle = Phaser.Math.DegToRad(this.gun.angle)
                bulletOffset = this.physics.velocityFromRotation(
                    angle, 28
                )
                bullet.setPosition(this.gun.x + bulletOffset.x,
                                   this.gun.y + bulletOffset.y)
                this.physics.velocityFromRotation(
                    angle, this.bulletSpeed, bullet.body.velocity
                )
                this.sound.play('fire1')
            }
        }
    }

    /**
     * Add a single enemy to the screen.
     */
    dispatchEnemy() {
        let enemy, textStyle, enemyIdx, xPos, approachAngle

        console.log('dispatchEnemy()')

        enemy = this.enemies.getFirstDead(false)

        textStyle = {
            font: '20px Arial',
            fill: '#ffffff',
            align: 'center',
        }

        if (enemy) {
            enemy.active = true
            enemy.visible = true
            enemy.body.setCircle(16)
            enemyIdx = Phaser.Math.Between(0, this.enemyFreqs.length-1)
            xPos = Phaser.Math.Between(1, 6)*100
            enemy.setPosition(xPos, 30)
            approachAngle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.gun.x, this.gun.y)
            this.physics.velocityFromRotation(
                approachAngle, this.enemySpeed, enemy.body.velocity
            )

            enemy.number = levels[this.levelIdx][this.enemyFreqs[enemyIdx]][0]
            enemy.perfectHits = factors[enemy.number] != null

            enemy.text = this.add.text(enemy.x, enemy.y + 2,
                                       enemy.number, textStyle)
            enemy.text.setOrigin(0.5)
            this.physics.world.enable(enemy.text)
            this.physics.velocityFromRotation(
                approachAngle, this.enemySpeed, enemy.text.body.velocity
            )
            this.enemyTime = this.time.now +
                this.enemyTimeOffset +
                Phaser.Math.Between(0, 8)*200
            this.enemiesDispatched++
        } else {
            console.log('No enemy found!!!')
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

        // console.log('hitEnemy()')
        // console.log('factors[' + enemy.number + ']: ' + factors[enemy.number])

        prime = bullet.prime
        this.removeBullet(bullet)
        this.primeHitEnemy(prime, enemy)
    }

    /**
     * @param prime
     * @param enemy
     */
    primeHitEnemy(prime, enemy) {
        console.log('primeHitEnemy()')
        console.log('factors[' + enemy.number + ']: ' + factors[enemy.number])

        if (factors[enemy.number] == null) {
            if (prime === enemy.number) {
                this.killEnemy(enemy)
            } else {
                this.angerEnemy(enemy)
            }
        } else if (factors[enemy.number][prime] != null) {
            this.hurtEnemy(enemy, prime)
        } else {
            this.angerEnemy(enemy)
        }
    }

    /**
     * Destroy and remove an enemy from the screen.
     * @param enemy
     */
    killEnemy(enemy) {
        let numActive, i, activeEnemy, comboEnemies

        this.explosion.play()
        score += 10
        this.enemiesKilled++

        this.removeEnemy(enemy)

        if (enemy.perfectHits) {
            // console.log('*** PERFECT ***')
            score += 50
            numActive = this.enemies.countActive()
            comboEnemies = []
            for (i=1; i<=numActive; i++) {
                activeEnemy = this.enemies.getFirstNth(i, true)
                if (enemy.number == activeEnemy.number) {
                    // Combos do not trigger multiple perfect hits.
                    activeEnemy.perfectHits = false
                    comboEnemies.push(activeEnemy)
                } else if (factors[activeEnemy.number] != null &&
                           factors[activeEnemy.number][enemy.number] != null) {
                    comboEnemies.push(activeEnemy)
                }
            }

            for (i=0; i<comboEnemies.length; i++) {
                this.primeHitEnemy(enemy.number, comboEnemies[i])
            }
        }

        if (this.enemiesKilled === this.enemyTotal) {
            this.nextLevel()
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

        // enemy.animations.play('hurt')

        enemy.number /= prime
        enemy.text.text = enemy.number
    }

    /**
     * Increase an enemy's velocity due to a bad hit.
     * @param enemy
     */
    angerEnemy(enemy) {
        let soundIdx, velX, velY

        soundIdx = Phaser.Math.Between(0, 2)
        this.pings[soundIdx].play()

        velX = enemy.body.velocity.x
        velX += velX * 0.2
        velY = enemy.body.velocity.y
        velY += velY * 0.2

        enemy.body.velocity.x = velX
        enemy.body.velocity.y = velY
        enemy.perfectHits = false
        enemy.text.body.velocity.x = velX
        enemy.text.body.velocity.y = velY
    }

    removeEnemy(enemy) {
        enemy.body.collideWorldBounds = false
        enemy.setActive(false)
        enemy.setVisible(false)
        enemy.setPosition(0, -100)
        enemy.body.velocity.x = 0
        enemy.body.velocity.y = 0

        enemy.text.setActive(false)
        enemy.text.setVisible(false)
        enemy.text.setPosition(0, -100)
        enemy.text.body.velocity.x = 0
        enemy.text.body.velocity.y = 0
    }

    removeBullet(bullet) {
        bullet.body.collideWorldBounds = false
        bullet.setActive(false)
        bullet.setVisible(false)
        bullet.setPosition(0, -2000)
    }

    /**
     * Move to level screen.
     */
    nextLevel() {
        console.log('[PLAY] nextLevel')

        game.scene.getScene('level').resume()
        game.scene.switch('play', 'level')
    }

    /**
     * Move to end screen.
     */
    end() {
        let enemy, bullet
        console.log('[PLAY] end')

        this.explosion.play()
        this.registry.destroy()
        this.events.off()

        enemy = this.enemies.getFirstAlive()
        while (enemy != null) {
            this.removeEnemy(enemy)
            enemy = this.enemies.getFirstAlive()
        }

        bullet = this.bullets.getFirstAlive()
        while (bullet != null) {
            this.removeBullet(bullet)
            bullet = this.bullets.getFirstAlive()
        }

        game.scene.switch('play', 'end')
        this.cursors.right.isDown = false
        this.cursors.left.isDown = false
        this.cursors.up.isDown = false
        this.cursors.down.isDown = false
        console.log('CURSORS OFF')
        this.scene.stop()
    }
}


class LevelScene extends Phaser.Scene {
    constructor() {
        super('level')
    }

    create() {
        let nameLbl, startLbl

        console.log('[LEVEL] create')

        this.nameLbl = this.add.text(80, 160, 'LEVEL ' + (level+1) + ' COMPLETE',
                                     {font: '50px Courier',
                                      fill: '#ffffff'})
        startLbl = this.add.text(80, 240, 'press "W" to start next level',
                                 {font: '30px Courier',
                                  fill: '#ffffff'})

        this.input.keyboard.on('keydown-W', this.start, this)
    }

    resume() {
        if (this.nameLbl) {
            this.nameLbl.text = 'LEVEL ' + (level+1) + ' COMPLETE'
        }
    }

    start() {
        level += 1
        game.scene.getScene('play').resume()
        game.scene.switch('level', 'play')
    }
}


class EndScene extends Phaser.Scene {
    constructor() {
        super('end')
    }

    create() {
        let scoreLbl, nameLbl, startLbl, highScoreLbl

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
        } else {
            highScoreLbl = this.add.text(300, 50, 'New High Score!',
                                         {font: '30px Courier',
                                          fill: '#ffffff'})
            highScore = score
        }

        this.input.keyboard.on('keydown-W', this.restart, this)
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

// game.scene is a SceneManager
game.scene.start('boot', { someData: '...arbitrary data' })
