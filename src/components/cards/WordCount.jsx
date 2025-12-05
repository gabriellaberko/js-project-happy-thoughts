import React from "react";
import styled from "styled-components";


export const WordCount = ({ message }) => {

  const wordCount = message.length;
  
  return (
    <StyledParagraph $wordCount={wordCount}>{wordCount} / 140 characters</StyledParagraph>
  );
}


const StyledParagraph = styled.p`
  color: ${({ $wordCount, theme }) => $wordCount >= 140 ? "red" : theme.colors.main.secondaryText};
  font-size: 12px;
`;