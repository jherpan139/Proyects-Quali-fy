import Modal from "react-bootstrap/Modal";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import qualifyAsTutor from "../../../request/qualifyAsTutor";

function QualifyAsTutorModal(props) {

    const getTeacherName = (idTeacher) => {
      let name = ''
      props.teachers && props.teachers.map((teacher) => {
        if (teacher.idUser === idTeacher){
          name = teacher.name+' '+teacher.surnames
        }
      })
      return name
    }

    const calculateAverageGrade = () => {
      let gradesArray = []
      for(let i = 0; i < props.grades.length; i++){
        gradesArray = gradesArray.concat(props.grades[i].final_grade)
      }

      const average = gradesArray.reduce((a, b) => a + b, 0) / gradesArray.length;
      setAverageGrade(average)
    }

    const handleSubmit = async () => {
      await qualifyAsTutor(props.token, props.student.idStudent, finalGrade)
      .then((a) => {console.log(a)})
      .catch((err) => console.log(err))
    }

    const [averageGrade, setAverageGrade] = React.useState(0)
    const [finalGrade, setFinalGrade] = React.useState(1)

    React.useEffect(() => {
      calculateAverageGrade()
    })

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Notas de {props.studentname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            {props.grades.map((grade) => {
              return(
                <Row>
                  <h5>Calificación asignada por {getTeacherName(grade.idUser)}</h5>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Comentario</Form.Label>
                      <Form.Control
                      type="text"
                      value={grade.overall_comment}
                      readOnly
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>     
                  <Col>
                  <Form.Group className="mb-3">
                      <Form.Label>Nota</Form.Label>
                      <Form.Control
                      type="text"
                      value={grade.final_grade}
                      readOnly
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col> 
                  <hr
        style={{
            color: 'black',
            backgroundColor: 'black',
            height: 1
        }}
    />                  
                </Row>
                
              )
            })}

                <Row>
                  <h4>Calificación final</h4>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Nota media</Form.Label>
                      <Form.Control
                      type="number"
                      readOnly
                      value={averageGrade}
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>     
                  <Col>
                  <Form.Group className="mb-3">
                      <Form.Label>Nota final</Form.Label>
                      <Form.Control
                      type="number"
                      value={finalGrade}
                      min={1}
                      max={10}
                      onChange={(e) => {
                        if (e.target.value >= 1 && e.target.value <= 10){
                        setFinalGrade(e.target.value)
                        }
                    }}
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>  
                </Row>
            {props.teachers.length !== props.grades.length ? <p className='text-center' style={{ color: 'red', marginBottom: -5 }}>¡FALTAN PROFESORES POR CALIFICAR AL ALUMNO!</p>: null}
            
        </Modal.Body>
        <Modal.Footer>
        {props.teachers.length === props.grades.length ? <Button disabled className="btn btn-dark">Enviar</Button> : <Button className="btn btn-dark" onClick={handleSubmit}>Enviar</Button>}
          <Button variant="warning" onClick={props.onHide}>Salir</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default QualifyAsTutorModal