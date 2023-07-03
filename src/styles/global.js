import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
  }

  body {
    background-color: #F2F2F2;
  }

  button {
    border: none;
    cursor: pointer;
  }

  ul, li {
    list-style: none;
  }

  pre {
    width: 500px;
  }

  code {
    display: block;
    width: 100%;
  }
  img {
			width: 100%;
		}
`;

export default GlobalStyles;
