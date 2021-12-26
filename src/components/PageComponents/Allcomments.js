import React from 'react'
import styled from 'styled-components'

const Allcomments = ({showhide,userComment }) => {

    return (
            <AllComment>
                {showhide && userComment.length > 0 && userComment.map(comments => {
                    return (
                        <Commnets>
                            <CommentHeader>
                                <CommentTitle>{comments.name}</CommentTitle>
                                <CommentEmail>{comments.email}</CommentEmail>
                            </CommentHeader>
                            <CommnetsBody>
                                {comments.body}
                            </CommnetsBody>
                        </Commnets>
                    )
                })}
            </AllComment>
    )
}

export default Allcomments
const AllComment = styled.div`
  width: 90%;
  height: auto;
  min-height: 15rem;
  transition: opacity 1s ease;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* display: ${(props) => (props.showComments ? "none" : "flex")}; */
`
const Commnets = styled.div`
  width: 100%;
  height: fit-content;
  border: 0.2rem solid black;
  display: flex;
  flex-direction:column;
  margin: 1rem 0;
 

`
const CommentHeader = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CommentTitle = styled.h2`
  font-size: 1.2rem;
  margin: 1rem 0 0 1rem;
`
const CommentEmail = styled.span`
  font-size: 1.2rem;
  text-decoration: underline #075394;
  color: #075394;
  margin: 1rem 1rem 0 0;
`
const CommnetsBody = styled.p`
  text-align: left;
  font-size: 1.2rem;
  margin: 1rem
`