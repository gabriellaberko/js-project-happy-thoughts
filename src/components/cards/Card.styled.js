import styled, { keyframes } from "styled-components";

/* --- Animations --- */

const popIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  60% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;


/* --- Styled card components --- */


export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  background-color: ${(props) => props.theme.colors.messageCard.bg};
  border: 1px solid ${(props) => props.theme.colors.card.border};
  padding: 22px;
  box-shadow: 8px 8px 0px ${(props) => props.theme.colors.card.shadow};
  width: 100%;
  animation: ${popIn} 0.4s ease;
  
  &:hover {
    transform: scale(1.01);
  }
`;

export const StyledFormCard = styled(StyledCard)`
  background-color: ${(props) => props.theme.colors.formCard.bg};
  animation: none;
  &:hover {
    transform: none;
  }
`;


export const StyledInput = styled.input`
    padding: 24px;
    border: 1px solid ${(props) => props.theme.colors.formCard.input.border};
`;


export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;