export const strict = false
export const state = () => ({
  turnOffAll: false,
  turnOffTimezoneMessage: false
})
export const mutations = {
  turnOffMessages(state) {
    state.turnOff = true
  },
  turnOffTimezone(state) {
    state.turnOffTimezoneMessage = true
  }
}
