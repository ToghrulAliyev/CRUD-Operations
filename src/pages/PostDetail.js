import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'
import BackIcon from '../components/icons/BackIcon'
import CommentModal from '../components/Modals/CommentModal'
 import Allcomments from '../components/PageComponents/Allcomments'

const PostDetail = (props) => {
  const history = useHistory()
  const { id, userId } = useParams();
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState({})
  const [user, setUser] = useState({})
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

 
  useEffect(() => {
    fetchUser();
    fetchPosts()
    fetchComments()
  }, [])

  const openModal = (id) => {
    setModalVisible(!modalVisible)
  }

  const fetchComments = async () => {
    await fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(res => {
        setComments(res)
      })
      .catch(err => alert("Something went wrong"))
  }

  const fetchUser = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(res => setUser(res))
  }
  
  const fetchPosts = async () => {
    setLoading(true)
    await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
      .then(res => res.json())
      .then(res => setPosts(res))
      .catch((error) => {
        console.log(error)
      })
    setLoading(false)
  }
  const userComment = comments.filter(comment => {
    return comment.postId == id
  })

  return (
    <Container>
      <Content>
        <Nav>
          <Back onClick={() => history.goBack()}>
            <BackIcon /> Back
          </Back>
          <UserName>{user.name}</UserName>
        </Nav>
        <Post>
          <Header>
            {posts.title}
          </Header>
          <ParagraphBody>
            {/* {posts.body} */}
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
            All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
          </ParagraphBody>
          <CommentToggle >
            <ShowComment onClick={() => setShowComments(!showComments)}>{showComments ? "Hide Comments" : "Show Comments"}</ShowComment>
            {showComments &&
              <AddComment onClick={openModal} >Add Comment</AddComment>
            }
          </CommentToggle>
          <Allcomments showhide={showComments} userComment={userComment} />

        </Post>
      </Content>

      {modalVisible &&
        <CommentModal
          visible={modalVisible}
          openModal={openModal}
         
         
        />
      }
    </Container>
  )
}

export default PostDetail


const Container = styled.div`
  height: auto; 
  display: flex;
  justify-content: center;
  `
const Content = styled.div`
  
  width: 80%;
  height: 100%; 
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  `
const Back = styled.div`
  width: 6rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #075394;
  `
const UserName = styled.h2`
  font-size: 2rem;
  position: absolute;
  left: 42%;
  
`
const Nav = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  position: relative;
  margin-top: 5rem;
`
const Post = styled.div`
  width: 100%;
  height: 80%; 
  display: flex;
  align-items: center;
  flex-direction: column;
`
const Header = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  width: 90%;
  height: 2rem; 
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
`
const ParagraphBody = styled.p`
  width: 90%;
  height: fit-content; 
  text-align: left;
  font-size: 1.3rem;
  margin: 0;
`
const CommentToggle = styled.div`
  width: 90%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #075394;
  font-size: 1rem;
  margin: 0.5rem 0;
`
const ShowComment = styled.div`
  text-decoration: underline #075394; 
  cursor: pointer;
  &:hover{
      color: blue;
  }
`
const AddComment = styled.div`
  text-decoration: underline #075394;
  cursor: pointer;
  &:hover{
      color: blue;
  }
`