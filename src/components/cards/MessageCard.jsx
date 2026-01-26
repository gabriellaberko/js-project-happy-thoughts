import React, { useState, useEffect } from "react";
import { StyledCard } from "./Card.styled";
import { LikeBtn } from "../buttons/LikeBtn";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);

export const MessageCard = ({ likedThoughts, setLikedThoughts, setUpdateMessages, id, hearts, createdAt, children }) => {

  const [likeCount, setLikeCount] = useState(hearts);
  const [isActive, setIsActive] = useState(hearts>=1 ? true : false);

  //sync with the hearts prop when it changes (when new card is posted)
  useEffect(() => {
    setLikeCount(hearts);
    setIsActive(hearts >= 1);
  }, [hearts]);
  

  const handleClick = () => {
    setLikeCount(prev => prev +1);
    setIsActive(true);
    updateLike(id);
    if (likedThoughts &&!likedThoughts.includes(id)) {
      setLikedThoughts(prev => [...prev, id]);
    } 
  };

  const checkTimeAgoSubmitted = createdAt => dayjs(createdAt).fromNow();


  useEffect(() => {
    const interval = setInterval(() => {
      checkTimeAgoSubmitted(createdAt);
      setUpdateMessages(prev => prev + 1); //trigger re-fetch of data
    }, 60000);
  
    //prevent interval form keep running & clear from old value
    return () => clearInterval(interval);
  }, [createdAt, setUpdateMessages]);

  
   /*--- Update (PATCH) like count to API ---*/

   const updateLike = async (id) => {
    const url = `https://js-project-api-wdi2.onrender.com/thoughts/id/${id}/like`;
    console.log(hearts);
    try {
      const response = await fetch(url, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json", //tell server it’s JSON
        },
        body: JSON.stringify({
          hearts: hearts + 1
        })
      });
      console.log(response.body)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Server response:", data);
      setUpdateMessages(prev => prev + 1); // to trigger a re-fetch of data after sending a like to the API
    }
    catch(error) {
      console.error("Sending error:", error);
    }
  };

  return (
    <StyledCard>
      {children}
      <StyledBottomWrapper>
        <StyledLikeWrapper>
          <LikeBtn onClick={handleClick} $active={isActive} />
          <p>x {likeCount}</p>
        </StyledLikeWrapper>
        <p>{checkTimeAgoSubmitted(createdAt)}</p>
      </StyledBottomWrapper>
    </StyledCard>
  );
}

const StyledLikeWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: ${(props => props.theme.colors.main.secondaryText)}
`;