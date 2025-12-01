import React from "react";
import { HeartIcon } from "./HeartIcon";

export const FormSubmitBtn = ({ children, ...props }) => {
  return (
    <button type ="submit" {...props}>
      <HeartIcon />
      {children}
      <HeartIcon />
    </button>
  );
}