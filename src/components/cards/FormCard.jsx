import React, { useState } from "react";
import { SubmitBtn } from "../buttons/SubmitBtn";
import { StyledFormCard, StyledInput } from "./Card.styled";


export const FormCard = ({ children, ...props }) => {

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
  }
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  }

  return (
    <StyledFormCard as="form" onSubmit = {handleSubmit}>
      <h2>What is making you happy right now?</h2> 
        <StyledInput 
          type="text" 
          placeholder="Share a happy thought..." 
          value = {message}
          onChange = {handleInputChange}
        />
      <SubmitBtn>
        Send Happy Thought
      </SubmitBtn>
    </StyledFormCard>
  );
}