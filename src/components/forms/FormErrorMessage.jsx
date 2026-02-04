import styled, { keyframes } from "styled-components";

export const FormErrorMessage = ({ children }) => {
  
  return (
    <StyledErrorMessage>
      <p><strong>⚠️ Error:</strong>{children}</p>
    </StyledErrorMessage>  
  );
}


/* --- Animations --- */

const shake = keyframes`
  0% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
  20%, 40%, 60%, 80% { transform: translateX(3px); }
  100% { transform: translateX(0); }
`;

export const StyledErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 12px;
  color: #D94F4B;
  background-color: #FDEAEA;
  border: 2px solid #D94F4B;
  font-size: 14px;

  animation: ${shake} 0.5s ease;
`;