import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_TASKS,
  UPDATE_TASK,
} from './constants'

const initState = {
  list: [],
  currentItem: { title: '', completed: false },
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        list: action.payload,
      }
    case ADD_TASK:
      return {
        ...state,
        list: [action.payload, ...state.list],
      }
    case EDIT_TASK:
      return {
        ...state,
        currentItem: action.payload,
      }
    case UPDATE_TASK:
      return {
        ...state,
        list: state.list.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        currentItem: action.payload,
      }
    case DELETE_TASK:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
        currentItem:
          state.currentItem && state.currentItem.id === action.payload
            ? null
            : state.currentItem,
      }

    default:
      return state
  }
}

export default reducer
