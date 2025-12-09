import React, { useState, useEffect } from "react";
import { FormCard } from "./cards/FormCard";
import { MessageCard } from "./cards/MessageCard";
import styled from "styled-components";
import { Loader } from "./Loader";


export const CardContainer = () => {

  const [messages, setMessages] = useState([]);
  const [updateMessages, setUpdateMessages] = useState(0); //for re-fetching data
  const [loading, setLoading] = useState(true);


  /*--- Fetch messages from API ---*/

  useEffect(() => {

    const fetchMessages = async () => {
      const url = `https://happy-thoughts-api-4ful.onrender.com/thoughts`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLoading(false);
        setMessages(data);
      }   
      catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMessages();
  },[updateMessages])

  
  return(
    <StyledCardContainer>
      <h1>Happy Thoughts</h1>
      <FormCard setUpdateMessages={setUpdateMessages} />
      {loading && <Loader />}
      {messages
        .slice() //copy array to not mutate the original for sorting
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((message, index) => 
        (<MessageCard 
          key={index} 
          createdAt={message.createdAt}
          id={message._id}
          hearts={message.hearts}
          setUpdateMessages={setUpdateMessages}
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