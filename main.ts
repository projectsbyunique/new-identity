namespace SpriteKind {
    export const UI = SpriteKind.create()
    export const MenuIndicator = SpriteKind.create()
    export const miniMapIndi = SpriteKind.create()
    export const shadow = SpriteKind.create()
}

interface CarState {
    speed: number;          // Current speed of the car
    turningSpeed: number;   // Current turning speed of the car
}

let car: CarState = {
    speed: 0,          // Initial speed
    turningSpeed: 3,     // Initial turning speed
};

function setupLevel () {
	
}
function team_select () {
    transitionalSphereColor = 12
    stage = 1
    color.startFadeFromCurrent(color.originalPalette, 1000)
    scene.backgroundImage().fill(0)
    radius2 = 30
    chance = 100
    myTextSprite = fancyText.create(_("There's 8 billion people on this planet."), 150)
    fancyText.setTextFlag(myTextSprite, fancyText.Flag.ChangeWidthWhileAnimating, true)
    fancyText.setTextFlag(myTextSprite, fancyText.Flag.ChangeHeightWhileAnimating, true)
    fancyText.setColor(myTextSprite, 1)
    fancyText.setFrame(myTextSprite, img`
        b b b b b b b b b b . . 
        b f f f f f f f f b . . 
        b f f f f f f f f b . . 
        b f f f f f f f f b . . 
        b f f f f f f f f b . . 
        b f f f f f f f f b . . 
        b f f f f f f f f b . . 
        b f f f f f f f f b . . 
        b f f f f f f f f b . . 
        b b b b b b b b b b . . 
        . . . . . . . . . . . . 
        . . . . . . . . . . . . 
        `)
    myTextSprite.setPosition(80, 60)
    fancyText.animateAtSpeed(myTextSprite, fancyText.TextSpeed.VeryFast, fancyText.AnimationPlayMode.UntilDone)
    pause(3000)
    fancyText.setText(myTextSprite, _("You're part of 99% of those humans."))
    myTextSprite.setPosition(80, 60)
    fancyText.animateAtSpeed(myTextSprite, fancyText.TextSpeed.VeryFast, fancyText.AnimationPlayMode.UntilDone)
    pause(3000)
    fancyText.setText(myTextSprite, _("Let's change that."))
    myTextSprite.setPosition(80, 60)
    fancyText.animateAtSpeed(myTextSprite, fancyText.TextSpeed.VeryFast, fancyText.AnimationPlayMode.UntilDone)
    pause(2000)
    sprites.destroy(myTextSprite)
    for (let index = 0; index < 40; index++) {
        radius2 = inOutLerpSmoothStep(radius2, 150, 0.15)
        pause(15)
    }
    TEAM_SELECTION = sprites.create(assets.image`myImage1`, SpriteKind.UI)
    TEAM_SELECTION.x = 128
    TEAM_SELECTION.y = 60
    list = [assets.image`myImage1`, assets.image`myImage2`, assets.image`myImage3`]
    teamSelectOverlay = sprites.create(assets.image`myImage12`, SpriteKind.UI)
    teamSelectOverlay.setPosition(80, 60)
    text_list2 = ["Unorthodox Justice Agents", "Speed Hax Agency", "Club 27"]
    currentMenuI = 0
    myTextSprite = fancyText.create(_(text_list2[currentMenuI]), 85, 1)
    fancyText.setFont(myTextSprite, fancyText.defaultArcade)
    myTextSprite.setPosition(48, 59)
    create_menu__length_of_menu(55, 36, 3)
    timer.background(function () {
        while (!(controller.A.isPressed())) {
            if (controller.left.isPressed()) {
                if (currentMenuI != 0) {
                    change_menu_selection_by_1_to_right(false)
                    currentMenuI += -1
                    fancyText.setText(myTextSprite, _(text_list2[currentMenuI]))
                    animation.runImageAnimation(
                    TEAM_SELECTION,
                    assets.animation`myAnim`,
                    75,
                    false
                    )
                    pause(100)
                    image_transform_startresultsprite(TEAM_SELECTION.image, list[currentMenuI], TEAM_SELECTION)
                    music.play(music.createSoundEffect(WaveShape.Triangle, 493, 493, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
                }
            } else if (controller.right.isPressed()) {
                if (currentMenuI != 2) {
                    change_menu_selection_by_1_to_right(true)
                    currentMenuI += 1
                    fancyText.setText(myTextSprite, _(text_list2[currentMenuI]))
                    animation.runImageAnimation(
                    TEAM_SELECTION,
                    assets.animation`myAnim`,
                    75,
                    false
                    )
                    pause(100)
                    image_transform_startresultsprite(TEAM_SELECTION.image, list[currentMenuI], TEAM_SELECTION)
                    music.play(music.createSoundEffect(WaveShape.Triangle, 493, 493, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
                }
            }
            pause(0)
        }
        CurrentTeam = _(text_list2[currentMenuI])
        color.startFadeFromCurrent(color.Black, 200)
        color.pauseUntilFadeDone()
        levelMenu__intro(false)
    })
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
	
})
function create_menu__length_of_menu (X: number, Y: number, lengthOfIndicator: number) {
    currentMenuPosForIndi = 1
    currentMenuLength = lengthOfIndicator
    for (let index2 = 0; index2 <= lengthOfIndicator - 1; index2++) {
        if (index2 == 0) {
            menu_indicator = sprites.create(assets.image`myImage9`, SpriteKind.MenuIndicator)
            animation.runImageAnimation(
            menu_indicator,
            [img`
                d d d d d d 
                d c c c c d 
                d c b b b d 
                d c b b b d 
                d c b b b d 
                d d d d d d 
                `,img`
                d d d d d d 
                d c c c c d 
                d c b b b d 
                d c b b b d 
                d c b b b d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d c c d d 
                d c d d b d 
                d c d d b d 
                d d b b d d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d 1 1 d d 
                d 1 d d b d 
                d 1 d d b d 
                d d b b d d 
                d d d d d d 
                `,img`
                d d d d d d 
                d 1 1 1 b d 
                d 1 d d b d 
                d 1 d d b d 
                d 1 b b b d 
                d d d d d d 
                `,img`
                d d d d d d 
                d 1 1 1 b d 
                d 1 d d b d 
                d 1 d d b d 
                d 1 b b b d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d 1 1 d d 
                d 1 d d b d 
                d 1 d d b d 
                d d b b d d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d c c d d 
                d c d d b d 
                d c d d b d 
                d d b b d d 
                d d d d d d 
                `],
            100,
            true
            )
            menu_indicator.setPosition(X + 6 * (index2 + 1), Y)
            sprites.setDataNumber(menu_indicator, "CurrentMenuPos", index2 + 1)
            sprites.setDataNumber(menu_indicator, "CurrentMenuLength", lengthOfIndicator)
        } else {
            menu_indicator = sprites.create(assets.image`myImage9`, SpriteKind.MenuIndicator)
            menu_indicator.setPosition(X + 6 * (index2 + 1), Y)
            sprites.setDataNumber(menu_indicator, "CurrentMenuPos", index2 + 1)
            sprites.setDataNumber(menu_indicator, "CurrentMenuLength", lengthOfIndicator)
        }
    }
}
function getImageForDigit (digit: number) {
    imageNames = [
    assets.image`0`,
    assets.image`1`,
    assets.image`2`,
    assets.image`3`,
    assets.image`4`,
    assets.image`5`,
    assets.image`6`,
    assets.image`7`,
    assets.image`8`,
    assets.image`9`
    ]
    if (digit >= 0 && digit <= 9) {
        return imageNames[digit]
    } else {
        return assets.image(`10`)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    blockSettings.clear()
})
function skew_screen () {
    timer.after(17, function () {
        roadSkew = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.UI)
        tT = 1
        bT = 3
        extra = 0
        originalRoadSkew = image.screenImage().clone()
        roadSkew.setImage(skew(tT, bT, originalRoadSkew))
        roadSkew.z = 9898797979
        roadSkew.setFlag(SpriteFlag.RelativeToCamera, true)
        roadSkew.setPosition(80, 60)
        pause(2000)
        for (let index = 0; index < 40; index++) {
            tT = inOutLerpSmoothStep(tT, 0, 0.17)
            bT = inOutLerpSmoothStep(bT, 0, 0.2)
            roadSkew.setImage(skew(tT, bT, originalRoadSkew))
            pause(10)
        }
        sprites.destroy(roadSkew)
        speedometer = sprites.create(assets.image`speed`, SpriteKind.UI)
        speedometer.setFlag(SpriteFlag.RelativeToCamera, true)
        speedometer.setPosition(16, 16)
        createSpeedometer()
        transitionalSphereColor = 12
    })
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(isJumping)) {
        jump()
    }
})
function startLevel1 () {
    drawSphere2 = true
    transitionalSphereColor = 0
    music.stopAllSounds()
    music.play(music.createSong(hex`00780004080200`), music.PlaybackMode.LoopingInBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.UI)
    sprites.destroyAllSpritesOfKind(SpriteKind.MiniMenu)
    sprites.destroy(origin)
    sprites.destroy(fortune)
    sprites.destroy(myTextSprite)
    tiles.setCurrentTilemap(tilemap`level11`)
    scene.setBackgroundImage(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `)
    ship = sprites.create(assets.image`myImage17`, SpriteKind.Player)
    shipShadow = sprites.create(assets.image`myImage26`, SpriteKind.shadow)
    sprites.setDataNumber(ship, "Angle", 90)
    sprites.setDataNumber(ship, "Zoom", 2)
    ship.setBounceOnWall(true)
    if (CurrentTeam == "Unorthodox Justice Agents") {
        ship.setImage(assets.image`myImage14`)
        ogImg = assets.image`myImage14`
    } else if (CurrentTeam == "Speed HAx Agency") {
        ship.setImage(assets.image`myImage15`)
        ogImg = assets.image`myImage15`
    } else {
        ship.setImage(assets.image`myImage16`)
        ogImg = assets.image`myImage16`
    }
    tiles.placeOnTile(ship, tiles.getTileLocation(5, 97))
    ship.x += 0
    scene.cameraFollowSprite(ship)
    scene.setBackgroundColor(15)
    skew_screen()
    updateRotation()
}
function image_transform_startresultsprite (startImage: Image, finalImage: Image, sprite: Sprite) {
    sprite.setImage(startImage)
    pause(500)
    for (let yI = 0; yI <= startImage.height; yI++) {
        for (let xI = 0; xI <= startImage.width; xI++) {
            startImage.setPixel(xI, yI, finalImage.getPixel(xI, yI))
        }
        sprite.setImage(startImage)
        pause(2)
    }
    return
}
function inOutLerpSmoothStep (start: number, end: number, step: number) {
    // Ensure step is within the valid range [0, 1]
    step = Math.min(1, Math.max(0, step))
    // Apply the smoothstep easing function
    step = step * step * (3 - 2 * step)
    // Interpolate the values
    return start + (end - start) * step
}
function createSpeedometer () {
    spdFirstDgt = sprites.create(assets.image`0`, SpriteKind.UI)
    spdScndDgt = sprites.create(assets.image`0`, SpriteKind.UI)
    spdThirdDgt = sprites.create(assets.image`0`, SpriteKind.UI)
    spdFirstDgt.setPosition(8, 14)
    spdScndDgt.setPosition(14, 14)
    spdThirdDgt.setPosition(20, 14)
    spdFirstDgt.setFlag(SpriteFlag.RelativeToCamera, true)
    spdScndDgt.setFlag(SpriteFlag.RelativeToCamera, true)
    spdThirdDgt.setFlag(SpriteFlag.RelativeToCamera, true)
}
function updateSpeedometer (speed: number) {
    console.log(speed)
    if (convertToText(speed).length == 1) {
        if (speed == 0) {
            spdFirstDgt.setImage(assets.image`10`)
            spdScndDgt.setImage(assets.image`10`)
            spdThirdDgt.setImage(assets.image`10`)
        } else {
            spdFirstDgt.setImage(assets.image`ghghgh`)
            spdScndDgt.setImage(assets.image`ghghgh`)
            spdThirdDgt.setImage(getImageForDigit(speed))
        }
    } else if (convertToText(speed).length == 2) {
        spdFirstDgt.setImage(assets.image`ghghgh`)
        spdScndDgt.setImage(getImageForDigit(parseInt(speed.toString().charAt(0))))
        spdThirdDgt.setImage(getImageForDigit(parseInt(speed.toString().charAt(1))))
    } else {
        spdFirstDgt.setImage(getImageForDigit(parseInt(speed.toString().charAt(0))))
        spdScndDgt.setImage(getImageForDigit(parseInt(speed.toString().charAt(1))))
        spdThirdDgt.setImage(getImageForDigit(parseInt(speed.toString().charAt(2))))
    }
}
function drawCylinder () {
    scene.backgroundImage().fill(0)
    for (let i = 0; i <= CYLINDER_SIDES - 1; i++) {
        newx1 = Math.cos(angle + i * 2 * Math.PI / CYLINDER_SIDES) * (CYLINDER_WIDTH / 2)
        newy1 = Math.sin(angle + i * 2 * Math.PI / CYLINDER_SIDES) * (CYLINDER_WIDTH / 2)
        x2 = Math.cos(angle + (i + 1) * 2 * Math.PI / CYLINDER_SIDES) * (CYLINDER_WIDTH / 2)
        y2 = Math.sin(angle + (i + 1) * 2 * Math.PI / CYLINDER_SIDES) * (CYLINDER_WIDTH / 2)
        x3 = newx1
        y3 = newy1 + CYLINDER_HEIGHT
        x4 = x2
        y4 = y2 + CYLINDER_HEIGHT
        if (Math.percentChance(chance)) {
            color2 = transitionalSphereColor
        } else {
            color2 = 7
        }
        scene.backgroundImage().drawLine(cylinderX + newx1, cylinderY + newy1, cylinderX + x2, cylinderY + y2, color2)
        scene.backgroundImage().drawLine(cylinderX + x2, cylinderY + y2, cylinderX + x4, cylinderY + y4, color2)
        scene.backgroundImage().drawLine(cylinderX + newx1, cylinderY + newy1, cylinderX + x3, cylinderY + y3, color2)
    }
}
function skew (topSkewFactor: number, bottomSkewFactor: number, image2: Image) {
    let width = image2.width;
let height = image2.height;
// Create a new image for the transformed result
    skewedImage = image.create(width, height)
    // Define the top and bottom skew factors
    topSkewFactor = topSkewFactor
    bottomSkewFactor = bottomSkewFactor * -1
    // Apply the skew transformation
    for (let y5 = 0; y5 <= height - 1; y5++) {
        for (let x5 = 0; x5 <= width - 1; x5++) {
            // Calculate the interpolation factor between top and bottom skew
            factor = (1 - y5 / height) * topSkewFactor + y5 / height * bottomSkewFactor
            // Calculate the new x position with skew
            newX = Math.floor(x5 + factor * (width / 2 - x5))
            newY = y5
            // Ensure the new position is within the image boundaries
            if (newX >= 0 && newX < width) {
                // Get the color from the original image
                color3 = image2.getPixel(x5, y5)
                // Set the pixel in the skewed image
                skewedImage.setPixel(newX, newY, color3)
            }
        }
    }
    // Apply the skew transformation
    for (let y23 = 0; y23 <= height - 1; y23++) {
        for (let x23 = 0; x23 <= width - 1; x23++) {
            if (skewedImage.getPixel(x23, y23) == 0) {
                skewedImage.setPixel(x23, y23, 15)
                for (let index9 = 0; index9 <= 3; index9++) {
                    if (skewedImage.getPixel(x23 + index9, y23) != 0) {
                        skewedImage.setPixel(x23, y23, skewedImage.getPixel(x23 + index9, y23))
                    }
                }
            }
        }
    }
    return skewedImage
}
function drawSphere () {
    scene.backgroundImage().fill(0)
    numSegments2 = 10
    numRings2 = 5
    for (let ring = 0; ring <= numRings2 - 1; ring++) {
        for (let segment = 0; segment <= numSegments2 - 1; segment++) {
            theta2 = Math.PI * 2 * segment / numSegments2 + angle
            phi2 = Math.PI * ring / numRings2
            // Convert spherical coordinates to Cartesian coordinates
            x22 = Math.cos(theta2) * Math.sin(phi2) * radius2
            z2 = Math.sin(theta2) * Math.sin(phi2) * radius2
            y22 = Math.cos(phi2) * radius2
            // Perspective projection
            scale2 = 200 / (200 + z2)
            projectedX2 = centerX2 + x22 * scale2
            projectedY2 = centerY2 + y22 * scale2
            // Calculate the coordinates of the adjacent points
            nextSegmentTheta = Math.PI * 2 * (segment + 1) / numSegments2 + angle
            nextX = Math.cos(nextSegmentTheta) * Math.sin(phi2) * radius2
            nextZ = Math.sin(nextSegmentTheta) * Math.sin(phi2) * radius2
            nextY = Math.cos(phi2) * radius2
            nextScale = 200 / (200 + nextZ)
            nextProjectedX = centerX2 + nextX * nextScale
            nextProjectedY = centerY2 + nextY * nextScale
            nextRingPhi = Math.PI * (ring + 1) / numRings2
            upperX = Math.cos(theta2) * Math.sin(nextRingPhi) * radius2
            upperZ = Math.sin(theta2) * Math.sin(nextRingPhi) * radius2
            upperY = Math.cos(nextRingPhi) * radius2
            upperScale = 200 / (200 + upperZ)
            upperProjectedX = centerX2 + upperX * upperScale
            upperProjectedY = centerY2 + upperY * upperScale
            // Calculate brightness based on z-coordinate (closer faces will be brighter)
            brightness = 3 - Math.clamp(Math.floor(3 * z2 / radius2), 0, 3)
            if (Math.percentChance(chance)) {
                color2 = transitionalSphereColor
            } else {
                color2 = 7
            }
            scene.backgroundImage().drawLine(projectedX2, projectedY2, nextProjectedX, nextProjectedY, color2)
            scene.backgroundImage().drawLine(upperProjectedX, upperProjectedY, projectedX2, projectedY2, color2)
        }
    }
}
function updateRotation () {
    if (controller.A.isPressed() == false) {
        timer.after(1, function () {
            driftImageRot = sprites.readDataNumber(ship, "Angle")
        })
        ship.setImage(scaling.rot(ogImg.clone(), sprites.readDataNumber(ship, "Angle")))
        shipShadow.setImage(scaling.rot(assets.image`myImage26`, sprites.readDataNumber(ship, "Angle")))
    } else {
        ship.setImage(scaling.rot(ogImg.clone(), driftImageRot))
        shipShadow.setImage(scaling.rot(assets.image`myImage26`, driftImageRot))
    }

    
}

controller.A.onEvent(ControllerButtonEvent.Released, function () {
    sprites.setDataNumber(ship, "Angle", driftImageRot)
    console.log("changed " + sprites.readDataNumber(ship, "Angle")+" to "+driftImageRot)
})

function levelMenu__intro (bool: boolean) {
    color.startFadeFromCurrent(color.originalPalette, 200)
    sprites.destroyAllSpritesOfKind(SpriteKind.UI)
    close_menu()
    menuBanner = sprites.create(assets.image`myImage19`, SpriteKind.UI)
    indicati = sprites.create(assets.image`myImage18`, SpriteKind.UI)
    menuBanner.setPosition(80, 60)
    indicati.setPosition(10, 19)
    if (bool) {
        text_list = [
        "* MANAGER *",
        "Welcome to the underground identify theft industry",
        "And welcome to " + CurrentTeam,
        "Please remember to take your job seriously,",
        "You are representing the entire " + CurrentTeam + " organization.",
        "We won't scold you like a parent...",
        "We'll just terminate your position",
        "So no mistakes, got it?",
        "Alright-",
        "* JOB DESCRIPTION *",
        "'Earn by commision, capture the identities of high- ranking individuals...'",
        "'The more experienced you become, the greater the stakes.'"
        ]
        myTextSprite = fancyText.create("_", 150, 12, fancyText.italic_small)
        myTextSprite.setPosition(84, 42)
        fancyText.setAnimationSound(myTextSprite, music.createSoundEffect(WaveShape.Sine, 667, 0, 255, 0, 10, SoundExpressionEffect.None, InterpolationCurve.Linear))
        for (let value2 of text_list) {
            fancyText.setColor(myTextSprite, 12)
            fancyText.setText(myTextSprite, value2)
            fancyText.animateForTime(myTextSprite, 800, fancyText.AnimationPlayMode.UntilDone)
            fancyText.setColor(myTextSprite, 11)
            pause(50)
            fancyText.setColor(myTextSprite, 13)
            pause(50)
            fancyText.setColor(myTextSprite, 1)
            if (text_list.indexOf(value2) == text_list.length - 1) {
                pause(4000)
            } else {
                pause(2000)
            }
        }
        sprites.destroy(myTextSprite)
    }
    targetList = [
    ["Jeffery X. Mayor", "U.S.A", "Former CEO of [Largest US Bank]"],
    ["Daniel Richardson", "ENGLAND", "CEO of [Global Leader in Pharma.]"],
    ["Vin Bhusri", "INDIA", "Founder of [Asian Entertainment Conglomerate]"],
    ["Ricky Vespucci", "ITALY", "Co-Founder of [Global Motor Vehicle Company]"],
    ["Zhang Yuán", "CHINA", "Former President, Large Stock Fortune"],
    ["Micheal Goldbloom", "CANADA", "Co-Founder of [Large Social Media Company]"]
    ]
    menu_list = []
    for (let value of targetList) {
        menu_list.push(miniMenu.createMenuItem(value[0], img`
            7 . . . . 
            . 7 . . . 
            . . 7 . . 
            . 7 . . . 
            7 . . . . 
            `))
    }
    for (let index = 0; index < 6 - levelProgress; index++) {
        menu_list.pop()
    }
    origin = fancyText.create("O", 150, 11, fancyText.italic_small)
    fortune = fancyText.create("F", 60, 1, fancyText.defaultArcade)
    origin.setPosition(170, 29)
    fortune.setPosition(123, 40)
    myMenu = miniMenu.createMenuFromArray(menu_list)
    myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Alignment, 1)
    myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, 0)
    myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Border, 0)
    myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.BorderColor, 0)
    myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 7)
    myMenu.setDimensions(75, 80)
    myMenu.setPosition(7, 32)
    myMenu.onSelectionChanged(function (selection, selectedIndex) {
        fancyText.setText(origin, targetList[selectedIndex][1])
        fancyText.setText(fortune, targetList[selectedIndex][2])
    })
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        startLevel1()
    })
}
function _ (text: string) {
    reTypedText = text.replace('a','A').replace('b', 'B')
return reTypedText
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
function jump () {
    let mySprite: Sprite = null
    if (mySprite) {
        isJumping = true
        mySprite.vy = jumpPower
    }
}
function close_menu () {
    sprites.destroyAllSpritesOfKind(SpriteKind.MenuIndicator)
}
function change_menu_selection_by_1_to_right (bool: boolean) {
    if (bool) {
        if (currentMenuPosForIndi + 1 <= currentMenuLength) {
            currentMenuPosForIndi += 1
        }
    } else {
        if (currentMenuPosForIndi - 1 >= 1) {
            currentMenuPosForIndi += -1
        }
    }
    for (let value3 of sprites.allOfKind(SpriteKind.MenuIndicator)) {
        value3.setImage(assets.image`myImage10`)
        animation.stopAnimation(animation.AnimationTypes.All, value3)
        if (currentMenuPosForIndi == sprites.readDataNumber(value3, "CurrentMenuPos")) {
            animation.runImageAnimation(
            value3,
            [img`
                d d d d d d 
                d c c c c d 
                d c b b b d 
                d c b b b d 
                d c b b b d 
                d d d d d d 
                `,img`
                d d d d d d 
                d c c c c d 
                d c b b b d 
                d c b b b d 
                d c b b b d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d c c d d 
                d c d d b d 
                d c d d b d 
                d d b b d d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d 1 1 d d 
                d 1 d d b d 
                d 1 d d b d 
                d d b b d d 
                d d d d d d 
                `,img`
                d d d d d d 
                d 1 1 1 b d 
                d 1 d d b d 
                d 1 d d b d 
                d 1 b b b d 
                d d d d d d 
                `,img`
                d d d d d d 
                d 1 1 1 b d 
                d 1 d d b d 
                d 1 d d b d 
                d 1 b b b d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d 1 1 d d 
                d 1 d d b d 
                d 1 d d b d 
                d d b b d d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                d d d d d d 
                `,img`
                d d d d d d 
                d d c c d d 
                d c d d b d 
                d c d d b d 
                d d b b d d 
                d d d d d d 
                `],
            100,
            true
            )
        }
    }
}

/*
function calculateTurningSpeed(accelerationSpeed: number): number {
    // Define the range for acceleration speed and turning speed
    const minAcceleration = 0;
    const maxAcceleration = 120;
    const minTurningSpeed = 2;
    const maxTurningSpeed = 10;

    // Ensure acceleration speed is within bounds
    if (accelerationSpeed < minAcceleration) accelerationSpeed = minAcceleration;
    if (accelerationSpeed > maxAcceleration) accelerationSpeed = maxAcceleration;

    // Calculate the turning speed based on the inverse relationship
    const turningSpeed = maxTurningSpeed -
        ((accelerationSpeed - minAcceleration) / (maxAcceleration - minAcceleration)) *
        (maxTurningSpeed - minTurningSpeed);

    return turningSpeed;
}
*/

spriteutils.onSpriteKindUpdateInterval(SpriteKind.Player, 0, function (sprite) {

    const MAX_SPEED = 120;
    const MIN_TURNING_SPEED = 3;
    const MAX_TURNING_SPEED = 5;
    const DRIFT_IMPACT_FACTOR = 0.32;
    const EXPONENT =2

    function calculateTurningSpeed(speed: number): number {
        const driftFactor = calculateDriftFactor(speed);
        return MAX_TURNING_SPEED - driftFactor * (MAX_TURNING_SPEED - MIN_TURNING_SPEED);
    }

    function calculateDriftFactor(speed: number): number {
        return speed / MAX_SPEED;
    }

    function calculateAdjustedSpeed(speed: number): number {
        const driftFactor = calculateDriftFactor(speed);
        return speed * (1 - Math.pow(driftFactor * DRIFT_IMPACT_FACTOR, EXPONENT));
    }

    shipShadow.setPosition(sprite.x - spriteutils.speed(sprite) / 10 / 2, sprite.y + spriteutils.speed(sprite) / 10 / 2)
    shipShadow.z = ship.z - 1

    if (spdFirstDgt != null) {
        updateSpeedometer(Math.floor(spriteutils.speed(sprite)))
    }

    if (controller.up.isPressed()) {

        music.play(music.createSoundEffect(
        WaveShape.Noise,
        spriteutils.speed(sprite) * 25,
        spriteutils.speed(sprite) * 25,
        255,
        0,
        100,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), music.PlaybackMode.InBackground)

        if (controller.A.isPressed() == false) {
            spriteutils.setVelocityAtAngle(sprite, spriteutils.degreesToRadians(sprites.readDataNumber(sprite, "Angle") - 180), inOutLerpSmoothStep(spriteutils.speed(sprite), 120, 0.07))
        } else {
            spriteutils.setVelocityAtAngle(sprite, spriteutils.degreesToRadians(sprites.readDataNumber(sprite, "Angle") - 180), inOutLerpSmoothStep(spriteutils.speed(sprite), calculateAdjustedSpeed(spriteutils.speed(sprite)), 0.07))
        }

    } else {

        spriteutils.setVelocityAtAngle(sprite, spriteutils.degreesToRadians(sprites.readDataNumber(sprite, "Angle") - 180), inOutLerpSmoothStep(spriteutils.speed(sprite), 0, 0.06))
    
    }

    if (controller.left.isPressed()) {

        // If you're drifting, strengthen turn 
        if (controller.A.isPressed() == false) {
            
            // Normal turning speed
            sprites.changeDataNumberBy(sprite, "Angle", -2)
        } else {
            driftImageRot = driftImageRot + calculateTurningSpeed(spriteutils.speed(sprite)-30) * -1

            // Stronger turning speed
            sprites.changeDataNumberBy(sprite, "Angle", calculateTurningSpeed(spriteutils.speed(sprite)) * -1)
        }

        if (sprites.readDataNumber(sprite, "Angle") < 0) {
            sprites.setDataNumber(sprite, "Angle", 360)
        }
        if (driftImageRot < 0) {
            driftImageRot = 360
        }
        updateRotation()
    }
    if (controller.right.isPressed()) {

        // If you're drifting, strengthen turn 
        if (controller.A.isPressed() == false) {

            // Normal turning speed
            sprites.changeDataNumberBy(sprite, "Angle", 2)
        } else {
            driftImageRot = driftImageRot + calculateTurningSpeed(spriteutils.speed(sprite) - 30)

            // Stronger turning speed
            sprites.changeDataNumberBy(sprite, "Angle", calculateTurningSpeed(spriteutils.speed(sprite)))
        }

        if (sprites.readDataNumber(sprite, "Angle") > 360) {
            sprites.setDataNumber(sprite, "Angle", 0)
        }
        if (driftImageRot > 360) {
            driftImageRot = 0
        }
        updateRotation()
    }
})

let driftImageRot = 90
let menu_list: miniMenu.MenuItem[] = []
let targetList: string[][] = []
let text_list: string[] = []
let indicati: Sprite = null
let menuBanner: Sprite = null
let brightness = 0
let upperProjectedY = 0
let upperProjectedX = 0
let upperScale = 0
let upperY = 0
let upperZ = 0
let upperX = 0
let nextRingPhi = 0
let nextProjectedY = 0
let nextProjectedX = 0
let nextScale = 0
let nextY = 0
let nextZ = 0
let nextX = 0
let nextSegmentTheta = 0
let projectedY2 = 0
let projectedX2 = 0
let scale2 = 0
let y22 = 0
let x22 = 0
let phi2 = 0
let theta2 = 0
let numRings2 = 0
let numSegments2 = 0
let color3 = 0
let newY = 0
let newX = 0
let factor = 0
let bottomSkewFactor = 0
let topSkewFactor = 0
let skewedImage: Image = null
let color2 = 0
let y4 = 0
let x4 = 0
let y3 = 0
let x3 = 0
let y2 = 0
let x2 = 0
let newy1 = 0
let angle = 0
let newx1 = 0
let spdThirdDgt: Sprite = null
let spdScndDgt: Sprite = null
let spdFirstDgt: Sprite = null
let step = 0
let shipShadow: Sprite = null
let fortune: fancyText.TextSprite = null
let origin: fancyText.TextSprite = null
let isJumping = false
let speedometer: Sprite = null
let originalRoadSkew: Image = null
let extra = 0
let bT = 0
let tT = 0
let roadSkew: Sprite = null
let imageNames: Image[] = []
let menu_indicator: Sprite = null
let currentMenuLength = 0
let currentMenuPosForIndi = 0
let CurrentTeam = ""
let currentMenuI = 0
let text_list2: string[] = []
let teamSelectOverlay: Sprite = null
let list: Image[] = []
let TEAM_SELECTION: Sprite = null
let myTextSprite: fancyText.TextSprite = null
let startMenuBanner: Sprite = null
let myMenu: miniMenu.MenuSprite = null
let levelProgress = 0
let chance = 0
let transitionalSphereColor = 0
let centerY2 = 0
let centerX2 = 0
let CYLINDER_SIDES = 0
let CYLINDER_HEIGHT = 0
let CYLINDER_WIDTH = 0
let cylinderY = 0
let cylinderX = 0
let stage = 0
let jumpPower = 0
let drawSphere2 = false
let radius2 = 0
let z2 = 0
let centerX = 0
let centerY = 0
let radius = 0
let numSegments = 0
let numRings = 0
let theta = 0
let phi = 0
let z = 0
let scale = 0
let projectedX = 0
let projectedY = 0
let t = 0
let newx12 = 0
// The force pulling the sprite downward
let newy12 = 0
let x32 = 0
let y32 = 0
let x42 = 0
let y42 = 0
let reTypedText = ""
let ship: Sprite = null
let ogImg: Image = null
drawSphere2 = true
reTypedText = ""
let gravity = 500
jumpPower = -150
stage = 0
// Initial X position of the cylinder
cylinderX = 80
// Initial Y position of the cylinder
cylinderY = -80
// Constants for the cylinder dimensions
CYLINDER_WIDTH = 155
CYLINDER_HEIGHT = 200
CYLINDER_SIDES = 16
centerX2 = screen.width / 2
centerY2 = screen.height / 2
transitionalSphereColor = 0
// 130!!!!!!!!
radius2 = 30
chance = 100
levelProgress = 1
color.setPalette(
color.Black
)
color.startFadeFromCurrent(color.originalPalette, 200)
scene.setBackgroundImage(assets.image`myImage0`)
pause(2000)
color.startFadeFromCurrent(color.Black, 500)
color.pauseUntilFadeDone()
scene.setBackgroundImage(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    `)
pause(2000)
color.startFadeFromCurrent(color.originalPalette, 200)
for (let value32 of pyAnims.INTRO_FRAMES) {
    scene.setBackgroundImage(value32)
    pause(40)
}
timer.background(function () {
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 1, 198, 255, 0, 800, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSong(hex`00780004080200`), music.PlaybackMode.LoopingInBackground)
    while (chance > 2) {
        chance = inOutLerpSmoothStep(chance, 0, 0.15)
        pause(15)
    }
    chance = 0
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Play New Game", img`
        7 . . . . 
        . 7 . . . 
        . . 7 . . 
        . 7 . . . 
        7 . . . . 
        `),
    miniMenu.createMenuItem("Resume Last Game", img`
        7 . . . . 
        . 7 . . . 
        . . 7 . . 
        . 7 . . . 
        7 . . . . 
        `)
    )
    startMenuBanner = sprites.create(assets.image`myImage11`, SpriteKind.UI)
    startMenuBanner.setPosition(80, 100)
    myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Alignment, 1)
    myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, 0)
    myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Border, 0)
    myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.BorderColor, 0)
    myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 7)
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        sprites.destroy(myMenu)
        sprites.destroy(startMenuBanner)
        if (selectedIndex == 0) {
            color.startFadeFromCurrent(color.Black)
            for (let index = 0; index < 100; index++) {
                radius2 = inOutLerpSmoothStep(radius2, 0, 0.1)
                pause(15)
            }
            team_select()
        } else {
            if (blockSettings.exists("lastSave")) {
                color.startFadeFromCurrent(color.Black)
                for (let index = 0; index < 100; index++) {
                    radius2 = inOutLerpSmoothStep(radius2, 0, 0.1)
                    pause(15)
                }
            } else {
                transitionalSphereColor = 2
                timer.background(function () {
                    for (let index = 0; index < 40; index++) {
                        radius2 = inOutLerpSmoothStep(radius2, 30, 0.2)
                        pause(15)
                    }
                    for (let index = 0; index < 50; index++) {
                        centerX2 = inOutLerpSmoothStep(centerX2, 160, 0.15)
                        radius2 = inOutLerpSmoothStep(radius2, 80, 0.1)
                        pause(10)
                    }
                })
                while (chance < 98) {
                    chance = inOutLerpSmoothStep(chance, 100, 0.15)
                    pause(15)
                }
                chance = 100
                myMenu = miniMenu.createMenu(
                miniMenu.createMenuItem("Play New Game", img`
                    2 . . . . 
                    . 2 . . . 
                    . . 2 . . 
                    . 2 . . . 
                    2 . . . . 
                    `)
                )
                myMenu.x = 55
                myMenu.setTitle("No Saves Found")
                myMenu.setDimensions(100, 100)
                myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Alignment, 0)
                myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, 0)
                myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Border, 0)
                myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.BorderColor, 0)
                myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Foreground, 2)
                myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 2)
                myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
                    sprites.destroy(myMenu)
                    sprites.destroy(startMenuBanner)
                    blockSettings.writeStringArray("lastSave", ["0", "0"])
                    color.startFadeFromCurrent(color.Black, 1000)
                    for (let index = 0; index < 60; index++) {
                        centerX2 = inOutLerpSmoothStep(centerX2, 80, 0.15)
                        radius2 = inOutLerpSmoothStep(radius2, 0, 0.15)
                        pause(15)
                    }
                })
            }
        }
    })
})
game.onUpdate(function () {
    // Adjust the rotation speed here
    angle += 0.01
})
// Apply gravity
game.onUpdate(function () {
	
})
game.onUpdate(function () {
	
})
game.onUpdate(function () {
    let drawCylinder2 = 0
    if (drawCylinder2) {
        drawCylinder()
    }
})
game.onUpdate(function () {
	
})
game.onUpdate(function () {
	
})
game.onUpdate(function () {
    if (drawSphere2) {
        drawSphere()
    }
})
game.onUpdateInterval(0, function () {
	
})
