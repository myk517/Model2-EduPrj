import React from "react";
import styled from "styled-components";
import Slider from "./components/Slider";
import PrjList from "./components/PrjList";

function Main() {
  return (
    <>
      <CommonCss>
        <Slider />
        <PrjList />
      </CommonCss>
    </>
  );
}

const CommonCss = styled.div`
  border: 1px;
  max-width: 1080px;
  width: 100%;
  margin: auto;
`;

export default Main;
