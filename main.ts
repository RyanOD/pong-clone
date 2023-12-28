namespace SpriteKind {
    export const Environment = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    ball.setVelocity(-50, 50)
})
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
let paddle_rt: Sprite = null
let paddle_lt: Sprite = null
let screen_pos_y = 0
let screen_pos_x = 0
let background: Image = null
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
    ball_collision()
    if (paddle_lt.y < paddle_height / 2 + 2) {
        paddle_lt.y = paddle_height / 2 + 2
    }
    if (paddle_lt.y > scene.screenHeight() - (paddle_height / 2 + 2)) {
        paddle_lt.y = scene.screenHeight() - (paddle_height / 2 + 2)
    }
    controller.moveSprite(paddle_lt, 0, 100)
})
