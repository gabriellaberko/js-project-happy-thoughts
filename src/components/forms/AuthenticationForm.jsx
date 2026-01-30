import { useState } from "react";
import { StyledFormCard } from "../cards/Card.styled";
import { StyledSimpleBtn } from "../buttons/Button.styled";
import styled from "styled-components";
import { ErrorMessage } from "../cards/ErrorMessage";

export const AuthenticationForm = () => {

  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();


  const openSignupForm = () => {
    setFormType("signup");
    setShowForm(true);
  };
  const openLoginForm = () => {
    setFormType("login");
    setShowForm(true);
  };

  const handleEmailInputChange = (e) => setEmail(e.target.value);
  const handleNameInputChange = (e) => setName(e.target.value);
  const handlePasswordInputChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    formType === "signup" ? postNewUser() : postLogin();
  };

  /*--- Signup - POST new user to API ---*/
  const postNewUser = async () => {
    const url = `https://js-project-api-wdi2.onrender.com/users`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //tell server it’s JSON
        },
        body: JSON.stringify({ //convert JS object to JSON string
          email: email, 
          name: name,
          password: password
        }) 
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newUser = await response.json();
      localStorage.setItem("accessToken", newUser.accessToken);
      setShowForm(false);
    }
    catch(error) {
      console.error("Sending error:", error);
    }
  };

  /*--- Login - POST login session to API ---*/
  const postLogin = async () => {
    const url = `https://js-project-api-wdi2.onrender.com/sessions`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //tell server it’s JSON
        },
        body: JSON.stringify({ //convert JS object to JSON string
          email: email, 
          password: password
        }) 
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const loggedInUser = await response.json();
      localStorage.setItem("accessToken", loggedInUser.accessToken);
      setShowForm(false);
    }
    catch(error) {
      console.error("Sending error:", error);
      setError(true);
    }
  };


  return(
    <>
      <StyledBtnDiv>
        <StyledBtn onClick={openLoginForm}>Login</StyledBtn>
        <StyledBtn onClick={openSignupForm}>Sign-up</StyledBtn>
      </StyledBtnDiv>
      {showForm &&
      <>
      <p>{formType === "signup" ? "Sign up to edit or delete your messages, and to view all your liked messages." : "Log in to edit or delete your messages, and to view all your liked messages."}</p>
      <StyledFormCard as="form" onSubmit={handleSubmit}>
        <StyledFormHeader>
          <h2><b>{formType === "signup" ? "Sign up" : "Log in"}</b></h2>
          <StyledSimpleBtn aria-label="close" onClick={() => setShowForm(false)}>X</StyledSimpleBtn>
        </StyledFormHeader>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            id="email" 
            type="email"
            placeholder="example@example.com" 
            required 
            onChange={handleEmailInputChange}
          />
        </div>
        {formType === "signup" && (
          <div>
            <label htmlFor="name">Name:</label>
            <input 
              id="name" 
              type="text" 
              placeholder="Jessica" 
              required 
              onChange={handleNameInputChange}
            />
          </div>
        )}
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            id="password" 
            type="password" 
            placeholder="Password" 
            required
            onChange={handlePasswordInputChange}
          />
          {(formType === "signup") && <p>ⓘ Must be at least 8 characters</p>}
        </div>
        {error && formType === "login" && <ErrorMessage>Invalid user credentials</ErrorMessage>}
        <StyledSimpleBtn type="submit">{formType === "signup" ? "Signup" : "Log in"}</StyledSimpleBtn>
      </StyledFormCard>
      </>
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