import { AuthenticationForm } from "./forms/AuthenticationForm";
import styled from "styled-components";
import { useAuthStore } from "../stores/authStore";
import { useState } from "react";

export const Navigation = ({ children }) => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore(state => state.logout);

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
  
  return ( 
    <>
    <StyledNav>
        {isAuthenticated 
      ?
        <StyledBtnDiv>
          <StyledBtn onClick={logout}>[➜ Log out</StyledBtn>
        </StyledBtnDiv>
      :
        <StyledBtnDiv>
          <StyledBtn onClick={openLoginForm}>Log in</StyledBtn>
          <StyledBtn onClick={openSignupForm}>Sign-up</StyledBtn>
        </StyledBtnDiv>
      }
      {children}
    </StyledNav>
    <AuthenticationForm showForm={showForm} setShowForm={setShowForm} formType={formType} />
  </>
  );
}


const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* background-color: #ebeaea5b; */
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`;

const StyledBtnDiv = styled.div`
  display: flex;
  width: 100%;
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