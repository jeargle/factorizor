factorizor
=========

Factorize your enemies out of existence!!!

Shoot invaders out of the sky before they reach your base.  The catch is that they're only susceptible to fire tuned to their specific weaknesses.

Each enemy is marked with a number, and prime factor ammo is required to take them down.  Blast away an enemy's factor shield to completely destroy it.  Hits with the wrong factor will only anger the enemy causing it to dive faster.  Prime enemies die from one good hit, but compound enemies may require several.  If you achieve a perfect kill on a compound enemy, the killing prime will be removed from any other enemies on screen.

Controls
--------

* A - swivel gun left
* D - swivel gun right
* W - increase prime factor
* S - decrease prime factor
* SPACE - fire


How to Run
----------

factorizer runs in web browsers and needs to be hosted by a webserver.  To host it, start up a webserver that gives access to the index.html file within the factorizer top-level directory.  For example, if you have python (>=3) installed, navigate to the factorizer directory and run

```
> python -m http.server 8000
```

This will start a server exposing that directory on port 8000.  You can then access the program by pointing your web browser to the URL `http://localhost:8000`.


Dependencies
------------

Dependencies are included.

* phaser
