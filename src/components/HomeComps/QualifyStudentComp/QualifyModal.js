//meter un modal con accordeons que se desplieguen con un campo para la nota y otro para un comentario por seccion + textarea final para comentarios globales
//pasarle id usuario y del student, asignar porcentajes a cada apartado y calcular la nota final.

//otro modal con un carousel (dar una vuelta) para ver todas las notas as tutor, ver cada profesor la nota que ha asignado al alumno y en cada carousel
// ver comentario general del proyecto puesto por cada profesor + la nota final, sacar la media de todas las notas del alumno y ponerla disabled, al lado
//un input para que el tutor asigne la nota final correspondiente.

//implementar table 2 https://codesandbox.io/s/react-bootstrap-table-paging-example-mxdx6?file=/src/App.js

//si ya he califdicado al alumno el boton de calificar me aparecerá cambiar nota en vez de calificar y se abre el mismo modal pero con los datos x defecto de la bd

import Modal from "react-bootstrap/Modal";
import React from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { FormGroup } from "@material-ui/core";
import qualifyAsTeacher from "../../../request/qualifyAsTeacher";

function QualifyModal(props) {

    const [ textPresentation, setTextPresentation ] = React.useState('')
    const [ presentationGrade, setPresentationGrade ] = React.useState(0)
    const [ textDocumentation, setTextDocumentation ] = React.useState('')
    const [ documentationGrade, setDocumentationGrade ] = React.useState(0)
    const [ textDemonstration, setTextDemonstration ] = React.useState('')
    const [ demonstrationGrade, setDemonstrationGrade ] = React.useState(0)
    const [ questionsGrade, setQuestionsGrade ] = React.useState(0)
    const [ textQuestions, setTextQuestions] = React.useState('')
    const [ textResearch, setTextResearch] = React.useState('')
    const [ researchGrade, setResearchGrade] = React.useState(0)
    const [ grades, setGrades ] = React.useState([])
    const [ totalGrade, setTotalGrade] = React.useState(1)
    const [ generalText, setGeneralText] = React.useState('')
    const [ validated, setValidated ] = React.useState(false)

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false){
            event.preventDefault()
            event.stopPropagation()
        }

        setValidated(true)
        const total = parseFloat(presentationGrade) + parseFloat(documentationGrade) + parseFloat(demonstrationGrade) + parseFloat(questionsGrade) + parseFloat(researchGrade)
        props.onHide()
        console.log(total)
        await qualifyAsTeacher(props.user.token, props.user.idUser, props.student.idStudent, total, generalText, presentationGrade, textPresentation,
            documentationGrade, textDocumentation, demonstrationGrade, textDemonstration, questionsGrade, textQuestions, researchGrade, textResearch)
            .then((a) => console.log(a))
            .catch((err) => console.log(err))
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
       <Form validated={validated}>
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Calificar proyecto de <strong>{props.studentname}</strong>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Accordion defaultActiveKey={['0']}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Exposición</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Comentario</Form.Label>
                                        <Form.Control
                                        as="textarea"
                                        rows="1"
                                        placeholder="Breve comentario..."
                                        value={textPresentation}
                                        onChange={(e) => {setTextPresentation(e.target.value)}}
                                        >
                                        </Form.Control>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Puntuación [0-3]*</Form.Label>
                                        <Form.Control
                                        type="number"
                                        min={0}
                                        max={3}
                                        required
                                        defaultValue={0}
                                        isInvalid={presentationGrade<0 || presentationGrade>3}
                                        onChange={(e) => {
                                            if (e.target.value >= 0 && e.target.value <= 3){
                                            setPresentationGrade(Number(e.target.value))
                                            setTotalGrade(totalGrade+presentationGrade)
                                            }
                                        }}
                                        >
                                        </Form.Control>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Documentación</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Comentario</Form.Label>
                                        <Form.Control
                                        as="textarea"
                                        rows="1"
                                        placeholder="Breve comentario..."
                                        value={textDocumentation}
                                        onChange={(e) => setTextDocumentation(e.target.value)}
                                        >
                                        </Form.Control>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Puntuación [0-2]*</Form.Label>
                                        <Form.Control
                                        type="number"
                                        placeholder="Nota del apartado"
                                        min={0}
                                        max={2}
                                        defaultValue={0}
                                        required
                                        isInvalid={documentationGrade<0 || documentationGrade>2}
                                        onChange={(e) => setDocumentationGrade(e.target.value)}
                                        >
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            La nota no es válida.
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Demostración</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Comentario</Form.Label>
                                        <Form.Control
                                        as="textarea"
                                        rows="1"
                                        placeholder="Breve comentario..."
                                        value={textDemonstration}
                                        onChange={(e) => setTextDemonstration(e.target.value)}
                                        >
                                        </Form.Control>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Puntuación [0-3]*</Form.Label>
                                        <Form.Control
                                        type="number"
                                        required
                                        placeholder="Nota del apartado"
                                        min={0}
                                        max={3}
                                        defaultValue={0}
                                        isInvalid={demonstrationGrade<0 || demonstrationGrade>2}
                                        onChange={(e) => setDemonstrationGrade(e.target.value)}
                                        >
                                        </Form.Control>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Preguntas del tribunal</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Comentario</Form.Label>
                                        <Form.Control
                                        as="textarea"
                                        rows="1"
                                        placeholder="Breve comentario..."
                                        value={textQuestions}
                                        onChange={(e) => setTextQuestions(e.target.value)}
                                        >
                                        </Form.Control>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Puntuación [0-1]*</Form.Label>
                                        <Form.Control
                                        type="number"
                                        required
                                        placeholder="Nota del apartado"
                                        min={0}
                                        max={1}
                                        defaultValue={0}
                                        isInvalid={questionsGrade<0 || questionsGrade>1}
                                        onChange={(e) => setQuestionsGrade(e.target.value)}
                                        >
                                        </Form.Control>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Nuevas tecnologías</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Comentario</Form.Label>
                                        <Form.Control
                                        as="textarea"
                                        rows="1"
                                        placeholder="Breve comentario..."
                                        value={textResearch}
                                        onChange={(e) => setTextResearch(e.target.value)}
                                        >
                                        </Form.Control>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Puntuación [0-1]*</Form.Label>
                                        <Form.Control
                                        type="number"
                                        placeholder="Nota del apartado"
                                        required
                                        min={0}
                                        max={1}
                                        defaultValue={0}
                                        isInvalid={researchGrade<0 || researchGrade>1}
                                        onChange={(e) => setResearchGrade(e.target.value)}
                                        >
                                        </Form.Control>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                <Col>
                    <FormGroup className="mb-3">
                        <Form.Label>Comentario general</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows="2"
                            required
                            placeholder="Breve comentario..."
                            value={generalText}
                            onChange={(e) => setGeneralText(e.target.value)}
                                >
                                </Form.Control>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className="mb-3">
                        <Form.Label>Puntuación total</Form.Label>
                        <Form.Control
                        readOnly
                        type="text"
                        placeholder="Nota total"
                        value={totalGrade}
                        >
                        </Form.Control>
                    </FormGroup>
                </Col>
                </Row>
                <Col style={{ display: 'flex', justifyContent: 'flex-end'}}>

                    <Button onClick={handleSubmit} variant="success" style={{ margin: 5 }}>Calificar</Button>
                    <Button variant="warning" onClick={props.onHide} style={{ margin: 5 }}>Cerrar</Button>
                </Col>
            </Modal.Footer>
        </Form>
      </Modal>
    );
  }

export default QualifyModal