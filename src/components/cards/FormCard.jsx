import React, { useState } from "react";

export const FormCard = ({ children, ...props }) => {

  const [message, setMessage] = useState("");

  return (
    <form>
      <label> What is making you happy right now?
        <input 
          type="text" 
          placeholder="Share a happy thought..." 
          value = {message}
        />
      </label>
    </form>
  );
}