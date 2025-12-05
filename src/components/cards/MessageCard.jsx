import React, { useState } from "react";
import { StyledCard } from "./Card.styled";
import { LikeBtn } from "../buttons/LikeBtn";
import styled from "styled-components";

export const MessageCard = ({ children, ...props }) => {

  const [likeCount, setLikeCount] = useState(0);

  const incrementLikes = () => {
    setLikeCount(prev => prev +1);
  }

  return (
    <StyledCard>
      {children}
      <StyledWrapper>
        <LikeBtn onClick={incrementLikes}/>
        <p>x {likeCount}</p>
      </StyledWrapper>
    </StyledCard>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  gap: 12px;
  color: ${(props => props.theme.colors.main.secondaryText)}
`;