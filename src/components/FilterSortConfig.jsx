import styled from "styled-components";

export const FilterSortConfig = ({ filter, setFilter, sortBy, setSortBy, sortingOrder, setSortingOrder }) => {
return(
   <StyledOuterWrapper>
      <StyledInputWrapper>
        <div>
          <StyledLabel htmlFor="sort">Sort by:</StyledLabel>
          <StyledSelect 
            name="sort" 
            id="sort" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>--Choose option--</option>
            <option value="date">Date</option>
            <option value="likes">Likes</option>
          </StyledSelect>
        </div>
        <div>
          <StyledLabel htmlFor="sort">Sorting order:</StyledLabel>
          <StyledSelect 
            name="sort" 
            id="sort" 
            value={sortingOrder} 
            onChange={(e) => setSortingOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
        </StyledSelect>
        </div>
      </StyledInputWrapper>
      <StyledRangeWrapper>
        <StyledLabel htmlFor="filter-likes">Filter on number of likes: <strong>{filter}</strong></StyledLabel>
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
  gap: 18px;
  margin: 12px 0;
  width: 100%;
  align-items: center; 
`;


const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  /* width: 100%; */

  @media ${(props) => props.theme.media.tablet}  {
   flex-direction: row;
   justify-content: center;
  }
`;


const StyledRangeWrapper = styled(StyledInputWrapper)`
  gap: 7px;
  align-items: initial;
  width: initial;
`;


const StyledLabel= styled.label`
  margin-right: 4px;
  text-align: center;
`;


const StyledRangeInput= styled.input`
  accent-color: ${(props) => props.theme.colors.button.like.activeBg}; 
`;


const StyledSelect= styled.select`
  border: 1px solid ${(props) => props.theme.colors.main.secondaryText};
  color: ${(props) => props.theme.colors.main.secondaryText};
  padding: 2px;
`;


