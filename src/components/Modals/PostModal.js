import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

const PostModal = (props) => {

  const { visible, openModal, userPosts, selectedRow } = props
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [resp, setResp] = useState()
  const selectedUserss = userPosts.filter(filtered => {
    return (
      filtered.id == selectedRow
    )
  })
  const [selectedData, setSelectedData] = useState(selectedUserss)

  const postData = (data) => {
    const addData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selectedData[0]?.userId, title: data?.title, body: data?.body })
    };
    fetch('https://reqres.in/api/posts', addData)
      .then(response => response.json())
      .then(res => setResp(res))
  }



  const putData = (data) => {
    const updatePost = {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: data?.title, body: data?.body })
    }
    fetch(`https://jsonplaceholder.typicode.com/posts/${selectedData[0].id}`, updatePost)
      .then(response => response.json())
      .then(res => setResp(res))
  }

  const onAddSubmit = (data) => {
    postData(data)
  }
  const onEditSubmit = (data) => {
    putData(data)
  }

  return (
    <>
      <Overlay></Overlay>
      <ModalConatiner visible={visible} >
        <Modalheader>{selectedRow > 0 ? "Edit Post" : "Add Post"} </Modalheader>
        <Title>{selectedRow > 0 ? "Edit Post" : "Add Post"}  </Title>
        <form onSubmit={selectedRow > 0 ? handleSubmit(onEditSubmit) : handleSubmit(onAddSubmit)} style={formStyle} >
          <ModalTitle>
            Title
            <ModalInput defaultValue={selectedData[0]?.title} {...register("title", { required: true })} type="input" name="title" />
            {errors.title?.type === 'required' && "First name is required"}
            {console.log("err", errors)}
          </ModalTitle>

          <ModalBody>
            Body
            <StyledTextarea defaultValue={selectedData[0]?.body} {...register("body", { required: true })} type="textarea" name="body" />
            {errors.body?.type === 'required' && "First name is required"}
          </ModalBody>
          <Buttons>
            <CancelButton onClick={openModal}> Cancel </CancelButton>
            <SaveButton type="submit"> Save </SaveButton>
          </Buttons>
        </form>
        <Pre>{JSON.stringify(resp, null, 2)}</Pre>
      </ModalConatiner>
    </>
  )
}


export default PostModal

const ModalConatiner = styled.div`
  width: 27rem;
  height: auto;
  display: flex;
  flex-direction: column;
  position: fixed;
  margin-bottom: 5rem;
  border:0.2rem solid black;
  align-items: center;
  background-color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
const Modalheader = styled.span`
  width: 100%;
  height: 1.5rem;
  text-align: left;
  margin: 0;
  display: flex;
  align-items: center;
  padding:0;
  border-bottom: 0.2rem solid black;
`
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0,50%);
  position: fixed;
  z-index: -1;
`
const Title = styled.h1`
  width:100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0 1rem 0;
  font-size: 1.5rem;
`
const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 1rem;
`
const ModalInput = styled.input`
  width: 80%;
  height: 1rem;
`
const ModalBody = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`
const StyledTextarea = styled.textarea`
  width: 80%;
  max-width: 17.4rem;
  height: 7rem;
`
const Buttons = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 1.5rem 1rem ;
`
const CancelButton = styled.button`
  width: 7rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  box-shadow: 0.3rem 0.2rem 0.3rem black;
  &:active {
    background-color: #fa2a4d;
    color: white;
  }
`
const SaveButton = styled.button`
  width: 7rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0.3rem 0.2rem 0.3rem black;
  &:active {
    background-color: #075394;
    color: white;
  }
`
const formStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}

const Pre = styled.pre`
  width: 80%;
  height: fit-content;
  text-align:left;
  white-space:pre-wrap;
`