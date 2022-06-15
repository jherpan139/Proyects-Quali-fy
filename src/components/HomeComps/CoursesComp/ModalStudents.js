import Modal from "react-bootstrap/Modal";
import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from "xlsx"


function StudentsModal(props) {

    const handleOnExport = () => {

      let dataParsed = []

      props.students.forEach(elem => {
        if (elem.final_grade !== 0){
        dataParsed = dataParsed.concat({
          'Nombre': elem.name,
          'Apellidos': elem.surnames,
          'DNI': elem.dni,
          'Nota del proyecto:': elem.final_grade
        })
      } else {
        dataParsed = dataParsed.concat({
          'Nombre': elem.name,
          'Apellidos': elem.surnames,
          'DNI': elem.dni,
          'Nota final': 'Sin calificar'
        })
      }
      })

      const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dataParsed);

      XLSX.utils.book_append_sheet(wb, ws, 'notas_proyecto')

      XLSX.writeFile(wb, `${props.coursename}_califications.xlsx`)
    }

    function getRole() {
      let courses = []
      props.teachers.forEach(teacher => {
        courses = courses.concat(teacher.courses_user)
      })

      let isTutor = false
      courses.forEach(elem => {
          if (elem.idCourse === props.idCourse){
              if (elem.role === 1){
                isTutor = true
              } else {
                isTutor = false
              }
          } 
      });
      setIsTutor(isTutor)
    }

    React.useEffect(() => {
      getRole()
    })

    const [isTutor, setIsTutor] = React.useState(false)

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Curso {props.coursename}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Tabs defaultActiveKey="listStudents" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="listStudents" title="Estudiantes">
              <Table striped bordered hover size="sm">
                  <thead>
                      <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>DNI</th>
                      <th>Email</th>
                      {isTutor ? <th>Nota</th> : null}
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
                              {isTutor ? <td>{student.final_grade === 0 ? 'Sin calificar' : student.final_grade}</td> : null}
                              </tr>
                          )
                      })}

                  </tbody>
              </Table>
            </Tab>
            <Tab eventKey="listTeachers" title="Profesores">
              <Table striped bordered hover size="sm">
                  <thead>
                      <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Email</th>
                      <th>Cargo</th>
                      </tr>
                  </thead>
                  <tbody>
                      {props.teachers.map((teacher) => {
                          return (
                              <tr>
                              <td>{teacher.idUser}</td>
                              <td>{teacher.name}</td>
                              <td>{teacher.surnames}</td>
                              <td>{teacher.email}</td>
                              {isTutor ? <td><strong>Tutor</strong></td> : <td>Profesor</td>}
                              </tr>
                          )
                      })}

                  </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          {isTutor ? <Button className="btn btn-dark" onClick={handleOnExport}><DownloadIcon/> Calificaciones</Button>
          : null}
          <Button variant='warning' onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default StudentsModal