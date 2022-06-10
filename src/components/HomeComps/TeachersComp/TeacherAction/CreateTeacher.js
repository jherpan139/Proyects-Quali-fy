import Modal from "react-bootstrap/Modal";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import register from "../../../../request/register"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"

function CreateTeacherModal(props) {

    const [teacherName, setTeacherName] = React.useState('')
    const [passwd, setPasswd] = React.useState('')
    const [role, setRole] = React.useState(0)
    const [teacherEmail, setTeacherEmail] = React.useState('')
    const [teacherSurnames, setTeacherSurnames] = React.useState('')
    const [isCreated, setIsCreated] = React.useState(false)
    const [showAlert, setShowAlert] = React.useState(false)

    
    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsCreated(false)
       
        await register(props.token, teacherEmail, teacherName, teacherSurnames, role, passwd)
        .then(() => {setIsCreated(true); setShowAlert(true)})
        .catch((err) => {console.log(err);setIsCreated(false); setShowAlert(true)})
        
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
            Añadir profesor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
           <Form>
                <Form.Group className="mb-3">
                    <Row>
                        <Col>
                        <Form.Label>Nombre del profesor</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            value={teacherName}
                            onChange={(e) => {setTeacherName(e.target.value)}}
                            isInvalid={teacherName === ''}
                            isValid={teacherName !== ''}
                            />
                        <Form.Control.Feedback type="invalid">
                            El nombre no puede estar vacío
                        </Form.Control.Feedback>
                        </Col>
                        <Col xs={8}>
                            <Form.Label>Apellidos del profesor</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                value={teacherSurnames}
                                onChange={(e) => {setTeacherSurnames(e.target.value)}}
                                isInvalid={teacherSurnames === ''}
                                isValid={teacherSurnames !== ''}
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
                                value={teacherEmail}
                                onChange={(e) => {setTeacherEmail(e.target.value)}}
                                isInvalid={teacherEmail === ''}
                                isValid={teacherEmail !== ''}
                                />
                            <Form.Control.Feedback type="invalid">
                                Introduce un correo electrónico válido
                            </Form.Control.Feedback>  
                    </Form.Group> 
                    <Form.Group className="mb-3">
                        <Row>
                            <Col>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                value={passwd}
                                onChange={(e) => {setPasswd(e.target.value)}}
                                isInvalid={passwd.length<8}
                                isValid={passwd.length>=8}
                                />
                            <Form.Control.Feedback type="invalid">
                                La contraseña debe tener 8 caracteres mínimo
                            </Form.Control.Feedback>
                            </Col>
                            <Col xs={7}>
                                <Form.Label>Permisos</Form.Label>
                                <Form.Check name="roles" defaultChecked value={0} type="radio" label='User' onChange={(e) => setRole(e.target.value)}></Form.Check>
                                <Form.Check name="roles" value={1} type="radio" label='Administrator' onChange={(e) => setRole(e.target.value)}></Form.Check>
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
            ? <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>Profesor creado con éxito!</Alert>
            : <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>Oops! Error al crear el profesor.</Alert>
        )
        }
        </div>
    </>
    );
  }

export default CreateTeacherModal