import styled from "styled-components";

export const FilterSortConfig = ({ filter, setFilter, sortBy, setSortBy, sortingOrder, setSortingOrder }) => {
return(
   <StyledOuterWrapper>
      <StyledInputWrapper>
        <StyledSelectWrapper>
          <StyledLabel htmlFor="sort">Sort by:</StyledLabel>
          <StyledSelect 
            name="sort" 
            id="sort" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">All</option>
            <option value="date">Date</option>
            <option value="likes">Likes</option>
          </StyledSelect>
        </StyledSelectWrapper>
        <StyledSelectWrapper>
          <StyledLabel htmlFor="sort">Sort order:</StyledLabel>
          <StyledSelect 
            name="sort" 
            id="sort" 
            value={sortingOrder} 
            onChange={(e) => setSortingOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
        </StyledSelect>
        </StyledSelectWrapper>
      </StyledInputWrapper>
      <StyledRangeWrapper>
        <StyledLabel htmlFor="filter-likes">Filter on minimum likes: <strong>{filter}</strong></StyledLabel>
        <StyledRangeInput
          type="range"
          id="filter-likes"
          min="1"
          max="20"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </StyledRangeWrapper>
    </StyledOuterWrapper>
);
}

const StyledOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 12px 0;
  width: 100%;
  align-items: center; 
  font-size: 14px;
`;


const StyledInputWrapper = styled.div`
  display: flex;
  gap: 16px;

  @media ${(props) => props.theme.media.tablet}  {
   flex-direction: row;
   justify-content: center;
  }
`;

const StyledSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  @media ${(props) => props.theme.media.tablet}  {
   display: initial;
  }
`;


const StyledRangeWrapper = styled(StyledInputWrapper)`
  gap: 7px;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.media.tablet}  {
   display: flex;
   flex-direction: row;
  }
`;


const StyledLabel= styled.label`
  margin-right: 4px;
`;


const StyledRangeInput= styled.input`
  accent-color: ${(props) => props.theme.colors.button.like.activeBg}; 
  width: 30%;
`;


const StyledSelect= styled.select`
  border: 1px solid ${(props) => props.theme.colors.main.secondaryText};
  color: ${(props) => props.theme.colors.main.secondaryText};
  padding: 2px;
  font-size: 12px;
`;


