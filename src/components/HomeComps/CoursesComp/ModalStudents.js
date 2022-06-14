import Modal from "react-bootstrap/Modal";
import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table"

function StudentsModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Estudiantes de {props.coursename}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>DNI</th>
                <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {props.students.map((student) => {
                    return (
                        <tr>
                        <td>{student.idStudent}</td>
                        <td>{student.name}</td>
                        <td>{student.surnames}</td>
                        <td>{student.dni}</td>
                        <td>{student.email}</td>
                        </tr>
                    )
                })}

            </tbody>
        </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning' onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default StudentsModal