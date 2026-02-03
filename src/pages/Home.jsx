import { useState, useEffect } from "react";
import { FormCard } from "../components/cards/FormCard";
import { MessageCard } from "../components/cards/MessageCard";
import styled from "styled-components";
import { Loader } from "../components/Loader";
import { useThoughtStore } from "../stores/thoughtStore";
import { FilterSortConfig } from "../components/FilterSortConfig";
import { useAuthStore } from "../stores/authStore";
import { Navigation } from "../components/Navigation";
import { Link } from "react-router-dom";


export const Home = () => {

  const updateThoughts = useThoughtStore(state => state.updateThoughts);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const accessToken = useAuthStore(state => state.accessToken);
  const userName = useAuthStore(state => state.name);

  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  // For sorting and filtering thoughts
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortingOrder, setSortingOrder] = useState("");


  /*--- Fetch thoughts from API ---*/

  useEffect(() => {

    const fetchThoughts = async () => {
      const params = new URLSearchParams();

      if (filter) {
        params.append("minLikes", filter);
      }

      if (sortBy) {
        params.append("sortBy", sortBy);

        if (sortingOrder) {
          params.append("order", sortingOrder);
        }
      }
      const query = params.toString();
      const url = query
        ? `https://js-project-api-wdi2.onrender.com/thoughts?${query}`
        : `https://js-project-api-wdi2.onrender.com/thoughts`;
      
      try {
        const response = await fetch(
          url, {
            headers: {
              Authorization: accessToken, // make sure token is sent
              "Content-Type": "application/json",
            },
          });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLoading(false);
        setThoughts(data);
      }   
      catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchThoughts();
    
  },[updateThoughts, filter, sortBy, sortingOrder, accessToken])

  
  return(
    <>
    <Navigation>
      {isAuthenticated &&
        <StyledLink to={`/liked`}>💭 Liked Thoughts</StyledLink>
      }
    </Navigation>
    <StyledWrapper>
      <StyledCardContainer>
        {isAuthenticated ? <h1>Hi, {userName}!</h1> : <h1>Happy Thoughts</h1>}
        <FormCard />
        <FilterSortConfig 
          filter={filter} 
          setFilter={setFilter} 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          sortingOrder={sortingOrder} 
          setSortingOrder={setSortingOrder} 
        />
        {loading && <Loader />}
        {thoughts
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
  padding: 6px 16px 8px 16px;
  background-color: ${props => props.theme.colors.button.like.bg};
  border-radius: 30px;
  &:hover {
    transform: translateY(-1px);
  }

  /* border: 1px solid ${(props => props.theme.colors.main.secondaryText)};
  
  color: inherit;
  background-color: transparent;
  padding: 6px 16px;
  flex-shrink: 0;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    box-shadow: 4px 4px 0px  rgba(0, 0, 0, 0.06);
  } */
`;

