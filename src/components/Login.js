import * as React from 'react';

import { UserContext } from '../helpers/AuthContext';
import loginAndVerify from '../helpers/loginAndVerify';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Error from '@mui/icons-material/ReportGmailerrorred';

const ErrorAlert = (props) => {
  return (
    <>
    <Modal {...props} style={{display: 'flex', justifyContent: 'center'}} enforceFocus show={props.show} onHide={() => {
      props.setError(false)
    }}>
        <Modal.Body style={{backgroundColor: 'black',color:'red', justifyContent: 'center', fontSize: '18px'}}>Correo electrónico o contraseña incorrecta!
          <Error style={{float: 'right'}}></Error>
        </Modal.Body>
      </Modal>
    </>
  )
}

const Login = () => {

  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(false)

  const navigate = useNavigate()
  const { setUser } = React.useContext(UserContext)

  const validateEmail = (email) => {
    return String(email).toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await loginAndVerify(email, password).then((res) => {
      if (res){
      setError(false)
      setUser(res.user)
      localStorage.setItem('user', JSON.stringify(res.user))
      console.log(JSON.parse(localStorage.getItem('user')))
      console.log(res.user)
      navigate("/home", {replace: true})
      } else {
        setError(true)
      }

    })
  
  };

  return (
    <>
    <Container className='container h-100 boxLogin' style={{boxShadow: '0 6px 6px hsl(0deg 0% 0% / 0.3)', width: '20%', minWidth:'fit-content'}}>
    <Form>
    <h3>Entra a tu cuenta</h3>
    <Form.Group className="mb-3">
      <Form.Label>Correo electrónico</Form.Label>
      <Form.Control
        type="email"
        placeholder="Email"
        value={email}
        isInvalid={!validateEmail(email)}
        isValid={validateEmail(email)}
        onChange={(e) => {setEmail(e.target.value)}}
      />
      <Form.Control.Feedback type='invalid'>
        Introduce un correo electrónico válido.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Contraseña</Form.Label>
      <Form.Control
        type="password"
        placeholder="Contraseña"
        value={password}
        isInvalid={password.length<8}
        isValid={password.length>=8}
        onChange={(e) => {setPassword(e.target.value)}}
      />
      <Form.Control.Feedback type='invalid'>
        La contraseña debe ser mayor o igual a 8 caracteres
      </Form.Control.Feedback>
    </Form.Group>
    <div className="d-grid">
      <Button type="submit" className="btn btn-dark" onClick={handleSubmit}>
        Entrar
      </Button>
    </div>
    <Form.Text className="forgot-password text-right" style={{float:'right', marginBottom: 10}}>
      Forgot <Link to="/">password?</Link>
    </Form.Text>
  </Form>
  </Container>
  <ErrorAlert show={error} setError={setError}></ErrorAlert>
  </>
  ) 
}

export default Login