import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { useLocation } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { UserContext } from '../../../helpers/AuthContext'
import Form from 'react-bootstrap/Form'
import QualifyModal from './QualifyModal'
import getAllGradesByStudent from '../../../request/grades/getAllGradesByStudent'
import QualifyAsTutorModal from './QualifyAsTutorModal'
import getCoursesById from '../../../request/getCoursesById'

const QualifyMenu = (props) => {

  async function listGrades() {
    let studentGrades = []
    await getAllGradesByStudent(user.token, state.student.idStudent)
    .then((grades) => studentGrades = studentGrades.concat(grades.data))
    .catch((err) => console.log(err))

    setGrades(studentGrades)

  }

  async function listCoursesById() {
    let teachers = []
    await getCoursesById(user.token, state.student.idCourse)
    .then((res) => teachers = teachers.concat(res.data.users))
    .catch((err) => console.log(err))

    setStudentTeachers(teachers)

  }

  const { state } = useLocation()

  const { user } = React.useContext(UserContext)
  const [modalShow, setModalShow] = React.useState(false)
  const [modalTutorShow, setModalTutorShow] = React.useState(false)
  const [grades, setGrades] = React.useState([])
  const [studentTeachers, setStudentTeachers] = React.useState([])

  React.useEffect(() => {
    listGrades()
    listCoursesById()
  },[])

  return (
    <Container fluid>
        <Card>
          <h1 className='text-center'>Calificaciones</h1>
            <Card.Body>
              <Form>
               <Form.Group className="mb-3">
                    <Row>
                        <Col>
                        <Form.Label>Alumno</Form.Label>
                        <Form.Control
                            type="text"
                            readOnly
                            value={state.student.name+' '+state.student.surnames}
                            />
                        </Col>
                        <Col xs={3}>
                            <Form.Label>DNI</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                value={state.student.dni}
                                />
                        </Col>
                        <Col xs={5}>
                            <Form.Label>Curso</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                value={state.student.course.name}
                                />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Row>
                        <Col>
                        </Col>
                        {user.role === 'ADMIN' || state.tutor ? <Col xs={3}>
                          <div className="d-grid">
                          <Button variant='warning' onClick={() => setModalTutorShow(true)}>
                            <strong>Ver calificaciones</strong>
                          </Button>
                          </div>
                        </Col> : null}
                        <Col xs={3}>
                          <div className="d-grid">
                          <Button variant='warning' onClick={() => setModalShow(true)}>
                            <strong>Calificar alumno</strong>
                          </Button>
                          </div>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form.Group>
              </Form>
            </Card.Body>
        </Card>

        <QualifyModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          studentname={state.student.name+' '+state.student.surnames}
          user={user}
          student={state.student}
        >
        </QualifyModal>

        <QualifyAsTutorModal
          show={modalTutorShow}
          onHide={() => setModalTutorShow(false)}
          studentname={state.student.name+' '+state.student.surnames}
          grades={grades}
          token={user.token}
          teachers={studentTeachers}
          student={state.student}
        >
        </QualifyAsTutorModal>

    </Container>
  )
}

export default QualifyMenu