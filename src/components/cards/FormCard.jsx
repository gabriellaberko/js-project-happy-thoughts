import React, { useState } from "react";
import { SubmitBtn } from "../buttons/SubmitBtn";
import { StyledFormCard, StyledInput } from "./Card.styled";
import styled from "styled-components";


export const FormCard = ({ addMessage, ...props }) => {

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(message); // to pass up the message to parent (CardContainer)
    setMessage(""); //reset on submit
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  }

  return (
    <StyledFormCard as="form" onSubmit = {handleSubmit}>
      <StyledWrapper>
      <h2>What is making you happy right now?</h2> 
        <StyledInput 
          type="text" 
          placeholder="Share a happy thought..." 
          value = {message}
          onChange = {handleInputChange}
        />
      </StyledWrapper>
      <SubmitBtn>
        Send Happy Thought
      </SubmitBtn>
    </StyledFormCard>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;