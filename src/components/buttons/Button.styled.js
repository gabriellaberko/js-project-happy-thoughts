import styled from "styled-components";

export const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.button[props.variant]?.bg};
  border: none;
  padding: ${((props) => props.variant === "like" ? "12px 16px" : "8px 16px")};
  border-radius: ${((props) => props.variant === "like" ? "50%" : "30px")};

  &:hover {
    background-color: ${(props) => props.theme.colors.button[props.variant]?.hoverBg};
    transform: translateY(-1px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.18);
  }

  &:active {
    background-color: ${(props) => props.theme.colors.button[props.variant]?.activeBg};
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }
`;