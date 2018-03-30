import electron from './imports/electron'

let actualWindowState = false
const WINDOW = electron.window
const SCREEN = electron.screen

// Need to loop the position of the mouse, no other way to trigger mouse move event with electron (outside the window)
export default function loop (obj) {
  setInterval(() => {
    let bounds = WINDOW.getBounds()
    let mousePos = SCREEN.getCursorScreenPoint()
    let size = WINDOW.getSize()

    // New positions
    let newX = mousePos.x - bounds.x
    let newY = mousePos.y - bounds.y - obj.control.totalHeight

    if (!obj.window.clickable) {
      // If the cursor touch the Top or Bottom component => set the window clickable
      if (obj.control.visible) {
        setIgnoreClick(newY > 0 && newY < size[1] - 2 * obj.control.totalHeight)
      } else {
        setIgnoreClick(true)
      }

      // Set new position
      obj.setBallPos({
        x: newX,
        y: newY
      })
    } else {
      setIgnoreClick(!obj.control.visible && (newY < 0 || newY > size[1] - 2 * obj.control.totalHeight))
    }
  }, 0)
}

// Set mouse click through
function setIgnoreClick (val) {
  if (actualWindowState !== val) {
    WINDOW.setIgnoreMouseEvents(val)
    actualWindowState = val
  }
}
