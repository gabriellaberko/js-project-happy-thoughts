import React, { useState, useEffect } from "react";
import { StyledCard } from "./Card.styled";
import { LikeBtn } from "../buttons/LikeBtn";
import styled from "styled-components";
import moment from "moment";

export const MessageCard = ({ createdAt, children, ...props }) => {

  const [timeAgo, setTimeAgo] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setLikeCount(prev => prev +1);
    setIsActive(true);
  }

  const checkTimeAgoSubmitted = createdAt =>  moment(createdAt).fromNow();


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(checkTimeAgoSubmitted(createdAt));
    }, 60000);
  
    //prevent interval form keep running & clear from old value
    return () => clearInterval(interval);
  }, [createdAt]);

  

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