import { createGlobalStyle } from "styled-components";
import { MAIN_COLOR } from "../colors";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Varela', sans-serif;
    box-sizing: border-box;
    /* transition: all ease .2s;   */
  }

  body{
    height: 100vh;
  }
  
`;

export default GlobalStyle;
