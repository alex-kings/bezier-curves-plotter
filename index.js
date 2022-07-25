const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const drawBtn = document.getElementById('drawBtn')
const clearBtn = document.getElementById('clearBtn')
const POINT_SIZE = 5

// Points entered
let points = []

// Initialise canvas
initialiseCanvas()

// Tells if a curve is drawn on canvas
let curveDrawn = false

// Draws a new point where user clicked
canvas.addEventListener('click',(e)=>{
    // Clears the canvas if a curve is already drawn
    if(curveDrawn){
        clearCanvas()
        curveDrawn = false
    }

    points.push({x:e.clientX, y:e.clientY})
    drawPoint(e.clientX, e.clientY)
})

// Clears all points on canvas
clearBtn.addEventListener('click',()=>{
    clearCanvas()
})

// Resize canvas on window resize
window.addEventListener('resize',()=>{
    initialiseCanvas()
})

// Draws the curve
drawBtn.addEventListener('click',()=>{
    if(points.length < 2) return // Need a minimum of 2 points to draw a curve

    ctx.beginPath()
    for(let i = 0; i < 1; i += 0.001){
        let p = curveAt(i)
        ctx.lineTo(p.x, p.y)
    }
    ctx.stroke()
    ctx.closePath()
    curveDrawn = true
})

// Initialises the canvas
function initialiseCanvas(){
    // Calibrate canvas size with respect to window size
    canvas.height=0.8*window.innerHeight
    canvas.width=window.innerWidth

    // Clears the canvas
    clearCanvas()
}

// Draw a point at coordinate x-y
function drawPoint(x,y){
    ctx.fillStyle='red'
    ctx.beginPath()
    ctx.arc(x,y,POINT_SIZE,0,2*Math.PI,true)
    ctx.fill()
    console.log(x,y)
}

// Returns the bezier curve function associated with the points
function curveAt(u){
    let p = {x:0, y:0}
    let n = points.length-1
    let facN = factorial(n)
    
    points.forEach((point, i)=>{
        p.x += facN/(factorial(i)*factorial(n - i))*u**i*(1-u)**(n-i)*point.x
        p.y += facN/(factorial(i)*factorial(n - i))*u**i*(1-u)**(n-i)*point.y
    })

    return p
}

// Clears the canvas
function clearCanvas(){
    points = []
    ctx.fillStyle = 'beige'
    ctx.fillRect(0,0,canvas.width, canvas.height)
}

// Computes the factorial of the given number
function factorial(n){
    if(n === 0) return 1
    return n*factorial(n-1)
}