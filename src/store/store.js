import Redux from '@/libs/redux'

import { combineReducers } from 'redux'
import todoReducer from './tasks/reducer'

const rootReducer = combineReducers({
  tasks: todoReducer,
})

const store = Redux.createStore(rootReducer)

// TRICK
window.store = store

export default store
