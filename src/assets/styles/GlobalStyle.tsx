import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Varela', sans-serif;
    box-sizing: border-box;
  }

  body {
    height: 100%;
  }

  #root {
    min-height: 100%;
  }

  .swal2-popup {
    font-family: 'Varela', sans-serif;

  }

`;

export default GlobalStyle;
