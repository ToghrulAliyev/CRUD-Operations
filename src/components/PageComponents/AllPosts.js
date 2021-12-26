import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import RightArrowIcon from '../icons/RightArrowIcon'
import TrashIcon from '../icons/TrashIcon'
import DeleteModal from '../Modals/DeleteModal'

const AllPosts = ({ userPost, history, id, openModal, selectedRow }) => {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [selectedPost,setSelectedPost]=useState()
    
    
    const openDeleteModal = (id) => {
         setSelectedPost(id)
        setDeleteModalVisible(!deleteModalVisible)
    }

    return (
        <PostContainer>
            {userPost.length > 0 && userPost.map(post => {
                return (
                    <Posts data-tip data-for="registerTip" onDoubleClick={() => openModal(post.id)}>
                        <TitleContainer>
                            <Delete onClick={()=>openDeleteModal(post.id)} > <TrashIcon /> </Delete>
                            <PostTitle>{post.title}</PostTitle>
                        </TitleContainer>
                        <PostContent onClick={() => history.push(`/user/detail/${id}/${post.id}`)}> <RightArrowIcon /></PostContent>
                        <ReactTooltip id="registerTip" place="top" effect="solid" >double-click to edit</ReactTooltip>
                    </Posts>

                )
            })}
            {deleteModalVisible &&
                <DeleteModal
                    visible={deleteModalVisible}
                    openModal={openDeleteModal}
                    userPost={userPost}
                    selectedRow={selectedPost}
                />
            }
        </PostContainer>
    )
}

export default AllPosts


const PostContainer = styled.div`
  width: 86%;
  height: 50rem;
  position: relative;
  bottom: 4%;
  overflow-y: auto;
  justify-content: space-between;
  border: 0.1rem solid black;
  margin: 0 0 2rem 0;
 ::-webkit-scrollbar {
  background: #E5DDD5
} 
 ::-webkit-scrollbar-thumb {
  background:  #075394;
  border-radius: 6px; 
  border: 1px solid #075394;
}
 ::-webkit-scrollbar-track {
  background: rgba(7, 83, 148, 0.5);
}
`
const Posts = styled.div`
  width: 95%;
  height: 4rem;
  margin: 1rem;
  border: 0.2rem solid black;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.5rem 0.3rem 1rem;
  justify-content: space-between;
`
const Delete = styled.div`
 width: 3rem;
 height: 3rem;
 display: flex;
 justify-content: center;
 align-items: center;
 cursor: pointer;
`
const PostTitle = styled.p`
  margin: 0 0 0 1.2rem;
  font-size: 1.2rem;
`
const PostContent = styled.div`
 width: 3rem;
 height: 3rem;
 display: flex;
 justify-content: center;
 align-items: center;
 cursor: pointer;
`
const TitleContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`