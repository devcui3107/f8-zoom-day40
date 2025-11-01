import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_TASKS,
  UPDATE_TASK,
} from './constants'

export const setList = payload => {
  return {
    type: SET_TASKS,
    payload,
  }
}

export const addItem = payload => {
  return {
    type: ADD_TASK,
    payload,
  }
}

export const editItem = payload => {
  return {
    type: EDIT_TASK,
    payload,
  }
}

export const updateItem = payload => {
  return {
    type: UPDATE_TASK,
    payload,
  }
}

export const deleteItem = payload => {
  return {
    type: DELETE_TASK,
    payload,
  }
}
