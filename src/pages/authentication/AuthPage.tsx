import { useState } from "react";
import styled from "styled-components";
import { MAIN_COLOR, SECONDARY_COLOR } from "../../assets/colors";
import Button from "../../assets/styles/Button";
import FormOwner from "./FormOwner";
import FormResident from "./FormResident";
import logo from "../../assets/images/building.png";

export default function AuthPage() {
  const [isResident, setIsResident] = useState<undefined | boolean>(undefined);

  function changeToOwner() {
    setIsResident(false);
  }

  function changeToResident() {
    setIsResident(true);
  }

  return (
    <>
      <Page>
        <Wraper>
          <HeaderWrap>
            <img src={logo} />
            <h1>Condominers</h1>
          </HeaderWrap>
          {/* <p>
            A melhor solução para seu condomínio! descricao foda descricao foda
            descricao foda descricao foda descricao foda descricao foda
            descricao foda
          </p> */}
          <FormWraper>
            <h2>Selecione uma opção de login:</h2>
            <Fixed>
              <Button width="200px" onClick={() => changeToOwner()}>
                Sou proprietário
              </Button>
              <Button width="200px" onClick={() => changeToResident()}>
                Sou morador
              </Button>
            </Fixed>
            {isResident !== undefined ? (
              <FormContainerAuth heigth={isResident ? "200px" : "250px"}>
                {isResident ? <FormResident /> : <FormOwner />}
              </FormContainerAuth>
            ) : (
              ""
            )}
          </FormWraper>
        </Wraper>
      </Page>
    </>
  );
}

export const Page = styled.div`
  background-color: ${MAIN_COLOR};
  height: 100vh;
  color: white;
`;

export const HeaderWrap = styled.div`
  /* background-color: red; */
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  h1 {
    margin: 0 auto;
    width: fit-content;
    font-size: 100px;
  }
  img {
    width: 60px;
    color: white;
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 50px;
    }
  }
`;

export const Wraper = styled.div`
  margin: 0 auto;
  padding-top: 40px;
  height: 100%;
  width: 80%;
  font-family: "Passion One", cursive;

  p {
    margin: 0 auto;
    width: 70%;
    font-size: 40px;
  }
`;

export const FormWraper = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 80%;
  min-height: 150px;
  height: fit-content;
  background-color: ${SECONDARY_COLOR};
  border-radius: 4px;
  padding: 20px;
  h2 {
    font-size: 25px;
  }
`;

const Fixed = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;

  button {
    margin-right: 10px;
  }
`;

export const FormContainerAuth = styled.div<{ heigth?: string }>`
  margin-top: 20px;
  transition: all ease 0.2s;

  width: 70%;
  height: ${({ heigth }) => heigth};
  input {
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;
