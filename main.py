@namespace
class SpriteKind:
    Environment = SpriteKind.create()

def on_a_pressed():
    ball.set_velocity(-50, 50)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def draw_background():
    global background, screen_pos_x, screen_pos_y
    scene.set_background_color(15)
    background = image.create(scene.screen_width(), scene.screen_height())
    screen_pos_x = scene.screen_width() / 2 - 1
    screen_pos_y = 1
    while screen_pos_y < scene.screen_height():
        background.fill_rect(screen_pos_x, screen_pos_y, 2, 8, 1)
        screen_pos_y += 10
    return background
def create_paddles(width: number, height: number):
    global paddle_lt, paddle_rt
    paddle_lt = sprites.create(assets.image("""
        paddle
    """), SpriteKind.player)
    paddle_lt.set_position(10, scene.screen_height() / 2)
    paddle_rt = sprites.create(assets.image("""
        paddle
    """), SpriteKind.player)
    paddle_rt.set_position(scene.screen_width() - 10, scene.screen_height() / 2)
def ball_collision():
    if ball.y < 0:
        ball.y = 2
        ball.vy = ball.vy * -1
    elif ball.y > scene.screen_height():
        ball.y = scene.screen_height() - 2
        ball.vy = ball.vy * -1
paddle_rt: Sprite = None
paddle_lt: Sprite = None
screen_pos_y = 0
screen_pos_x = 0
background: Image = None
ball: Sprite = None
game.splash("Welcome to Pong", "Press A to Begin")
scene.set_background_image(draw_background())
paddle_width = 4
paddle_height = 16
create_paddles(paddle_width, paddle_height)
ball = sprites.create(assets.image("""
    ball
"""), SpriteKind.projectile)
ball.set_position(scene.screen_width() - 10 - paddle_width * 1.5, 59)

def on_on_update():
    ball_collision()
    if paddle_lt.y < paddle_height / 2 + 2:
        paddle_lt.y = paddle_height / 2 + 2
    if paddle_lt.y > scene.screen_height() - (paddle_height / 2 + 2):
        paddle_lt.y = scene.screen_height() - (paddle_height / 2 + 2)
    controller.move_sprite(paddle_lt, 0, 100)
game.on_update(on_on_update)
