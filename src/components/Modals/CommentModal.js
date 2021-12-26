import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

const CommentModal = (props) => {

  const { visible, openModal } = props
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [resp, setResp] = useState()

  const postData = (data) => {
    const addData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: data?.name, email: data?.email, body: data?.body })
    };
    fetch('https://reqres.in/api/posts', addData)
      .then(response => response.json())
      .then(res => setResp(res))
  }

  const onAddSubmit = (data) => {
    postData(data)
  }

  return (
    <>
      <Overlay></Overlay>
      <ModalConatiner visible={visible} >
        <Modalheader>Add Comment </Modalheader>
        <Title>Add Comment </Title>
        <form onSubmit={handleSubmit(onAddSubmit)} style={formStyle} >

          <Input>
            Name
            <ModalInput {...register("name", { required: true })} type="input" name="name" />
          </Input>


          <Input>
            Email
            <ModalInput {...register("email", {
              required: true, pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
            })} type="input" name="email" />
            <ErrorMessage  >{errors.email?.type === 'pattern' && "invalid email address"}</ErrorMessage>
          </Input>


          <ModalBody>
            Body
            <StyledTextarea {...register("body", { required: true })} type="textarea" name="body" />
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

export default CommentModal
 
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
const Input = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 1rem;
  position: relative;
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
const ErrorMessage = styled.div`
 width: 100%;
 height: 1rem;
 display: flex;
 justify-content: center;
 align-items: center;
 position: absolute;
 top:-90%;
 left:32%;
 color:red;
 font-size: 0.8rem;
`