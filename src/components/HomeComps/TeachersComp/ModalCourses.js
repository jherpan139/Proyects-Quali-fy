import Modal from "react-bootstrap/Modal";
import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table"

function CoursesModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Estudiantes de {props.userName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Cargo</th>
                </tr>
            </thead>
            <tbody>
                {props.courses.map((course) => {
                    return (
                        <tr>
                        <td>{course.course.idCourse}</td>
                        <td>{course.course.name}</td>

                        {course.role === 1 ? <td><strong>Tutor</strong></td>: <td>Profesor</td>}
                        
                        </tr>
                    )
                })}

            </tbody>
        </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default CoursesModal