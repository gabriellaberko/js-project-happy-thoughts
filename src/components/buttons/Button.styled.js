import styled from "styled-components";

export const StyledSubmitBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${(props) => props.theme.colors.button.submit.bg};
  border: none;
  padding: 8px 16px;
  border-radius: 30px;

  &:hover {
    background-color: ${(props) => props.theme.colors.button.submit.hoverBg};
    transform: translateY(-1px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.18);
  }

  &:active {
    background-color: ${(props) => props.theme.colors.button.submit.activeBg};
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }
`;