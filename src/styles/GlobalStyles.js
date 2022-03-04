//import * as styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`

  ${reset};
  * {
    box-sizing: border-box;
  }

  body {
    font-family: ;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    width: 100%;
  }

  input:focus {
    outline: none;
  }

  button {
    outline: none;
    cursor: pointer;
  }
  
`;

export default GlobalStyle;
