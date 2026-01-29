import { useState } from "react";
import { StyledFormCard } from "../cards/Card.styled";
import { StyledSimpleBtn } from "../buttons/Button.styled";
import styled from "styled-components";

export const AuthenticationForm = () => {

  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState();

  const openSignupForm = () => {
    setFormType("signup");
    setShowForm(true);
  };
  const openLoginForm = () => {
    setFormType("login");
    setShowForm(true);
  };

  return(
    <>
      <StyledBtnDiv>
        <StyledBtn onClick={openLoginForm}>Login</StyledBtn>
        <StyledBtn onClick={openSignupForm}>Sign-up</StyledBtn>
      </StyledBtnDiv>
      {showForm &&
      <StyledFormCard as="form">
        <StyledFormHeader>
          <h2><b>{formType === "signup" ? "Sign up" : "Log in"}</b></h2>
          <StyledSimpleBtn aria-label="close" onClick={() => setShowForm(false)}>X</StyledSimpleBtn>
        </StyledFormHeader>
        <p>{formType === "signup" ? "Sign up to edit or delete your messages, and to view all your liked messages." : "Log in to edit or delete your messages, and to view all your liked messages."}</p>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email"placeholder="example@example.com" required></input>
        </div>
        {formType === "signup" && (
          <div>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" placeholder="Jessica" required></input>
          </div>
        )}
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="Password" required></input>
          {(formType === "signup") && <p>ⓘ Must be at least 8 characters</p>}
        </div>
        <StyledSimpleBtn type="submit">{formType === "signup" ? "Signup" : "Log in"}</StyledSimpleBtn>
      </StyledFormCard>
      }
    </>
  )
};

const StyledFormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledBtnDiv = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledBtn = styled.button`
  border: none;
  background-color: transparent;
  color: ${props => props.theme.colors.main.secondaryText};
  font-size: 16px;
  &:hover{
    text-decoration: underline;
  }

`;