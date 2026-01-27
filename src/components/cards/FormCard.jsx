import { useState } from "react";
import { SubmitBtn } from "../buttons/SubmitBtn";
import { StyledFormCard, StyledInput, StyledWrapper } from "./Card.styled";
import { WordCount } from "./WordCount";
import { ErrorMessage } from "./ErrorMessage";
import { useMessageStore } from "../../stores/messageStore";


export const FormCard = () => {

  const triggerUpdateMessages = useMessageStore((state) => state.triggerUpdateMessages);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(checkIfWithinWordLimit()) {
      setError(false);
      postMessage(message);
      
      setMessage(""); //reset on submit
    } else {
      setError(true);
    }
  }


  const handleInputChange = (e) => setMessage(e.target.value);


  const checkIfWithinWordLimit = () => message.length >= 1 && message.length <= 140;


  /*--- POST message to API ---*/

  const postMessage = async (message) => {
    const url = `https://js-project-api-wdi2.onrender.com/thoughts`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //tell server it’s JSON
        },
        body: JSON.stringify({ message: message }) //convert JS object to JSON string
      });

    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const thought = await response.json();
      console.log("Server response:", thought);
      // Save editToken (for edit access9 to local storage
      localStorage.setItem(
        `edit-token-${thought._id}`,
        thought.editToken
      );
      triggerUpdateMessages(); // to trigger a re-fetch of data after sending the message
    }
    catch(error) {
      console.error("Sending error:", error);
    }
  };


  return (
    <StyledFormCard as="form" onSubmit ={handleSubmit}>
      <StyledWrapper>
      <h2>What's making you happy right now?</h2> 
        <StyledInput 
          type="text" 
          placeholder="Share a happy thought..." 
          value={message}
          onChange={handleInputChange}
        />
        <WordCount message={message} />
        {error && <ErrorMessage />}
      </StyledWrapper>
      <SubmitBtn>
        Send Happy Thought
      </SubmitBtn>
    </StyledFormCard>
  );
}