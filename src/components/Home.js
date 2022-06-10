import React from 'react'
import Header from './HomeComps/Header'
import HomeRouter from "./HomeComps/HomeRouter"
import Container from "react-bootstrap/Container"


const Home = ({ user }) => {
  
  return (
    <>
      <Header></Header>
      <Container style={{ width: "80%"}}>
      <HomeRouter></HomeRouter>
      </Container>
      </>
    
  )
}

export default Home