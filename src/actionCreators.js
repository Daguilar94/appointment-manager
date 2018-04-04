import axios from 'axios';

const handleClose = () => {
  return {
    type: "HANDLE_CLOSE",
  }
}

const handleShow = (citaActualId) => {
  return {
    type: "HANDLE_SHOW",
    citaActualId: citaActualId
  }
}

const updateSelection = (selectedId) => {
  return {
    type: "UPDATE_SELECTION",
    selectedId: selectedId
  }
}

const setAppointment = (event, citaId, selectedId) => {
  event.preventDefault()
  return {
    type: "SET_APPOINTMENT",
    citaActualId: citaId,
    patientId: selectedId,
    comments: event.target['comments'].value
  }
}

const loadPacientes = () => {
  return dispatch => {
    axios.get('./pacientes.json')
    .then((response) => {
      dispatch({
        type: "LOAD_PACIENTES",
        pacientes: response.data
      })
    })
  }
}

const loadCitas = () => {
  return dispatch => {
    axios.get('./citas.json')
    .then((response) => {
      response.data.citas.map((cita) => {return cita.patientId = ""})
      response.data.citas.map((cita) => {return cita.comments = ""})
      dispatch({
        type: "LOAD_CITAS",
        citas: response.data.citas
      })
    })
  }
}

export { handleClose, handleShow, loadCitas, loadPacientes, setAppointment, updateSelection }
