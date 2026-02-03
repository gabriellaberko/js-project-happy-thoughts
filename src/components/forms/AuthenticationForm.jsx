import { useState } from "react";
import { StyledFormCard } from "../cards/Card.styled";
import { StyledSimpleBtn } from "../buttons/Button.styled";
import styled from "styled-components";
import { ErrorMessage } from "../cards/ErrorMessage";
import { useAuthStore } from "../../stores/authStore";

export const AuthenticationForm = ({ showForm, formType, setShowForm, error, setError }) => {

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("Invalid user credentials");

  const login = useAuthStore(state => state.login);

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

      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters");
        setError(true);
        return;
      }
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
        login({ accessToken: newUser.accessToken, name: newUser.name });
        setShowForm(false);
        setError(false);
      }
      catch (error) {
        console.error("Sending error:", error);
        setErrorMessage("Could not create account");
        setError(true);
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
      login({ accessToken: loggedInUser.accessToken, name: loggedInUser.name });
      setShowForm(false);
      setError(false);

    }
    catch(error) {
      console.error("Sending error:", error);
      setError(true);
    }
  };


  return(
    <>
    {showForm &&
      <StyledAuthWrapper>
      <StyledFormWrapper>

        <StyledFormCard as="form" onSubmit={handleSubmit}>
          <StyledFormHeader>
            <h2><b>{formType === "signup" ? "Sign up" : "Log in"}</b></h2>
            <StyledSimpleBtn aria-label="close" onClick={() => setShowForm(false)}>X</StyledSimpleBtn>
          </StyledFormHeader>
                  <p>{formType === "signup" ? "Sign up to edit or delete your messages, and to view all your liked messages." : "Log in to edit or delete your messages, and to view all your liked messages."}</p>
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
            {(formType === "signup") && <StyledInfoText>ⓘ Password must be at least 8 characters</StyledInfoText>}
          </div>
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <StyledSimpleBtn type="submit">{formType === "signup" ? "Signup" : "Log in"}</StyledSimpleBtn>
        </StyledFormCard>
      </StyledFormWrapper>
      </StyledAuthWrapper>
    }
    </>
  )
};

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 0 18px;
  width: 100%;
  overflow-wrap: anywhere;

  @media ${(props) => props.theme.media.tablet}  {
    width: 70%;
  }
  @media ${(props) => props.theme.media.desktop}  {
    width: 50%;
  }
`;

const StyledAuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 24px 0;
  
`;

const StyledFormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledBtnDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: 12px;
  margin-bottom: 24px;
`;

const StyledInfoText = styled.p`
  font-size: 12px;
  margin: 6px 0;
`;