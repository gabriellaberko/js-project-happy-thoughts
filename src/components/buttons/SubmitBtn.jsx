import React from "react";
import { HeartIcon } from "./HeartIcon";
import { StyledBtn } from "./Button.styled";

export const SubmitBtn = ({ children, ...props }) => {
  return (
    <StyledBtn 
      variant="submit" 
      type ="submit" 
      {...props}
    >
      <HeartIcon />
        {children}
      <HeartIcon />
    </StyledBtn>
  );
}