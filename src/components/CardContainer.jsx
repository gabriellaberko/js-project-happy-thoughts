import React, { useState } from "react";
import { FormCard } from "./cards/FormCard";
import { MessageCard } from "./cards/MessageCard";
import styled from "styled-components";


export const CardContainer = () => {

  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {  
    setMessages([...messages, message]);
  }
  
  return(
    <StyledCardContainer>
      <h1>Happy Thoughts</h1>
      <FormCard addMessage={addMessage} />
      {messages.map((message, index) => (<MessageCard key={index}>{message}</MessageCard>))}
    </StyledCardContainer>
  );
}


const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
`;