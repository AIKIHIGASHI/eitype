export const state = () => ({
  chime1: new Audio(require('~/assets/sounds/chime1.mp3')),
  chime2: new Audio(require('~/assets/sounds/chime2.mp3')),
})

export const mutations = {
  chime1Play(state) {
    state.chime1.play()
    state.chime1.volume = 0.3
  },
  chime2Play(state) {
    state.chime2.play()
    state.chime2.volume = 0.1
  },
  chime2Stop(state) {
    state.chime2.pause()
    state.chime2.currentTime = 0
  },
}
