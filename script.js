const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}
const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                })
            )
        }
    })
})
const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
    platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 202) {
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                })
            )
        }
    })
})
const gravity = 0.5




const player = new Player({
    position: {
        x: 100,
        y: 300
    },
    collisionBlocks,
    imageSrc: './images/warrior/Idle.png',
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: "./images/warrior/Idle.png",
            frameRate: 8,
            frameBuffer: 3,
        },
        IdleLeft: {
            imageSrc: "./images/warrior/Idle.png",
            frameRate: 8,
            frameBuffer: 3,
        },
        Run: {
            imageSrc: "./images/warrior/Run.png",
            frameRate: 8,
            frameBuffer: 5,
        },
        RunLeft: {
            imageSrc: "./images/warrior/RunLeft.png",
            frameRate: 8,
            frameBuffer: 5,
        },
        Jump: {
            imageSrc: "./images/warrior/Jump.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        JumpLeft: {
            imageSrc: "./images/warrior/JumpLeft.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        Fall: {
            imageSrc: "./images/warrior/Fall.png",
            frameRate: 2,
            frameBuffer: 3,
        },
        FallLeft: {
            imageSrc: "./images/warrior/FallLeft.png",
            frameRate: 2,
            frameBuffer: 3,
        }
    }
})

const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './images/background.png'
})
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.scale(4, 4)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()
    collisionBlocks.forEach((CollisionBlock) => {
        CollisionBlock.update()
    })
    platformCollisionBlocks.forEach((block) => {
        block.update()
    })
    player.playerUpdate()

    player.velocity.x = 0
    if (keys.d.pressed) {
        player.switchSprite('Run')
        player.velocity.x = 2
    }
    else if (keys.a.pressed) {
        player.switchSprite('RunLeft')
        player.velocity.x = -2
    }
    else if (player.velocity.y === 0) {
        player.switchSprite('Idle')
    }

    if (player.velocity.y < 0) {
        player.switchSprite('Jump')
        if (keys.a.pressed) player.switchSprite("JumpLeft")
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('Fall')
        if (keys.a.pressed) player.switchSprite("FallLeft")
    }
    c.restore()

}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'w':
            player.velocity.y = -8
            break
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
})

