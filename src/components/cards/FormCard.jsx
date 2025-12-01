import React, { useState } from "react";
import { SubmitBtn } from "../buttons/SubmitBtn";
import { StyledFormCard, StyledInput } from "./Card.styled";

export const FormCard = ({ children, ...props }) => {

  const [message, setMessage] = useState("");

  return (
    <StyledFormCard onSubmit = {(e) => e.preventDefault()}>
      <h2>What is making you happy right now?</h2> 
        <StyledInput 
          type="text" 
          placeholder="Share a happy thought..." 
          value = {message}
          onChange = {(e) => setMessage(e.target.value)}
        />
      <SubmitBtn>
        Send Happy Thought
      </SubmitBtn>
    </StyledFormCard>
  );
}