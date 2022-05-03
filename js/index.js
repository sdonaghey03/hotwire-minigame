const wires = document.querySelectorAll('.wire')
const sockets = document.querySelectorAll('.socket')

var randomisedSockets = ["one", "two", "three", "four"]
var remainingSockets = ["one", "two", "three", "four"]

var draggingElementId = ""
var started = false
var timer = 100.0
var interval = null
var wireCount = 0;

wires.forEach(wire => {
  wire.addEventListener('dragstart', dragStart)
})

sockets.forEach(socket => {
  socket.addEventListener('dragover', dragOver)

  const rnd = randomIntFromInterval(1,randomisedSockets.length)
  socket.classList.add("socket-" + randomisedSockets[rnd-1])
  randomisedSockets = randomisedSockets.filter(item => item !== randomisedSockets[rnd-1])
})

function dragStart(e) {
  draggingElementId = e.target.id
  console.log("Started dragging: " + e.target.id)

  if (!started) {
    started = true
    startProgressBar()
  }
}

function dragOver(e) {
  e.preventDefault();
  const draggedWire = document.getElementById(draggingElementId)
  const targetClass = e.target.className.substring(14, 19)
  const draggedClass = draggedWire.className.substring(10, 15)

  if (remainingSockets.includes(targetClass)) {
    if (draggedClass === targetClass) {
      remainingSockets = remainingSockets.filter(item => item !== targetClass)
      draggedWire.classList.add('wire-complete-' + targetClass)
      e.target.classList.add('complete-' + targetClass)
      e.target.querySelector('.check').classList.remove('hide')

      wireCount++;
      if (wireCount === 4) {
        if (timer !== 0) {
          clearInterval(interval)

          document.getElementById('outcome-success').classList.remove('hide')
        } else {
          document.getElementById('outcome-failed').classList.remove('hide')
        }
      }
    }
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function startProgressBar() {
  var elem = document.getElementById("progressBar");
  var timeLeft = document.getElementById("time-left");
  interval = setInterval(frame, 10);
  function frame() {
    if (timer <= 0) {
      clearInterval(interval);
      timer = 0;
    } else {
      timer = timer - 0.2;
      elem.style.width = timer + '%';
      timeLeft.innerHTML = Math.ceil((timer/2) / 10);
    }
  }
}