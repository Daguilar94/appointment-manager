import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { FormGroup, ControlLabel, FormControl, Row, Col, Grid } from 'react-bootstrap';
import { handleClose, loadPacientes, setAppointment, updateSelection } from '../actionCreators.js';
import { connect } from 'react-redux';

class AppointmentForm extends Component {

  render() {

    // Set variables needed to fill the form
    const appointment = this.props.citaActualId !== "" ? this.props.citas.filter((cita) => {return cita.id === this.props.citaActualId})[0] : []
    const patient = appointment.patientId !== "" ? this.props.pacientes.filter((pat) => {return pat.id === appointment.patientId})[0] : undefined

    // Set Typeahead options
    const filterByFields = ['name', 'identification'];
    const defaultSelection = patient !== undefined ? [{name: patient.nombres + " " + patient.apellidos, identification: patient.identificacion, id: patient.id }] : []
    const options = this.props.pacientes.map(patient => ({name: patient.nombres + " " + patient.apellidos, identification: patient.identificacion, id: patient.id }))

    return (
      <Grid>
        <Modal show={ this.props.show } onHide={ this.props.handleClose }>
          <Row className="show-grid">
            <Col xs={12}>
              <Modal.Header closeButton>
                <Modal.Title>Set Appointment</Modal.Title>
              </Modal.Header>
            </Col>
          </Row>
          <form onSubmit={(e) => {this.props.setAppointment(e, this.props.citaActualId, this.props.selectedId), this.props.updateSelection("")}}>
            <Modal.Body>
              <Row className="show-grid">
                <Col xs={12} sm={6}>
                  <FormGroup>
                    <ControlLabel>Nombre</ControlLabel>
                    <FormControl type="text" value={appointment.nombre} disabled/>
                  </FormGroup>
                </Col>
                <Col xs={12} sm={6}>
                  <FormGroup>
                    <ControlLabel>Fecha</ControlLabel>
                    <FormControl type="text" value={appointment.fecha} disabled/>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel>Patient</ControlLabel>
                    <Typeahead
                      filterBy= { filterByFields }
                      name="patient"
                      labelKey="name"
                      options={ options }
                      placeholder="Filter by patient's name or Id"
                      defaultSelected={defaultSelection}
                      onChange={(selected) => {
                        selected.length > 0 ? this.props.updateSelection(selected[0].id) : this.props.updateSelection("")
                      }}
                      renderMenuItemChildren={(option) => (
                        <div>
                          <strong>{ option.name }</strong>
                          <div>
                            <small><strong>Id:</strong> { option.identification }</small>
                          </div>
                        </div>
                      )}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel>Comments</ControlLabel>
                    <FormControl componentClass="textarea" name="comments" placeholder={appointment.patientId !== "" ? appointment.comments : "" }/>
                  </FormGroup>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={ this.props.handleClose }>Cancel</Button>
              <Button bsStyle="primary" type="submit" onClick={(e) => {this.props.handleClose()}}>Save</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    show: state.show,
    pacientes: state.pacientes,
    citas: state.citas,
    citaActualId: state.citaActualId,
    selectedId: state.selectedId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClose() {
      dispatch(handleClose());
    },
    loadPacientes() {
      dispatch(loadPacientes());
    },
    setAppointment(event, citaId, selectedId) {
      dispatch(setAppointment(event, citaId, selectedId));
    },
    updateSelection(selectedId) {
      dispatch(updateSelection(selectedId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm);
