import { useState, useEffect } from "react";
import { StyledCard } from "./Card.styled";
import { LikeBtn } from "../buttons/LikeBtn";
import { StyledSimpleBtn } from "../buttons/Button.styled";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { EditForm } from "../forms/EditForm";
import { useThoughtStore } from "../../stores/thoughtStore";
import { useAuthStore } from "../../stores/authStore";

dayjs.extend(relativeTime);

export const MessageCard = ({ likedThoughts, setLikedThoughts, id, hearts, createdAt, isCreator, children }) => {

  const triggerUpdateThoughts = useThoughtStore((state) => state.triggerUpdateThoughts);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [likeCount, setLikeCount] = useState(() => {
    return typeof hearts === "number" ? hearts : 0;
  });
  const [isActive, setIsActive] = useState(hearts >= 1 ? true : false);
  const [editMode, setEditMode] = useState(false);
  const hasEditRights = isCreator || localStorage.getItem(`edit-token-${id}`); 

  // Sync with the hearts prop when it changes (when new card is posted)
  useEffect(() => {
    setLikeCount(hearts);
    setIsActive(hearts >= 1);
  }, [hearts]);
  

  const handleClick = () => {
    setLikeCount(prev => prev +1);
    setIsActive(true);
    updateLikes(id);
    if (likedThoughts &&!likedThoughts.includes(id)) {
      setLikedThoughts(prev => [...prev, id]);
    } 
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const checkTimeAgoSubmitted = createdAt => dayjs(createdAt).fromNow();


  useEffect(() => {
    const interval = setInterval(() => {
      checkTimeAgoSubmitted(createdAt);
      triggerUpdateThoughts(); // Trigger re-fetch of data
    }, 60000);
  
    // Prevent interval form keep running & clear from old value
    return () => clearInterval(interval);
  }, [createdAt, triggerUpdateThoughts]);

  
  /*--- Update (PATCH) like count to API ---*/
  const updateLikes = async (id) => {
    const url = `https://js-project-api-wdi2.onrender.com/thoughts/id/${id}/like`;
    try {
      const response = await fetch(url, {
        method: "PATCH", 
        headers: {
          "Authorization": accessToken,
          "Content-Type": "application/json", 
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Server response:", data);
      triggerUpdateThoughts(); // To trigger a re-fetch of data after sending a like to the API
    }
    catch(error) {
      console.error("Sending error:", error);
    }
  };

  /*--- Delete thought in API ---*/
   const deleteThought = async (id) => {
    const url = `https://js-project-api-wdi2.onrender.com/thoughts/id/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE", 
        headers: {"Content-Type": "application/json"}, 
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Server response:", data);
      triggerUpdateThoughts(); // To trigger a re-fetch of data after sending a like to the API
      localStorage.removeItem(`edit-token-${id}`); // Remove edit token from local storage
    }
    catch(error) {
      console.error("Sending error:", error);
    }
  };


  return (
    <StyledCard>
      {editMode 
        ? <EditForm id={id} setEditMode={setEditMode}></EditForm>
        : children}
      <StyledBottomWrapper>
        <StyledLikeWrapper>
          <LikeBtn onClick={handleClick} $active={isActive} />
          <p>x {likeCount}</p>
        </StyledLikeWrapper>
        <p>{checkTimeAgoSubmitted(createdAt)}</p>
      </StyledBottomWrapper>
        {hasEditRights && 
        <StyledEditWrapper>
          { !editMode &&
            <>
              <StyledSimpleBtn onClick={activateEditMode}>Edit</StyledSimpleBtn>
              <StyledSimpleBtn onClick={() => deleteThought(id)}>Delete</StyledSimpleBtn>
            </>
          }
        </StyledEditWrapper>
      }
    </StyledCard>
  );
}

const StyledLikeWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledEditWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 12px;
`;


const StyledBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: ${(props => props.theme.colors.main.secondaryText)}
`;

