let knightPosition = [0, 0]
let observer = null

function emitChange() {
  observer(knightPosition)
}

export function observe(o) {
  // const randPos = () => Math.floor(Math.random() * 8)
  // setInterval(() => receive([randPos(), randPos()]), 1000)
  if (observer) {
    throw new Error('Multiple observers not implemented')
  }

  observer = o
  emitChange()
}

export function moveKnight(toX, toY) {
  knightPosition = [toX, toY]
  emitChange()
}