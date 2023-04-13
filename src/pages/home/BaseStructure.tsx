import styled from "styled-components";
import Header from "../../components/Header";
import React from "react";
import { SECONDARY_COLOR } from "../../assets/colors";

interface BaseStructureProps extends React.PropsWithChildren {
  className?: string;
}

export default function BaseStructure({
  children,
  className,
}: BaseStructureProps) {
  return (
    <>
      <HomePageStyle className={className}>
        <Header />
        <MainStyle>{children}</MainStyle>
      </HomePageStyle>
    </>
  );
}

const HomePageStyle = styled.div`
  min-height: 100vh;
  background-color: #a6a6a6;
  font-family: "Open Sans", sans-serif;
`;

const MainStyle = styled.div`
  padding-top: 70px;
  margin: 0 auto;
  min-height: 100vh;
  width: 70%;
  background-color: ${SECONDARY_COLOR};
  -webkit-box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.61);
  -moz-box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.61);
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.61);
  padding-bottom: 20px;

  @media (max-width: 800px) {
    width: 100%;
  }
`;
