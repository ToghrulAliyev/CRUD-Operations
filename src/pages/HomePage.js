import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MyLoader from '../components/loader/MyLoader';

const HomePage = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    fetchData() 
  }, [])

  const fetchData = async () => {
    setLoading(true);
    await fetch('https://jsonplaceholder.typicode.com/users')

      .then(res => res.json())
      .then(res => {
        setUsers(res)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
 
  return (
    <>
      {
        loading ? <div> <MyLoader /> </div>
          :
          <Container>
            {users.map(user => {
              return (
                <Box key={user.id}>
                  <Title>
                    {user.name}
                  </Title>
                  <Contact>
                    <Link to={'/direct'} style={linkStyle}>{user.email}</Link>
                    <Link style={linkStyle}>{user.phone}</Link>
                    <Link style={linkStyle}>{user.website}</Link>
                  </Contact>
                  <Company>
                    <CompanyName>{user.company.name}</CompanyName>
                    <CatchPhrase>{user.company.catchPhrase}</CatchPhrase>
                    <CompanyBs>{user.company.bs}</CompanyBs>
                  </Company>
                  <DetailButton onClick={() => history.push('/user/detail/' + user.id)} >
                    Details
                  </DetailButton>
                </Box>
              )
            })
            }
          </Container>
      }
    </>
  )
}

export default HomePage
const Container = styled.div`
  display: flex;
  width: 100vw;
  margin: 5rem 1rem 1rem 1rem;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`
const Box = styled.div`
  width: 24rem;
  height: 28rem;
  border: 0.2rem solid darkblue;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
`;
const Title = styled.h1`
  font-size: 1.5rem;
`
const Contact = styled.div`
  display: flex;
  flex-direction: column;
`
const Company = styled.div`
  font-size: 1.2rem;
`
const CompanyName = styled.h3`
  margin: 0;
  font-weight:normal;
`
const CatchPhrase = styled.p`
  margin: 0;
`
const CompanyBs = styled.span`
  margin: 0;
  font-weight: bold;
`

const DetailButton = styled.button`
  width: 14rem;
  height: 5rem;
  border: 0.2rem solid darkblue; 
  position: relative;
  transform: translate(35%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0.3rem 0.2rem 0.3rem black;
  font-size: 1.5rem;
  cursor: pointer;
  &:active {
    background-color: #075394;
    color: white;
  }
`
const linkStyle = {
  color: 'blue',
  fontSize: '1.2rem'
};