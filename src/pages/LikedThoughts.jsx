import { useState, useEffect } from "react";
import { MessageCard } from "../components/cards/MessageCard";
import styled from "styled-components";
import { Loader } from "../components/Loader";
import { useThoughtStore } from "../stores/thoughtStore";
import { useAuthStore } from "../stores/authStore";
import { Navigation } from "../components/Navigation";
import { Link } from "react-router-dom";


export const LikedThoughts = () => {

  const updateThoughts = useThoughtStore(state => state.updateThoughts);
  const accessToken = useAuthStore(state => state.accessToken);
  const [likedThoughts, setLikedThoughts] = useState([]);
  const [loading, setLoading] = useState(true);


  /*--- Fetch thoughts from API ---*/

  useEffect(() => {
    if (!accessToken) return;  // Make sure accessToken has been set before fetching

    const fetchLikedThoughts = async () => {
      const url = `https://js-project-api-wdi2.onrender.com/thoughts/liked`
      
      try {
        const response = await fetch(
          url, {
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
          });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLoading(false);
        setLikedThoughts(data);
      }   
      catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchLikedThoughts();
    
  },[updateThoughts, accessToken])

  
  return(
    <>
    <Navigation>
      <Link to={`/`}>Home</Link>
    </Navigation>
    <StyledWrapper>
      <StyledCardContainer>
        <h1>Your Liked Thoughts</h1>
        <p>You have ❤️ {likedThoughts.length}{" "}
        {likedThoughts.length === 1 ? "post" : "posts"}.<br></br>Keep spreading hapiness!</p>
        {loading && <Loader />}
        {likedThoughts
          .map((thought, index) => 
          (<MessageCard 
            key={index} 
            createdAt={thought.createdAt}
            id={thought._id}
            hearts={thought.hearts.length}
            isCreator={thought.isCreator}
            >
              {thought.message}
          </MessageCard>
        ))}
      </StyledCardContainer>
    </StyledWrapper>
    </>
  );
}

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 0 18px;
  overflow-wrap: anywhere;

  @media ${(props) => props.theme.media.tablet}  {
    width: 70%;
  }
  @media ${(props) => props.theme.media.desktop}  {
    width: 50%;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;


  @media ${(props) => props.theme.media.tablet}  {
    margin-top: 0;
  }
`;

