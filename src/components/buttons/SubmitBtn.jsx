import React from "react";
import { HeartIcon } from "./HeartIcon";
import { StyledSubmitBtn } from "./Button.styled";

export const SubmitBtn = ({ children, ...props }) => {
  return (
    <StyledSubmitBtn type ="submit" {...props}>
      <HeartIcon />
      {children}
      <HeartIcon />
    </StyledSubmitBtn>
  );
}