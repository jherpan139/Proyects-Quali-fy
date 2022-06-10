import Modal from "react-bootstrap/Modal";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import createCourse from "../../../../request/createCourse"
import Alert from "react-bootstrap/Alert"
import Tabs from "react-bootstrap/Tabs"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Tab from "react-bootstrap/Tab"
import getAllCourses from "../../../../request/getAllCourses";
import getAllUsers from "../../../../request/getAllUsers";
import AddTeacherToCourse from "../../../../request/addTeacherToCourse"
import addTeacherToCurse from "../../../../request/addTeacherToCourse";

const listAllCourses = async (token) => {
    let courses = []
    await getAllCourses(token)
    .then((res) => courses = courses.concat(res.data))
    .catch((err) => console.log(err))
    return courses
}

const listAllUsers = async (token) => {
    let teachers = []
    await getAllUsers(token)
    .then((res) => teachers = teachers.concat(res.data))
    .catch((err) => console.log(err))
    return teachers
}

function CreateCourseModal(props) {

    const [teachersList, setTeachersList] = React.useState([])
    const [coursesList, setCoursesList] = React.useState([])
    const [courseName, setCourseName] = React.useState('')

    const [isCreated, setIsCreated] = React.useState(false)
    const [showAlert, setShowAlert] = React.useState(false)

    const [role, setRole] = React.useState(0)
    const [idUser, setIdUser] = React.useState(null)
    const [idCourse, setIdCourse] = React.useState(null)

    React.useEffect(async () => {
        const courses = await listAllCourses(props.token)
        const teachers = await listAllUsers(props.token)
        setCoursesList(courses)
        setTeachersList(teachers)
    },[])
    
    const handleAddCourse = async (event) => {
        event.preventDefault()
        setIsCreated(false)
        await createCourse(props.token, courseName)
        .then(() => {setIsCreated(true); setShowAlert(true)})
        .catch((err) => {setIsCreated(false); setShowAlert(true)})
        
        props.onHide()
        setTimeout(() => {setShowAlert(false)},4000)

    }

    const handleAddTeacherToCourse = async (event) => {
        event.preventDefault()
        setIsCreated(false)
        await addTeacherToCurse(props.token, idUser, idCourse, role)
        .then(() => {setIsCreated(true); setShowAlert(true)})
        .catch((err) => {setIsCreated(false); setShowAlert(true)})
        
        props.onHide()
        setTimeout(() => {setShowAlert(false)},4000)

    }

    return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Añadir curso/profesor a curso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Tabs defaultActiveKey="addcourse" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="addcourse" title="Añadir curso">
                    
                    <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del curso</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre..."
                            value={courseName}
                            onChange={(e) => {setCourseName(e.target.value)}}
                            isInvalid={courseName === ''}
                            isValid={courseName !== ''}
                        />
                        <Form.Control.Feedback type="invalid">
                            El nombre no puede estar vacío
                        </Form.Control.Feedback>
                        </Form.Group>
                            <div className="d-grid">
                                <Button type="submit" className="btn btn-dark" onClick={handleAddCourse}>
                                    Enviar
                                </Button>
                            </div>
                    </Form>

                </Tab>
                <Tab eventKey="addteachertocurse" title="Añadir profesor a un curso">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Cursos</Form.Label>
                            <Form.Select
                            onFocusCapture={(e) => setIdCourse(e.target.value)}
                            onChange={(e) => setIdCourse(e.target.value)}
                            >
                                <optgroup label="Cursos"></optgroup>
                                {coursesList.map((elem) => {
                                    return(
                                    <option value={elem.idCourse}>{elem.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Row>
                                <Col>
                                    <Form.Label>Profesores</Form.Label>
                                    <Form.Select
                                    onFocusCapture={(e) => setIdUser(e.target.value)}
                                    onChange={(e) => setIdUser(e.target.value)}
                                    >
                                        <optgroup label="Profesores"></optgroup>
                                        {teachersList.map((elem) => {
                                            return(
                                            <option value={elem.idUser}>{elem.name+' '+elem.surnames}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </Col>
                                <Col>
                                <Form.Label>Cargo</Form.Label>
                                        <Form.Check name="roles" defaultChecked value={0} type="radio" label='Profesor' onChange={(e) => setRole(e.target.value)}></Form.Check>
                                        <Form.Check name="roles" value={1} type="radio" label='Tutor' onChange={(e) => setRole(e.target.value)}></Form.Check>
                                </Col>
                            </Row>
                        </Form.Group>
                        <div className="d-grid">
                            <Button type="submit" className="btn btn-dark" onClick={handleAddTeacherToCourse}>
                                Enviar
                            </Button>
                        </div>
                    </Form>
                </Tab>
            </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning' onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <div className='d-flex justify-content-center'>
        {!showAlert ? null : (isCreated
            ? <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>Curso con nombre "{courseName}" creado con éxito</Alert>
            : <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>Oops! Error al crear el curso.</Alert>
        )
        }
        </div>
    </>
    );
  }

export default CreateCourseModal