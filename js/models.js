
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
        // this.primeTimeOffset = 180
        this.primeTimeOffset = 280

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
        // this.wheelScale = [
        //     this.scene.sound.add('wheelC4'),
        //     this.scene.sound.add('wheelC4'),
        //     this.scene.sound.add('wheelCs4'),
        //     this.scene.sound.add('wheelC4'),
        //     this.scene.sound.add('wheelD4'),
        //     this.scene.sound.add('wheelC4'),
        //     this.scene.sound.add('wheelE4'),
        //     this.scene.sound.add('wheelDs4'),
        // ]
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
        // duration = 50
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
                        repeat: 0,               // -1: infinity
                        onComplete: function() {
                            this.setFill('#ffffff')
                        },
                        callbackScope: prime
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
                        callbackScope: prime
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
