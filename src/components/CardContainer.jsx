import React, { useState, useEffect } from "react";
import { FormCard } from "./cards/FormCard";
import { MessageCard } from "./cards/MessageCard";
import styled from "styled-components";


export const CardContainer = () => {

  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {  
    setMessages([...messages, { message: message, createdAt: new Date() }]);
  }

  useEffect(() => {

    const fetchMessages = async () => {

      const url = `https://happy-thoughts-api-5hw3.onrender.com/thoughts`;
    
      try {
    
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        const fetchedThoughts = data.thoughts;
        console.log(fetchedThoughts);
        setMessages(fetchedThoughts);;
      }
    
      catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchMessages();
  },[])

  
  return(
    <StyledCardContainer>
      <h1>Happy Thoughts</h1>
      <FormCard addMessage={addMessage} />
      {messages
        .slice() //copy array to not mutate original array
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((message, index) => 
        (<MessageCard 
          key={index} 
          createdAt={message.createdAt}
          >
            {message.message}
        </MessageCard>
       ))}
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