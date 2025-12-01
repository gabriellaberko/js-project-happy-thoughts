import React, { useState } from "react";
import { FormSubmitBtn } from "../buttons/FormSubmitBtn";

export const FormCard = ({ children, ...props }) => {

  const [message, setMessage] = useState("");

  return (
    <form onSubmit = {(e) => e.preventDefault()}>
      <label> What is making you happy right now?
        <input 
          type="text" 
          placeholder="Share a happy thought..." 
          value = {message}
          onChange = {(e) => setMessage(e.target.value)}
        />
      </label>
      <FormSubmitBtn>
        Send Happy Thought
      </FormSubmitBtn>
    </form>
  );
}