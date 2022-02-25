const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
const output1 = document.getElementById("out1")
const output2 = document.getElementById("out2")
const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
btn1.addEventListener("click", click1)
btn2.addEventListener("click", click2)
canvas.addEventListener("mousemove", getMousePos)

function click1(){
  clearArrIntencity()
}

function click2(){
  console.log(verifyWave())
}


canvas.width = 1000
canvas.height = 500

function teste(e){
  var prop = e.id
  if(prop === "comprimento"){
    output2.innerHTML = waveProperties.comprimento * 0.002
  }
  waveProperties[prop] = e.value
  output1.innerText = prop + e.value

}

const waveProperties = {
  amplitude: 50,
  comprimento: 50,
  frequencia: 50,
  propagacao: 50,
  ponto: 50,
}

var count = []

var wave = {
  initPoint: 0,
  arrIntencity: []
}

clearArrIntencity()
function clearArrIntencity(){
  wave.initPoint = 0
  wave.arrIntencity = []
  for(let i = 0; i < canvas.width; i++){
    wave.arrIntencity.push(0)
  }
}

function calculateAmplitude(){
  let arrModified = []
  wave.arrIntencity.map((item,index) => {
    
  })
}


var increment = 
  waveProperties.frequencia < 50 ? 
  waveProperties.frequencia * 0.01 :
  -waveProperties.frequencia * 0.01  

function preFrame(){
  context.clearRect(0,0,canvas.width,canvas.height)
  context.beginPath()
  context.strokeStyle = "#000000";
  context.moveTo(0, canvas.height/2)
}

function animate(){
  setTimeout(animate, 50)
  preFrame() 
  //calculateAmplitude()
  for(let x = 0; x < canvas.width; x++){
    context.lineTo(...createWave(x))
  }

  posFrame()
  increment += waveProperties.frequencia < 50? Math.abs(waveProperties.frequencia - 50) * 0.01: -(waveProperties.frequencia - 50) * 0.01  
}

function posFrame(){
  context.lineTo(canvas.width, canvas.height)
  context.lineTo(0, canvas.height)
  fillColorDownWave()
  drawLineWave()
  count = []
  context.stroke() 
}

function fillColorDownWave(){
  context.fillStyle = "black"
  context.fill()
  context.stroke() 
  context.closePath()
}

function drawLineWave(){
  context.beginPath()
  
  count = count.filter(item => (!!item))
  count.forEach((value, index) => {
    if(count[index] < wave.initPoint && count[index + 1] > wave.initPoint){
      context.strokeStyle = "#0000ff";
      context.moveTo(value, (canvas.height/2) - 100)
      context.lineTo(count[index + 1], (canvas.height/2) - 100)
      for(let i = 0; i < (count[index + 1] - value); i++){
        wave.arrIntencity[value + i] = 1
      }
    }
  context.strokeStyle = "#FF0000";
  context.moveTo(value, (canvas.height/2) - 100)
  context.lineTo(value, (canvas.height/2) + 100)
  })
}

let meio = false
function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect()
  let posy = Math.trunc((evt.clientY - rect.top))
  let posx = Math.trunc((evt.clientX - rect.left))
  let middleDistance = Math.abs(posy - (canvas.height/2))
  if(!(middleDistance < 10) && meio){
    let direction = posy < (canvas.height/2)? "up":"down"
    let intensity = middleDistance - 9
    middleMousePass(posx, direction, intensity)
  }
  meio = middleDistance < 10
}

function middleMousePass(posx, direction, intensity){
  
  wave.arrIntencity[posx] = 1
  wave.initPoint = posx
  console.log(posx, direction, intensity)
}

function verifyWave(){
  return !!wave.arrIntencity.reduce((acc, item) => {return acc += !item?0:1},0)
}



function createWave(x, amp){
  let progress = x / canvas.width //0 a 1 total
  //let senoide = Math.cos(progress * (-2 *Math.PI) /* waveProperties.comprimento * 0.02 + increment*/ )
  let senoide = Math.sin(x * waveProperties.comprimento * 0.002 /*+ increment*/)
  let proxsenoide = Math.sin((x + 1) * waveProperties.comprimento * 0.002 /*+ increment*/)
  let y = canvas.height/2 + senoide * waveProperties.amplitude * wave.arrIntencity[x]
  
  count.push((senoide > 0 && proxsenoide <= 0) || (senoide <= 0 && proxsenoide > 0) ? x : undefined)
  return [x, y]
}


animate()

//sdgsd