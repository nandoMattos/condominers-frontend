import styled from "styled-components";
import { MAIN_COLOR } from "../assets/colors";

export default function Header() {
  return (
    <>
      <HeaderStyle>
        <h1>Condominers</h1>
      </HeaderStyle>
    </>
  );
}

const HeaderStyle = styled.header`
  width: 100%;
  height: 70px;

  background-color: ${MAIN_COLOR};
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: "Passion One", cursive;
    color: white;
    width: fit-content;
    font-size: 50px;

    padding-left: 2 0px;
  }
`;
