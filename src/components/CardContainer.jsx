import React, { useState } from "react";
import { FormCard } from "./cards/FormCard";
import { MessageCard } from "./cards/MessageCard";


export const CardContainer = () => {

  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {  
    setMessages([...messages, message]);
  }
  
  return(
    <div>
      <h1>Happy Thoughts</h1>
      <FormCard addMessage={addMessage} />
      {messages.map((message, index) => (<MessageCard key={index}>{message}</MessageCard>))}
    </div>
  );
}
