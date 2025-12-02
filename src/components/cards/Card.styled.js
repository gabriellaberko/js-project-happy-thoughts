import styled from "styled-components";

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

  @media ${(props) => props.theme.media.tablet}  {
    width: 70%;
  }
  @media ${(props) => props.theme.media.desktop}  {
    width: 50%;
  }
`;

export const StyledFormCard = styled(StyledCard)`
  background-color: ${(props) => props.theme.colors.formCard.bg};
`;


export const StyledInput = styled.input`
    padding: 24px;
    border: 1px solid ${(props) => props.theme.colors.formCard.input.border};
`;