import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import Appointment from './components/Appointment.js';
import AppointmentForm from './components/AppointmentForm.js';
import { connect } from 'react-redux';
import { loadCitas } from './actionCreators.js';
import './App.css';

const App = (props) => {

  return (
    <div className="app-container container-fluid">
      <PageHeader className="text-center header-title">
        Set your appointment!
        <p className="text-center text-muted">Click on the available appointments to assign a Patient</p>
      </PageHeader>
      <div className="appointments-container">
        <Grid>
          <Row className="show-grid">
            {props.citas.map((cita) =>
              <Col xs={12} sm={3} key={ cita.id }>
                <Appointment name={ cita.nombre } date={ cita.fecha } patientId={ cita.patientId } current={ cita.id }/>
              </Col>
            )}
          </Row>
          <AppointmentForm />
        </Grid>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    citas: state.citas,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCitas() {
      dispatch(loadCitas());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
