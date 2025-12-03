import React from "react";
import { StyledCard } from "./Card.styled";
import { LikeBtn } from "../buttons/LikeBtn";

export const MessageCard = ({ children, ...props }) => {

  return (
    <StyledCard>
      {children}
      <LikeBtn />
    </StyledCard>
  );
}