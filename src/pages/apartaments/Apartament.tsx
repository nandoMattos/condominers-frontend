import styled from "styled-components";
import { ApartamentsInfo } from "../../protocols";
import { MAIN_COLOR, SECONDARY_COLOR } from "../../assets/colors";
import IonIcon from "@reacticons/ionicons";
import LoadingCircle from "../../components/LoadingCircle";
import { generateLink } from "../../helpers/api/apartaments";
import { useState } from "react";
import Swal from "sweetalert2";

type ApartamentProps = ApartamentsInfo & {
  isLoading: boolean;
  setInviteLoading: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
};

export default function Apartament({
  id,
  name,
  avaliableVacancies,
  maintenaceRequests,
  totalVacancies,
  isLoading,
  setInviteLoading,
  disabled,
}: ApartamentProps) {
  const [disableButtons, setDisableButtons] = useState(false);

  function calculateUserIcons() {
    let icons = [];
    for (let i = 0; i < totalVacancies; i++) {
      if (i >= avaliableVacancies) {
        icons.push(<IonIcon name="person" />);
      } else {
        icons.push(<IonIcon name="person-outline" />);
      }
    }
    return icons;
  }

  async function generateApartamentLink() {
    setInviteLoading(id);
    setDisableButtons(true);

    try {
      const link = await generateLink(id);
      setInviteLoading(0);
      setDisableButtons(false);
      Swal.fire({
        icon: "success",
        title: "Envie o link abaixo para o morador",
        text: link,
      });
    } catch (err) {
      setInviteLoading(0);
      setDisableButtons(false);
      console.log(err);
    }
  }

  return (
    <ApartamentCard>
      <NameDiv>
        <h1>{name}</h1>
      </NameDiv>

      <ResidentsDiv disabled={disableButtons}>
        <div>{calculateUserIcons()}</div>
        <p>
          {totalVacancies - avaliableVacancies}/{totalVacancies} moradores
        </p>
      </ResidentsDiv>

      <GenerateLinkDiv
        disabled={disabled || disableButtons}
        onClick={() => generateApartamentLink()}
      >
        {isLoading ? (
          <LoadingCircle color="white" width={50} loading={true} />
        ) : (
          <>
            <IonIcon className="icon" name="add-circle" />
            <p>Gerar convite</p>
          </>
        )}
      </GenerateLinkDiv>

      <MaintenaceRequestsDiv disabled={disableButtons}>
        <IonIcon className="icon" name="build" />
        <p>Reparos: {maintenaceRequests}</p>
      </MaintenaceRequestsDiv>
    </ApartamentCard>
  );
}

const ApartamentCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  height: 300px;
  width: 28%;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 4px;
  padding-bottom: 20px;
  text-align: center;

  color: ${MAIN_COLOR};
  -webkit-box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.36);
  box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.36);

  .icon {
    font-size: 25px;
  }

  button {
    border: none;
  }

  @media (max-width: 600px) {
    width: 90%;
    flex-direction: row;
    height: 80px;
    padding-bottom: 0px;
  }
`;

const NameDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid black;
  width: 40%;
  h1 {
    padding-bottom: 5px;
    margin-top: 20px;
    font-size: 40px;
    font-weight: bold;
  }

  @media (max-width: 600px) {
    border-bottom: none;
    border-right: 2px solid black;
    height: 60%;
    padding-bottom: 5px;
    padding-right: 3px;
    width: 20%;
    h1 {
      font-size: 25px;
    }
  }
`;

const ResidentsDiv = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${MAIN_COLOR};
  color: white;
  cursor: pointer;

  width: 80%;
  height: 50px;

  border-radius: 3px;

  @media (max-width: 600px) {
    width: 20%;
    font-size: 10px;
    margin: 0 10px;
  }
`;

const GenerateLinkDiv = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${MAIN_COLOR};
  color: white;
  width: 80%;
  height: 50px;
  cursor: pointer;

  border-radius: 3px;

  @media (max-width: 600px) {
    width: 20%;
    font-size: 10px;
    margin: 0 10px;
  }

  &:disabled {
    background-color: gray;
    color: lightgray;
  }
`;

const MaintenaceRequestsDiv = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${MAIN_COLOR};
  color: white;
  width: 80%;
  height: 50px;
  cursor: pointer;

  border-radius: 3px;
  @media (max-width: 600px) {
    width: 20%;
    font-size: 10px;
    margin: 0 10px;
  }
`;
