import React, { useState, useEffect } from "react";
import { StyledCard } from "./Card.styled";
import { LikeBtn } from "../buttons/LikeBtn";
import styled from "styled-components";

export const MessageCard = ({ submitTime, children, ...props }) => {

  const [timeAgo, setTimeAgo] = useState("");
  const [likeCount, setLikeCount] = useState(0);

  const incrementLikes = () => {
    setLikeCount(prev => prev +1);
  }

  const checkTimeAgoSubmitted = (submitTime) => {
    const timeNow = new Date();
    const diffInSeconds = Math.floor((timeNow - submitTime) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // return the right time format (minutes/hours/days)  
    if (diffInMinutes < 1) {
      return `0 minutes ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(checkTimeAgoSubmitted(submitTime));
    }, 60000);
  
    //prevent interval form keep running & clear from old value
    return () => clearInterval(interval);
  }, [submitTime]);

  

  return (
    <StyledCard>
      {children}
      <StyledBottomWrapper>
        <StyledLikeWrapper>
          <LikeBtn onClick={incrementLikes}/>
          <p>x {likeCount}</p>
        </StyledLikeWrapper>
        <p>{checkTimeAgoSubmitted(submitTime)}</p>
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