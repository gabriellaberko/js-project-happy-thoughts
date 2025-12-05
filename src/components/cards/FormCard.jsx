import React, { useState } from "react";
import { SubmitBtn } from "../buttons/SubmitBtn";
import { StyledFormCard, StyledInput, StyledWrapper, StyledErrorMessage } from "./Card.styled";
import { WordCount } from "./WordCount";


export const FormCard = ({ addMessage, ...props }) => {

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(checkIfWithinWordLimit()) {
      setError(false);
      addMessage(message); //pass the message to the function in CardContainer
      setMessage(""); //reset on submit
    } else {
      setError(true);
    }
  }


  const handleInputChange = (e) => setMessage(e.target.value);


  const checkIfWithinWordLimit = () => message.length >= 1 && message.length <= 140;


  return (
    <StyledFormCard as="form" onSubmit ={handleSubmit}>
      <StyledWrapper>
      <h2>What's making you happy right now?</h2> 
        <StyledInput 
          type="text" 
          placeholder="Share a happy thought..." 
          value={message}
          onChange={handleInputChange}
        />
        <WordCount message={message} />
        {error && 
          <StyledErrorMessage>
            <p><strong>⚠️ Error:</strong> The message must be between 1 and 140 characters.</p></StyledErrorMessage>
        }
      </StyledWrapper>
      <SubmitBtn>
        Send Happy Thought
      </SubmitBtn>
    </StyledFormCard>
  );
}