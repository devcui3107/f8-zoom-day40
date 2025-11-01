const __DO_NOT_USE__ActionTypes = { type: '@@F8-redux/INITz.l.1.1.7' }

const Redux = {
  createStore(reducer, initState) {
    let state = reducer(initState, __DO_NOT_USE__ActionTypes)

    const listeners = []

    return {
      getState() {
        return state
      },
      dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
      },
      subscribe(listener) {
        listeners.push(listener)

        return () => {
          const index = listeners.indexOf(listener)
          listeners.splice(index, 1)
        }
      },
    }
  },
}

export default Redux
