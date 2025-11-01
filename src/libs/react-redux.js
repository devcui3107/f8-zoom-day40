import { Context } from '@/contexts/ReduxContext'
import { useContext, useEffect, useState } from 'react'

function useStore() {
  const store = useContext(Context)
  return store
}

function useDispatch() {
  const store = useStore()
  return store.dispatch
}

function useSelector(callback) {
  const store = useStore()
  const [state, setState] = useState(() => {
    return callback(store.getState())
  })

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newState = callback(store.getState())
      if (state !== newState) setState(newState)
    })

    // Cleanup
    return unsubscribe
  }, [callback, state, store])

  return state
}

export { useDispatch, useSelector, useStore }
