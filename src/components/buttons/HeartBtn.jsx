import React from "react";
import { HeartIcon } from "./HeartIcon";


export const HeartBtn = ({ ...props }) => {
  return (
    <button {...props}>
      <HeartIcon />
    </button>
  );
}