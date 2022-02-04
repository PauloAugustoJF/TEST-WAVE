const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
const out = document.getElementById("out")

canvas.width = 1000
canvas.height = 500

function teste(e){
  var prop = e.id
  wave[prop] = e.value
  out.innerText = prop + e.value
}

const wave = {
  amplitude: 50,
  comprimento: 50,
  frequencia: 50,
  propagacao: 50,
  ponto: 50,
}
var increment = wave.frequencia < 50? wave.frequencia * 0.01: -wave.frequencia * 0.01  

function animate(){
  requestAnimationFrame(animate)
  context.clearRect(0,0,canvas.width,canvas.height)
  context.beginPath()
  context.moveTo(0, canvas.height/2)

  for(let x = 0; x < canvas.width; x++){
    context.lineTo(...createWave(x))
  }
  context.lineTo(canvas.width, canvas.height)
  context.lineTo(0, canvas.height)
  context.fillStyle = "black"
  context.fill()
  context.stroke() 
  increment += wave.frequencia < 50? Math.abs(wave.frequencia - 50) * 0.01: -(wave.frequencia - 50) * 0.01  
}


function createWave(x){
  let progress = x / canvas.width //0 a 1 total
  let propag = progress < 0.5? (wave.propagacao / 100 * progress * 2) : Math.abs(progress - 1) * 2 * (wave.propagacao / 100)
  let k = progress < 0.5? 1: -1
  let y = canvas.height/2 + Math.sin(x * wave.comprimento * 0.002 * k + increment) * wave.amplitude * propag
  return [x, y]
}


animate()