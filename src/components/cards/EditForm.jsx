import { useState } from "react";
import { StyledInput, StyledWrapper, StyledErrorMessage } from "./Card.styled";
import { WordCount } from "./WordCount";
import { useMessageStore } from "../../stores/messageStore";


export const EditForm = ({ id, setEditMode }) => {

  const triggerUpdateMessages = useMessageStore((state) => state.triggerUpdateMessages);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(checkIfWithinWordLimit()) {
      setError(false);
      updateMessage(id);
      setMessage(""); //reset on submit
    } else {
      setError(true);
    }
  };


  const handleInputChange = (e) => setMessage(e.target.value);

  const checkIfWithinWordLimit = () => message.length >= 1 && message.length <= 140;


  /*--- Update (PATCH) message to API ---*/
  const updateMessage = async (id) => {
    const url = `https://js-project-api-wdi2.onrender.com/thoughts/id/${id}/message`;
    try {
      const response = await fetch(url, {
        method: "PATCH", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          message: message
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Server response:", data);
      setEditMode(false);
      triggerUpdateMessages(); // To trigger a re-fetch of data after sending a like to the API
    }
    catch(error) {
      console.error("Sending error:", error.message);
    }
  };


  return (
    <form as="form" onSubmit ={handleSubmit}>
      <StyledWrapper>
        <StyledInput 
          type="text" 
          value={message}
          onChange={handleInputChange}
        />
        <WordCount message={message} />
        {error && 
          <StyledErrorMessage>
            <p><strong>⚠️ Error:</strong> The message must be between 1 and 140 characters.</p></StyledErrorMessage>
        }
      </StyledWrapper>
      <button type="submit">Update</button>
      <button onClick={() => setEditMode(false)}>Cancel</button>
    </form>
  );
}