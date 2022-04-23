import styled from "styled-components";

const FundingBox = () => {
  return (
    <FundingArea>
      <h1>Funding Box</h1>
    </FundingArea>
  );
};

const FundingArea = styled.div`
  display: flex;
  background-color: blue;
  max-width: 200px;
  width: 100%;
  min-height: 35vh;
  heigh: 100%;
  magin-left: 40vh;
`;

export default FundingBox;
