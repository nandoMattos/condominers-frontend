import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Varela', sans-serif;
    box-sizing: border-box;
  }
  .swal2-popup {
    font-family: 'Varela', sans-serif;

  }
  
  .scrollable {
    height:fit-content;
  }
`;

export default GlobalStyle;
