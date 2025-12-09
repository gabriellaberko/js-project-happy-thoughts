import React, { useState, useEffect } from "react";
import { FormCard } from "./cards/FormCard";
import { MessageCard } from "./cards/MessageCard";
import styled from "styled-components";
import { Loader } from "./Loader";


export const CardContainer = () => {

  const [messages, setMessages] = useState([]);
  const [updateMessages, setUpdateMessages] = useState(0); //for re-fetching data
  const [loading, setLoading] = useState(true);
  const [likedThoughts, setLikedThoughts] = useState(() => {
    return JSON.parse(localStorage.getItem("likedThoughts")) || [];
  });

  //sync the likes to local storage whenever likedThoughts is changing
  useEffect(() => {
    localStorage.setItem("likedThoughts", JSON.stringify(likedThoughts));
  }, [likedThoughts]);


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
    <StyledWrapper>
            <h1>Happy Thoughts</h1>
      {likedThoughts.length > 0 && (
          <StyledText>
            You've liked {likedThoughts.length}{" "}
            {likedThoughts.length === 1 ? "post" : "posts"}.
            <br></br>
            Keep up the good work of spreading happiness!
          </StyledText>
      )}
    <StyledCardContainer>
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
          likedThoughts={likedThoughts}
          setLikedThoughts={setLikedThoughts}
          >
            {message.message}
        </MessageCard>
       ))}
    </StyledCardContainer>
    </StyledWrapper>
  );
}

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;

  @media ${(props) => props.theme.media.tablet}  {
    width: 70%;
  }
  @media ${(props) => props.theme.media.desktop}  {
    width: 50%;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledText = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.main.secondaryText}
`;

