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
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }
`;


export const StyledSimpleBtn = styled.button`
  border: 1px solid ${(props => props.theme.colors.main.secondaryText)};
  color: ${(props => props.theme.colors.main.secondaryText)};
  background-color: transparent;
  padding: 6px 8px;
  font-size: 12px;
  cursor: pointer;

    &:hover {
    /* transform: translateY(-1px); */
    box-shadow: 4px 4px 0px  rgba(0, 0, 0, 0.06);
  }
`;