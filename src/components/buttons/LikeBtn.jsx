import React from "react";
import { HeartIcon } from "./HeartIcon";
import { StyledBtn } from "./Button.styled";


export const LikeBtn = ({ ...props }) => {

  return (
    <StyledBtn 
      variant = "like"
      {...props}
    >
      <HeartIcon />
    </StyledBtn>
  );
}
