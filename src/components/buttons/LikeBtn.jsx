import React from "react";
import { HeartIcon } from "./HeartIcon";


export const LikeBtn = ({ ...props }) => {
  return (
    <button {...props}>
      <HeartIcon />
    </button>
  );
}