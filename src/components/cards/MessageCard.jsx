import React, { useState, useEffect } from "react";
import { StyledCard } from "./Card.styled";
import { LikeBtn } from "../buttons/LikeBtn";
import styled from "styled-components";
import moment from "moment";

export const MessageCard = ({ setLikedThoughts, setUpdateMessages, id, hearts, createdAt, children, ...props }) => {

  const [timeAgo, setTimeAgo] = useState("");
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
    postLike(id);
    setLikedThoughts(prev => [...prev, id]);
  };

  const checkTimeAgoSubmitted = createdAt =>  moment(createdAt).fromNow();


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(checkTimeAgoSubmitted(createdAt));
    }, 60000);
  
    //prevent interval form keep running & clear from old value
    return () => clearInterval(interval);
  }, [createdAt]);

   /*--- POST like to API ---*/

   const postLike = async (id) => {
    const url = `https://happy-thoughts-api-4ful.onrender.com/thoughts/${id}/like`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //tell server it’s JSON
        }
      });
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
          <LikeBtn onClick={handleClick} active={isActive} />
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