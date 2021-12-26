import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AddIcon from '../components/icons/AddIcon';
import BackIcon from '../components/icons/BackIcon';
import PostModal from '../components/Modals/PostModal';
import AllPosts from '../components/PageComponents/AllPosts';

const UserDetail = (props) => {


  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [selected, setSelected] = useState(null)

  const history = useHistory()
  const { id } = useParams();

  useEffect(() => {
    fetchUser()
    fetchPosts()
  }, [])

  const fetchUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(res => setUser(res))
  }

  const fetchPosts = () => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(res => setPosts(res))
      .catch((error) => {
        console.log(error)
      })
    setLoading(false)
  }

  const openModal = (id) => {
    setSelected(id)
    setModalVisible(!modalVisible)
  }



  const userPosts = posts.filter((post) => {
    return post.userId === parseInt(id)
  })

  return (
    <DetailContainer>
      <Alert>ATTENTION <br></br>
      These data come from JsonPlaceholder services that is why after create, update and delete operations data not reflected in view. You can see changed data below the modal after create, delete or update.
      </Alert>
      <Nav>
        <Back onClick={() => history.goBack()}>
          <BackIcon /> Back
        </Back>
        <UserName>{user.name}</UserName>
        <Add onClick={() => setModalVisible(true)}>
          <AddIcon />
        </Add>
      </Nav>

      <AllPosts
        userPost={userPosts}
        id={id}
        history={history}
        openModal={openModal}
        selectedRow={selected}
      />

      {modalVisible &&
        <PostModal
          visible={modalVisible}
          openModal={openModal}
          userPosts={userPosts}
          selectedRow={selected}
        />
      }

    </DetailContainer>
  )
}

export default UserDetail

const DetailContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 86%;
  height: 5rem;
  margin: 5rem 0;
`
const Back = styled.div`
  width: 6rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #075394;
`
const Add = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

`
const UserName = styled.h2`
  font-size: 2rem;
`
const Alert = styled.span`
 color:red;
 font-size:1rem;
 position absolute;
 top:22%;
 text-align:center;
 width:55%
`