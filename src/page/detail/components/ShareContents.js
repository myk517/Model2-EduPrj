import styled from "styled-components";

const ShareContents = () => {
  return (
    <ContentsContainer>
      <InnerContentsContainer>
        <h1>나눔내역 내용</h1>
      </InnerContentsContainer>
    </ContentsContainer>
  );
};
const ContentsContainer = styled.div`
  max-width: 1080px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: beige;
`;

const InnerContentsContainer = styled.div`
  background-color: yellowgreen;
  max-width: 800px;
  width: 100%;
  min-height: 95vh;
  heigh: 100%;
  magin-right: 20vh;
`;
export default ShareContents;
