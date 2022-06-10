import React from 'react'
import {UserContext} from '../../../helpers/AuthContext'
import getAllStudents from '../../../request/getAllStudents'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Student from './Student'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Add from '@mui/icons-material/AddCircleRounded'
import Delete from '@mui/icons-material/DeleteRounded'
import Modify from '@mui/icons-material/ChangeCircleRounded'
import CreateStudentModal from './StudentAction/CreateStudent'

const listAllStudents = async (userToken) => {
  let studentsArray = []
  await getAllStudents(userToken)
  .then((students) => {
    studentsArray = studentsArray.concat(students.data)
  })
  .catch((err) => console.log(err))
  return studentsArray
}

const AdminPanel = (props) => {
  return (
    <>
    <tr style={{borderBottom: '2px solid #FFFFFF'}}></tr>
    <tr>
      <th scope='col' colSpan={7} className='text-center'><h4>STUDENT PANEL</h4></th>
    </tr>
    <tr>
        <th scope='col' colSpan={7} className='text-center'>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={() => props.setCreateStudentModal(true)}><Add></Add></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Delete></Delete></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Modify></Modify></Button>
        </th> 
    </tr>
    </>
    )
}

const Qualify = () => {

  const findStudent = (e) => {
    e.preventDefault()
    const request = e.currentTarget.value
    setStudentName(request)
  }

  const [ createStudentModal, setCreateStudentModal] = React.useState(false)
  const { user } = React.useContext(UserContext) || JSON.parse(localStorage.getItem('user'))
  const [studentsList, setStudentsList] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)
  const [studentName, setStudentName] = React.useState('')

  React.useEffect(async () => {
    const students = await listAllStudents(user.token)
    setStudentsList(students)
    setLoading(false)
  },[])

  if (isLoading){
    return (
      <Table className="table table-dark" f>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">DNI</th>
            <th scope="col">Email</th>
            <th scope="col">Curso</th>
            <th scope="col">Calificar</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td scope="row"><Spinner></Spinner></td>
            <td><Spinner></Spinner></td>
            <td><Spinner></Spinner></td>
            <td><Spinner></Spinner></td>
          </tr>
        </tbody>
      </Table>
    )
    }
    return (
      <>
      <Form >
      <Form.Group className="mb-3">
      <Form.Control
      style={{ backgroundColor: 'black', color: 'whitesmoke'}}
        type="text"
        placeholder="Busca un alumno por nombre o DNI..."
        value={studentName}
        onChange={findStudent}
      />
    </Form.Group>
      </Form>
      <Table striped bordered hover variant="dark" style={{align:'center'}}>
    <thead>
    <tr>
      <th scope='col' colSpan={7}><h1 className='text-center'>LISTADO DE ESTUDIANTES</h1></th>
    </tr>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellidos</th>
        <th scope="col">DNI</th>
        <th scope="col">Email</th>
        <th scope="col">Curso</th>
        <th scope="col">Calificar</th>
      </tr>
    </thead>
    <tbody>
      {studentsList && studentsList.map((studentData) => {
              return <Student data={studentData} user={user}></Student>
      })}

      {user && user.role === 'ADMIN' ? <AdminPanel setCreateStudentModal={setCreateStudentModal}></AdminPanel> : null}

    </tbody>
  </Table>

    <CreateStudentModal
        show={createStudentModal}
        onHide={() => setCreateStudentModal(false)}
        token={user.token}
    >
    </CreateStudentModal>
  </>
    )
  }

export default Qualify