import React from 'react'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { UserContext } from '../../helpers/AuthContext'
import getCourseTeachers from '../../request/getCourseTeachers'
import getAllCourses from '../../request/getAllCourses'

const getMyCourses = async (token, idUser) => {
  let mycourses = []
  await getCourseTeachers(token, idUser)
  .then((resp) => mycourses = mycourses.concat(resp.data))
  .catch((err) => console.log(err))

  let courses = []
  await getAllCourses(token)
  .then((course) => courses = courses.concat(course.data))
  .catch((err) => console.log(err))

  let userCoursesData = []
  if (courses.length>0){
    for (let i = 0; i<mycourses.length;i++){
      for (let j = 0; j<courses.length;j++){
      if (mycourses[i].idCourse === courses[j].idCourse){
        userCoursesData = userCoursesData.concat(courses[j])
      }
    }
    }
  }
  return userCoursesData
}

const HomeUserMenu = () => {

  React.useEffect(async () => {
    const courses = await getMyCourses(user.token, user.idUser)
    setCoursesList(courses)

  },[])

  const { user } = React.useContext(UserContext)
  const [coursesList, setCoursesList] = React.useState([])
  const [selectedValue, setSelectedValue] = React.useState('')

  return (
    <Container fluid>
  <Card>
    <Card.Body>
    <h1 className='text-center'>Perfil de {user.name+' '+user.surnames}</h1>
      <Card.Text className='text-center'>
        Bienvenid@ a tu perfil.
        Aquí puedes ver tanto tus cursos como alumnos
      </Card.Text>
      <Form>
        <Form.Group className="mb-3">
        <Form.Label>Mis cursos</Form.Label>
      <Form.Select
       onFocusCapture={(e) => setSelectedValue(e.target.value)}
       onChange={(e) => setSelectedValue(e.target.value)}
       >
         <optgroup label='Cursos'></optgroup>
        {coursesList.map((course) => {
          return <option value={course.name}>{course.name}</option>
        })}
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <div className='d-flex justify-content-center'>
          {selectedValue !== '' ?  <Button variant='warning'>Ver alumnos de {selectedValue}</Button> : null}
       
        </div>
      </Form.Group>
      </Form>
    </Card.Body>
  </Card>
    </Container>
  )
}

export default HomeUserMenu