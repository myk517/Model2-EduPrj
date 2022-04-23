import React from "react";
import styled from "styled-components";
import CenterMenu from "./components/CenterMenu";

function Header() {
  console.log(">>", window.location.pathname);
  return (
    <StyledHeader>
      <CenterMenu />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  max-width: 1080px;
  width: 100%;
  height: 65px;
  background: white;
  margin: auto;

  z-index: 999;
  position: sticky;
`;

export default Header;
