const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

class Player {
    constructor() {
       this.position = {
        x: 0,
        y: 0
       } 
    }
}




let y = 100

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.fillStyle = 'red'
    c.fillRect(200, y, 100, 100)
    y++

}

animate()