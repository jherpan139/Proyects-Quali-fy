import React from 'react'
import { UserContext } from '../../../helpers/AuthContext'
import getAllCourses from '../../../request/getAllCourses'
import Course from './Course'
import Cached from '@mui/icons-material/Cached'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Add from '@mui/icons-material/AddCircleRounded'
import Delete from '@mui/icons-material/DeleteRounded'
import Modify from '@mui/icons-material/ChangeCircleRounded'
import getTeachersOfCourses from '../../../request/getTeachersOfCourses'
import CreateCourseModal from './CourseActions/CreateCourse'

const AdminPanel = (props) => {
  return (
    <>
    <tr style={{borderBottom: '2px solid #FFFFFF'}}></tr>
    <tr>
      <th scope='col' colSpan={4} className='text-center'><h4>COURSES PANEL</h4></th>
    </tr>
    <tr>
        <th scope='col' colSpan={4} className='text-center'>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={() => props.setCreateCourseModal(true)}><Add></Add></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Delete></Delete></Button>
          <Button style={{ backgroundColor: 'transparent', border: 'none' }}><Modify></Modify></Button>
        </th> 
    </tr>
    </>
    )
}

const Courses = () => {

  const listAllCourses = async (userToken) => {
    let coursesArray = []
    await getAllCourses(userToken)
    .then((courses) => {
      coursesArray = coursesArray.concat(courses.data)
    })
    .catch((err) => console.log(err))
    setCoursesList(coursesArray)
  }

  const { user } = React.useContext(UserContext)
  const [coursesList, setCoursesList] = React.useState([])
  const [createCourseModal, setCreateCourseModal] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    listAllCourses(user.token)
    setLoading(false)
  },[])

  if (isLoading){
  return (
    <Table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Curso</th>
          <th scope="col">Alumnos</th>
          <th scope="col">Profesores</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <td scope="row"><Cached></Cached></td>
          <td><Cached></Cached></td>
          <td><Cached></Cached></td>
          <td><Cached></Cached></td>
        </tr>
      </tbody>
    </Table>
  )
  }
  return (
    <>
    <Table striped bordered hover variant="dark" style={{align:'center'}}>
      <thead>
        <tr>
          <th scope='col' colSpan={4}><h1 className='text-center'>LISTADO DE CURSOS</h1></th>
        </tr>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Curso</th>
          <th scope="col">Alumnos</th>
          <th scope="col">Profesores</th>
        </tr>
      </thead>
      <tbody>
        {coursesList && coursesList.map((courseData) => {
                return <Course data={courseData} user={user} token={user.token}></Course>
        })}
    

        {user && user.role === 'ADMIN' ? <AdminPanel setCreateCourseModal={setCreateCourseModal}></AdminPanel> : null} 

      </tbody>
    </Table>

    <CreateCourseModal
        show={createCourseModal}
        onHide={() => setCreateCourseModal(false)}
        token={user.token}
    >
    </CreateCourseModal>
</>
  )
}

export default Courses