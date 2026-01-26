import styled from "styled-components";

export const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  gap: 4px;
  padding: ${((props) => props.variant === "like" ? "12px 16px" : "8px 16px")};
  border-radius: ${((props) => props.variant === "like" ? "50%" : "30px")};
  background-color: ${props => (props.$active 
    ? props => props.theme.colors.button[props.variant]?.activeBg
    : props => props.theme.colors.button[props.variant]?.bg
  )};

  &:hover {
    background-color: ${(props) => props.theme.colors.button[props.variant]?.hoverBg};
    transform: translateY(-1px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.18);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }
`;