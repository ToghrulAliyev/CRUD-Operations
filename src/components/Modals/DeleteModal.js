import { useState } from 'react'
import styled from 'styled-components'

const DeleteModal = (props) => {

    const { visible, openModal, selectedRow } = props
    const [response,setResponse]=useState("")

    const deleteModal =()=>{
      fetch(`https://jsonplaceholder.typicode.com/posts/${selectedRow}`, { method: 'DELETE' })
      .then((res) => {
        res.status == 200 ? setResponse("Deleted Succesfully") : setResponse("Something went wrong")
      });
    }

    return (
        <>
            <Overlay></Overlay>
            <ModalConatiner visible={visible} >
                <Modalheader> Delete Post </Modalheader>
                <Title> Are you sure to delete the post with id {selectedRow}? </Title>
                <Buttons>
                    <CancelButton onClick={openModal}> Cancel </CancelButton>
                    <DeleteButton onClick={deleteModal}> Delete </DeleteButton>
                </Buttons>
                 <StatusMessage>{response}</StatusMessage>
            </ModalConatiner>
        </>
    )
}


export default DeleteModal

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
  font-size: 1.2rem;
`

const Buttons = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
const DeleteButton = styled.button`
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
const StatusMessage = styled.div`
  width: 90%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem 1rem 1rem;
`