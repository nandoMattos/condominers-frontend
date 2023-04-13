import styled from "styled-components";
import { MAIN_COLOR } from "../assets/colors";
import { useNavigate } from "react-router-dom";
import buildingImg from "../assets/images/building.png";

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderStyle>
        <img src={buildingImg} alt="Condominers Logo" />
        <h1 onClick={() => navigate("/")}>Condominers</h1>
      </HeaderStyle>
    </>
  );
}

const HeaderStyle = styled.header`
  width: 100%;
  height: 70px;
  z-index: 100;

  background-color: ${MAIN_COLOR};
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 50px;
    color: white;
  }

  h1 {
    cursor: pointer;
    font-family: "Passion One", cursive;
    color: white;
    width: fit-content;
    font-size: 50px;
    margin-top: 5px;
    margin-left: 10px;

    padding-left: 2 0px;
  }
`;
