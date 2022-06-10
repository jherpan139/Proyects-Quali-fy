import Modal from "react-bootstrap/Modal";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import getAllCourses from "../../../../request/getAllCourses";
import createStudent from "../../../../request/createStudent"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"

const listAllCourses = async (token) => {
    let courses = []
    await getAllCourses(token)
    .then((res) => courses = courses.concat(res.data))
    .catch((err) => console.log(err))
    return courses
}

function CreateStudentModal(props) {

    const [coursesList, setCoursesList] = React.useState([])
    const [studentName, setStudentName] = React.useState('')
    const [dni, setDni] = React.useState('')
    const [role, setRole] = React.useState(0)
    const [studentEmail, setStudentEmail] = React.useState('')
    const [studentSurnames, setStudentSurnames] = React.useState('')
    const [isCreated, setIsCreated] = React.useState(false)
    const [showAlert, setShowAlert] = React.useState(false)
    const [idCourse, setIdCourse] = React.useState(null)

    React.useEffect(async () => {
        const courses = await listAllCourses(props.token)
        setCoursesList(courses)
    },[])
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsCreated(false)
        
        await createStudent(props.token, studentEmail, studentName, studentSurnames, dni, idCourse)
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
            Añadir estudiante
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
           <Form>
                <Form.Group className="mb-3">
                    <Row>
                        <Col>
                        <Form.Label>Nombre del estudiante</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            value={studentName}
                            onChange={(e) => {setStudentName(e.target.value)}}
                            isInvalid={studentName === ''}
                            isValid={studentName !== ''}
                            />
                        <Form.Control.Feedback type="invalid">
                            El nombre no puede estar vacío
                        </Form.Control.Feedback>
                        </Col>
                        <Col xs={8}>
                            <Form.Label>Apellidos del estudiante</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                value={studentSurnames}
                                onChange={(e) => {setStudentSurnames(e.target.value)}}
                                isInvalid={studentSurnames === ''}
                                isValid={studentSurnames !== ''}
                                />
                            <Form.Control.Feedback type="invalid">
                                Los apellidos no pueden estar vacíos
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Correo electrónico"
                                value={studentEmail}
                                onChange={(e) => {setStudentEmail(e.target.value)}}
                                isInvalid={studentEmail === ''}
                                isValid={studentEmail !== ''}
                                />
                            <Form.Control.Feedback type="invalid">
                                Introduce un correo electrónico válido
                            </Form.Control.Feedback>  
                    </Form.Group> 
                    <Form.Group className="mb-3">
                        <Row>
                            <Col>
                            <Form.Label>DNI</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="DNI"
                                value={dni}
                                onChange={(e) => {setDni(e.target.value)}}
                                />
                            <Form.Control.Feedback type="invalid">
                                DNI no válido
                            </Form.Control.Feedback>
                            </Col>
                            <Col xs={7}>
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
                            </Col>
                        </Row>
                    </Form.Group>
                         <div className="d-grid">
                            <Button type="submit" className="btn btn-dark" onClick={handleSubmit}>
                             Enviar
                            </Button>
                        </div>
                    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning' onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <div className='d-flex justify-content-center'>
        {!showAlert ? null : (isCreated
            ? <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>Estudiante creado con éxito!</Alert>
            : <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>Oops! Error al crear el estudiante.</Alert>
        )
        }
        </div>
    </>
    );
  }

export default CreateStudentModal