import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state, action) => {
  if (action.type === "HANDLE_CLOSE") {
    return {
      ...state,
      show: false,
    }
  } else if (action.type === "HANDLE_SHOW") {
    return {
      ...state,
      show: true,
      citaActualId: action.citaActualId
    }
  } else if (action.type === "LOAD_CITAS") {
    return {
      ...state,
      citas: action.citas
    }
  } else if (action.type === "LOAD_PACIENTES") {
    return {
      ...state,
      pacientes: action.pacientes
    }
  } else if (action.type === "SET_APPOINTMENT") {
    const current = state.citas.filter((cita) => { return action.citaActualId === cita.id })[0]
    current.patientId = action.patientId
    current.comments = action.comments
    return {
      ...state,
      citas: state.citas.map((cita) => {return  cita.id === action.citaId ? current : cita })
    }
  } else if (action.type === "UPDATE_SELECTION") {
    return {
      ...state,
      selectedId: action.selectedId
    }
  }

  return state
}

export default createStore(reducer, { citas: [], pacientes: [], show: false, citaActualId: "", comments: "", selectedId: "" }, applyMiddleware(thunk));
