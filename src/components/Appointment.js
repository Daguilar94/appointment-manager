import React, { Component } from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import '../Appointment.css';
import { connect } from 'react-redux';
import { handleShow } from '../actionCreators.js';

class Appointment extends Component {

  displayReserved() {
    const patient = this.props.pacientes.filter((patient) => { return patient.id === this.props.patientId })[0]
    return (
      <Panel.Body>
        <Row className="show-grid">
          <Col xs={12}>
            <p>{patient.nombres}</p>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12}>
            <span><strong>Id: </strong></span>
            <span>{patient.identificacion}</span>
          </Col>
        </Row>
      </Panel.Body>
    )
  }

  displayAvailable() {
    return (
      <Panel.Body>
        <Row className="show-grid">
          <Col xs={12}>
            <h3 className="text-success text-center">Available</h3>
          </Col>
        </Row>
      </Panel.Body>
    )
  }

  render() {

    //Set Time from 24h to 12h
    const dateOnly = this.props.date.split(" ")[0];
    const hour24 = parseInt(this.props.date.split(" ")[1].slice(0,2), 10);
    const minsAndSecs = this.props.date.split(" ")[1].slice(2);
    const hour = hour24 < 12 ? String(hour24) + minsAndSecs + " AM" : String(hour24 - 12) + minsAndSecs + " PM";

    return(
      <div className="appointment-container text-center">
        <Panel bsStyle={ this.props.patientId === "" ? "success" : "info" } onClick={ this.props.handleShow.bind(this, this.props.current) }>
          <Panel.Heading>
            <Panel.Title componentClass="h3">{ this.props.name }</Panel.Title>
          </Panel.Heading>
          { this.props.patientId === "" ? this.displayAvailable() : this.displayReserved() }
          <Panel.Footer>
            <Row className="show-grid">
              <Col xs={6}>
                <span>{dateOnly}</span>
              </Col>
              <Col xs={6}>
                <span>{hour}</span>
              </Col>
            </Row>
          </Panel.Footer>
        </Panel>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pacientes: state.pacientes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleShow(current) {
      dispatch(handleShow(current));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
