
const color = ()=>{
    const colorRandom = (Math.random()) * (255 - 0 ) + 0
    const colorRGB = Math.floor(colorRandom)
    return colorRGB
}

const green = color()
const red = color()
const blue = color()

console.log(`${green},${red},${blue}`)