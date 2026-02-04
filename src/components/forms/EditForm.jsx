import { useState } from "react";
import { StyledInput, StyledWrapper } from "../cards/Card.styled";
import { WordCount } from "../cards/WordCount";
import { FormErrorMessage } from "./FormErrorMessage";
import { useThoughtStore } from "../../stores/thoughtStore";
import styled from "styled-components";


export const EditForm = ({ id, setEditMode }) => {

  const triggerUpdateThoughts = useThoughtStore((state) => state.triggerUpdateThoughts);
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
      triggerUpdateThoughts(); // To trigger a re-fetch of data after sending a like to the API
    }
    catch(error) {
      console.error("Sending error:", error.message);
    }
  };


  return (
    <StyledForm onSubmit ={handleSubmit}>
      <StyledWrapper>
        <StyledInput 
          type="text" 
          value={message}
          onChange={handleInputChange}
        />
        <WordCount message={message} />
        {error && <FormErrorMessage />}
      </StyledWrapper>
      <StyledEditButtonsWrapper>
        <StyledEditButton type="submit" onClick={handleSubmit}>Update</StyledEditButton>
        <StyledCancelButton onClick={() => setEditMode(false)}>Cancel</StyledCancelButton>
      </StyledEditButtonsWrapper>
    </StyledForm>
  );
}


const StyledForm = styled.form`
  width: 100%;
  justify-content: center;
  margin: 12px 0;
`;

const StyledEditButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  margin: 12px 0;
`;

const StyledEditButton = styled.button`
  border: 1px solid ${(props => props.theme.colors.main.secondaryText)};;
  color: ${(props => props.theme.colors.main.secondaryText)};
  padding: 6px 8px;
  font-size: 12px;
  cursor: pointer;

    &:hover {
    transform: translateY(-1px);
    box-shadow: 4px 4px 0px  rgba(0, 0, 0, 0.06);
  }
`;

const StyledCancelButton = styled.button`
  border: none;
  text-decoration: underline;
  color: ${(props => props.theme.colors.main.secondaryText)};
  cursor: pointer;
  background-color: transparent;
`;
