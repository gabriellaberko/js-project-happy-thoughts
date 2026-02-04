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
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");


  /*--- Fetch thoughts from API ---*/

  useEffect(() => {
    if (!accessToken) return;  // Make sure accessToken has been set before fetching

    const fetchLikedThoughts = async () => {
      const url = `https://js-project-api-wdi2.onrender.com/thoughts/liked`

      setLoading(true);

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
        setLikedThoughts(data);
        setLoading(false);


        if (data.length === 0) {
          setFetchErrorMessage("There is currently no data matching the filters.");
          setFetchError(true);
        } else {
          setFetchError(false);
        }
      }   
      catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
        setFetchErrorMessage("An error occurred during the fetching of the data. Try again later!");
        setFetchError(true);
      }
    };
    fetchLikedThoughts();
    
  },[updateThoughts, accessToken])

  
  return(
    <>
    <Navigation>
      <StyledLink to={`/`}>🏠 Home</StyledLink>
    </Navigation>
    <StyledWrapper>
      <StyledCardContainer>
        <h1>Your Liked Thoughts</h1>
        <p>You have ❤️ {likedThoughts.length}{" "}
        {likedThoughts.length === 1 ? "post" : "posts"}.<br></br>Keep spreading hapiness!</p>
        {loading && <Loader />}
        {fetchError && <FetchErrorMessage>{fetchErrorMessage}</FetchErrorMessage> }
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
  margin: 6px 18px 18px 18px;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
  padding: 6px 18px 8px 18px;
  background-color: ${props => props.theme.colors.button.like.bg};
  border-radius: 30px;
  &:hover {
    transform: translateY(-1px);
  }
`; 
