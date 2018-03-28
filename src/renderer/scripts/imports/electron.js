import { screen, remote } from 'electron'

export default {
  remote: remote,
  screen: screen,
  window: remote.getCurrentWindow()
}
