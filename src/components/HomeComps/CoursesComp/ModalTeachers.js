import Modal from "react-bootstrap/Modal";
import React from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from 'react-bootstrap/Tooltip'
import { red } from "@mui/material/colors";
import Button from 'react-bootstrap/Button'
import Table from "react-bootstrap/Table"

function TeachersModal(props) {

    const handleAddTeacherToCurse = () => {

    }

    const handleDeleteTeacherFromCurse = () => {
      
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Profesores de {props.courseName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Email</th>
                <th>Cargo</th>
                {props.user.role === 'ADMIN' ? <th>Modificar</th> : ''}
                </tr>
            </thead>
            <tbody>
            {props.teachers.map((teacher) => {
                    return (
                        <tr>
                        <td>{teacher.teacher.idUser}</td>
                        <td>{teacher.teacher.name}</td>
                        <td>{teacher.teacher.surnames}</td>
                        <td>{teacher.teacher.email}</td>
                        {teacher.role === 0 ? <td>Profesor</td> : <td><strong>Tutor</strong></td>}
                        {props.user.role === 'ADMIN' ? <td>
                        <OverlayTrigger
                          placement='bottom'
                          overlay={
                            <Tooltip>
                              Añadir profesor a <strong>{props.courseName}</strong>
                            </Tooltip>
                          }
                        >
                          <Button size="sm" style={{backgroundColor:'transparent', border: 0}} ><AddCircleIcon color="success"></AddCircleIcon></Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement='bottom'
                          overlay={
                            <Tooltip>
                              Borrar profesor de <strong>{props.courseName}</strong>
                            </Tooltip>
                          }
                        >
                          <Button size="sm" style={{backgroundColor:'transparent', border: 0}}><DeleteForeverIcon sx={{color: red[500]}}></DeleteForeverIcon></Button>
                          </OverlayTrigger>
                        </td> : null}
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

export default TeachersModal