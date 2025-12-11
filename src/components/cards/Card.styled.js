import styled, { keyframes } from "styled-components";

/* --- Animations --- */

const shake = keyframes`
  0% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
  20%, 40%, 60%, 80% { transform: translateX(3px); }
  100% { transform: translateX(0); }
`;

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
  padding: 24px;
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


export const StyledErrorMessage = styled.div`
  display: flex;
  padding: 12px;
  color: #D94F4B;
  background-color: #FDEAEA;
  border: 2px solid #D94F4B;
  font-size: 14px;

  animation: ${shake} 0.5s ease;
`;