import { useState, useEffect } from "react";
import { AuthenticationForm } from "./forms/AuthenticationForm";
import { FormCard } from "./cards/FormCard";
import { MessageCard } from "./cards/MessageCard";
import styled from "styled-components";
import { Loader } from "./Loader";
import { useThoughtStore } from "../stores/thoughtStore";
import { FilterSortConfig } from "./FilterSortConfig";
import { ThoughtBubble } from "./ThoughtBubble";
import { useAuthStore } from "../stores/authStore";


export const CardContainer = () => {

  const updateThoughts = useThoughtStore(state => state.updateThoughts);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const userName = useAuthStore(state => state.name);

  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedThoughts, setLikedThoughts] = useState(() => {
    return JSON.parse(localStorage.getItem("likedThoughts")) || [];
  });
  // For sorting and filtering thoughts
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortingOrder, setSortingOrder] = useState("");

  // Sync the likes to local storage whenever likedThoughts is changing
  useEffect(() => {
    localStorage.setItem("likedThoughts", JSON.stringify(likedThoughts));
  }, [likedThoughts]);


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
        const response = await fetch(url);
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
    
  },[updateThoughts, filter, sortBy, sortingOrder])

  
  return(
    <>
    {likedThoughts.length > 0 && (
      <StyledDiv>
      <ThoughtBubble>
        <p>You have ❤️ {likedThoughts.length}{" "}
        {likedThoughts.length === 1 ? "post" : "posts"}.<br></br>Keep spreading hapiness!</p>
      </ThoughtBubble>
      </StyledDiv>
    )}
    <AuthenticationForm />
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
            hearts={thought.hearts}
            likedThoughts={likedThoughts}
            setLikedThoughts={setLikedThoughts}
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
  /* margin-top: 42px; */

  @media ${(props) => props.theme.media.tablet}  {
    margin-top: 0;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  width: 100%;
  color: ${(props) => props.theme.colors.main.secondaryText};
  @media ${(props) => props.theme.media.tablet}  {
    justify-content: flex-end;
    text-align: end;
  }
  margin-bottom: 12px;
`;

