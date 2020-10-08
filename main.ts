let spacePlane = sprites.create(img`
    . . . . . . . . . . b 5 b . . .
    . . . . . . . . . b 5 b . . . .
    . . . . . . b b b b b b . . . .
    . . . . . b b 5 5 5 5 5 b . . .
    . . . . b b 5 d 1 f 5 5 d f . .
    . . . . b 5 5 1 f f 5 d 4 c . .
    . . . . b 5 5 d f b d d 4 4 . .
    . b b b d 5 5 5 5 5 4 4 4 4 4 b
    b d d d b b d 5 5 4 4 4 4 4 b .
    b b d 5 5 5 b 5 5 5 5 5 5 b . .
    c d c 5 5 5 5 d 5 5 5 5 5 5 b .
    c b d c d 5 5 b 5 5 5 5 5 5 b .
    . c d d c c b d 5 5 5 5 5 d b .
    . . c b d d d d d 5 5 5 b b . .
    . . . c c c c c c c c b b . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player);
spacePlane.setFlag(SpriteFlag.StayInScreen, true);
info.setLife(3);
controller.moveSprite(spacePlane, 200, 200);
controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    let dart = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 3 3 3 3 3 3 3 3 . . . .
        . . . 3 1 1 1 1 1 1 1 1 3 . . .
        . . . . 3 3 3 3 3 3 3 3 . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, spacePlane, 200, 0);
})
game.onUpdateInterval(500, function() {
    let bogey = sprites.create(img`
        . . . . . . . . . . b b b . . .
        . . . . . . . . b e e 3 3 b . .
        . . . . . . b b e 3 2 e 3 a . .
        . . . . b b 3 3 e 2 2 e 3 3 a .
        . . b b 3 3 3 3 3 e e 3 3 3 a .
        b b 3 3 3 3 3 3 3 3 3 3 3 3 3 a
        b 3 3 3 d d d d 3 3 3 3 3 d d a
        b b b b b b b 3 d d d d d d 3 a
        b d 5 5 5 5 d b b b a a a a a a
        b 3 d d 5 5 5 5 5 5 5 d d d d a
        b 3 3 3 3 3 3 d 5 5 5 d d d d a
        b 3 d 5 5 5 3 3 3 3 3 3 b b b a
        b b b 3 d 5 5 5 5 5 5 5 d d b a
        . . . b b b 3 d 5 5 5 5 d d 3 a
        . . . . . . b b b b 3 d d d b a
        . . . . . . . . . . b b b a a .
    `, SpriteKind.Enemy);
    bogey.setVelocity(-100, 0);
    bogey.setPosition(180, randint(0, 120));
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite, otherSprite) {
    otherSprite.destroy();
    info.changeLifeBy(-1);
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function(sprite, otherSprite) {
    otherSprite.destroy();
    sprite.destroy(effects.fire, 100);
    info.changeScoreBy(1);
})