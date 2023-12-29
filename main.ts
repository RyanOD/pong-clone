namespace SpriteKind {
    export const Environment = SpriteKind.create()
}
function paddle_collision () {
    if (ball.overlapsWith(paddle_lt) || ball.overlapsWith(paddle_rt)) {
        music.play(music.createSoundEffect(WaveShape.Triangle, 1687, 326, 255, 0, 20, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
        ball.vx = ball.vx * -1.04
        if (ball.x < scene.screenWidth() / 2) {
            ball.x = 12
        } else {
            ball.x = scene.screenWidth() - 12
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    ball.setVelocity(100, 50)
})
function computer_ai () {
    if (paddle_rt.y < ball.y - 10) {
        paddle_rt.y += 1.5
    } else if (paddle_rt.y > ball.y + 10) {
        paddle_rt.y += -1.5
    }
}
function draw_background () {
    scene.setBackgroundColor(15)
    background = image.create(scene.screenWidth(), scene.screenHeight())
    screen_pos_x = scene.screenWidth() / 2 - 1
    screen_pos_y = 1
    while (screen_pos_y < scene.screenHeight()) {
        background.fillRect(screen_pos_x, screen_pos_y, 2, 8, 1)
        screen_pos_y += 10
    }
    return background
}
function create_paddles (width: number, height: number) {
    paddle_lt = sprites.create(assets.image`paddle`, SpriteKind.Player)
    paddle_lt.setPosition(10, scene.screenHeight() / 2)
    paddle_rt = sprites.create(assets.image`paddle`, SpriteKind.Player)
    paddle_rt.setPosition(scene.screenWidth() - 10, scene.screenHeight() / 2)
}
function ball_collision () {
    if (ball.y < 0) {
        ball.y = 2
        ball.vy = ball.vy * -1
    } else if (ball.y > scene.screenHeight()) {
        ball.y = scene.screenHeight() - 2
        ball.vy = ball.vy * -1
    }
}
let screen_pos_y = 0
let screen_pos_x = 0
let background: Image = null
let paddle_rt: Sprite = null
let paddle_lt: Sprite = null
let ball: Sprite = null
game.splash("Welcome to Pong", "Press A to Begin")
scene.setBackgroundImage(draw_background())
info.player1.setScore(0)
info.player2.setScore(0)
let paddle_width = 4
let paddle_height = 16
create_paddles(paddle_width, paddle_height)
ball = sprites.create(assets.image`ball`, SpriteKind.Projectile)
ball.setPosition(scene.screenWidth() - 10 - paddle_width * 1.5, 59)
game.onUpdate(function () {
    computer_ai()
    ball_collision()
    paddle_collision()
    if (paddle_lt.y < paddle_height / 2 + 2) {
        paddle_lt.y = paddle_height / 2 + 2
    }
    if (paddle_lt.y > scene.screenHeight() - (paddle_height / 2 + 2)) {
        paddle_lt.y = scene.screenHeight() - (paddle_height / 2 + 2)
    }
    controller.moveSprite(paddle_lt, 0, 100)
})
