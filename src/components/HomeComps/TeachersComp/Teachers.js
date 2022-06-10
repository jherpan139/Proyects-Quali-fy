import React from 'react'
import {UserContext} from '../../../helpers/AuthContext'
import getAllUsers from '../../../request/getAllUsers'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Teacher from './Teacher'
import getAllCourses from '../../../request/getAllCourses'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Add from '@mui/icons-material/AddCircleRounded'
import Delete from '@mui/icons-material/DeleteRounded'
import Modify from '@mui/icons-material/ChangeCircleRounded'
import CreateTeacherModal from './TeacherAction/CreateTeacher'

const listAllUsers = async (userToken) => {
  let usersArray = []
  await getAllUsers(userToken)
  .then((users) => {
    usersArray = usersArray.concat(users.data)
  })
  .catch((err) => console.log(err))
  return usersArray
}

const listAllCourses = async(userToken) => {
  let coursesArray = []
  await getAllCourses(userToken)
  .then((courses) => {
    coursesArray = coursesArray.concat(courses.data)
  })
  .catch((err) => console.log(err))
  return coursesArray
}

const AdminPanel = (props) => {
  return (
    <>
    <tr style={{borderBottom: '2px solid #FFFFFF'}}></tr>
    <tr>
      <th scope='col' colSpan={5} className='text-center'><h4>TEACHERS PANEL</h4></th>
    </tr>
    <tr>
        <th scope='col' colSpan={5} className='text-center'>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={() => props.showCreateTeacherModal(true)}><Add></Add></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Delete></Delete></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Modify></Modify></Button>
        </th> 
    </tr>
    </>
    )
}

const Teachers = () => {

  const findTeacher = (e) => {
    e.preventDefault()
    const request = e.currentTarget.value
    setTeacherName(request)
  }

  const { user } = React.useContext(UserContext) || JSON.parse(localStorage.getItem('user'))
  const [showCreateTeacherModal, setShowCreateTeacherModal] = React.useState(false)
  const [teachersList, setTeachersList] = React.useState([])
  const [coursesList, setCoursesList] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)
  const [teacherName, setTeacherName] = React.useState('')

  React.useEffect(async () => {
    const users = await listAllUsers(user.token)
    const courses = await listAllCourses(user.token)
    setTeachersList(users)
    setCoursesList(courses)
    setLoading(false)
  },[])

  if (isLoading){
    return (
      <Table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Email</th>
            <th scope="col">Cursos</th>
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
        placeholder="Busca un profesor por nombre o apellidos..."
        value={teacherName}
        onChange={findTeacher}
      />
    </Form.Group>
      </Form>
      <Table striped bordered hover variant="dark" style={{align:'center'}}>
    <thead>
    <tr>
      <th scope='col' colSpan={7}><h1 className='text-center'>LISTADO DE PROFESORES</h1></th>
    </tr>
      <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Email</th>
            <th scope="col">Cursos</th>
      </tr>
    </thead>
    <tbody>
      {teachersList && teachersList.map((teacherData) => {
              return <Teacher data={teacherData} user={user} courses={coursesList}></Teacher>
      })}

      {user && user.role === 'ADMIN' ? <AdminPanel showCreateTeacherModal={setShowCreateTeacherModal}></AdminPanel> : null}

    </tbody>
  </Table>

  <CreateTeacherModal
        show={showCreateTeacherModal}
        onHide={() => setShowCreateTeacherModal(false)}
        token={user.token}
        role={user.role}
    >
    </CreateTeacherModal>

  </>
    )
  }

export default Teachers