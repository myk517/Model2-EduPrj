import styled from "styled-components";
const TopImg = () => {
  return (
    <ImgBox>
      <ImgInnerBox>
        <TextArea>
          <TextTitle>
            <TextContents>
              <h1>TopImg...</h1>
            </TextContents>
          </TextTitle>
        </TextArea>
      </ImgInnerBox>
    </ImgBox>
  );
};

const ImgBox = styled.div`
  width: 100%;
  min-height: 330px;
  height: 100%;
  background-color: orange;
`;

const ImgInnerBox = styled.div`
  width: 60%;
  min-height: 330px;
  height: 100%;
  margin-left: 20%;
  margin-right: 20%;
  background-color: red;
`;

const TextArea = styled.div`
  width: 95%;
  min-height: 23vh;
  height: 100%;
  display: inline-block;
  position: relative;
  top: 16vh;
  margin-left: 2.5%;
  margin-right: 2.5%;
  background-color: beige;
`;

const ImgBrand = styled.div`
  background-color: blue;
  width: 5vw;
  height: 5vh;
  display: inline-block;
  position: relative;
  bottom: 30px;
`;

const TextTitle = styled.p`
  width: 80%;
  min-height: 5vh;
  height: 100%;
  display: inline-block;
  //   position: relative;
  //   top: 200px;
  margin-left: 2.5%;
  margin-right: 2.5%;
  background-color: yellowgreen;
`;

const TextContents = styled.p`
  width: 100%;
  min-height: 7vh;
  height: 100%;
  //   display: inline-block;
  position: relative;
  top: 8vh;
  margin: 0 auto;
  background-color: green;
`;

export default TopImg;
