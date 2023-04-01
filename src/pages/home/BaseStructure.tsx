import styled from "styled-components";
import Header from "../../components/Header";
import React from "react";

export default function BaseStructure({ children }: React.PropsWithChildren) {
  return (
    <>
      <HomePageStyle>
        <Header />
        <MainStyle>{children}</MainStyle>
      </HomePageStyle>
    </>
  );
}

const HomePageStyle = styled.div`
  height: 100vh;
  padding-top: 70px;
  background-color: #545454;
  font-family: "Open Sans", sans-serif;
`;

const MainStyle = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 60%;
  background-color: white;
  -webkit-box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.61);
  -moz-box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.61);
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.61);

  @media (max-width: 700px) {
    width: 100%;
  }
`;
