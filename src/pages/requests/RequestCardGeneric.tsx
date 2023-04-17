import styled from "styled-components";
import {
  MaintenanceRequests,
  Reports,
  markMaintenanceAsSolved,
  markReportAsSolved,
} from "../../helpers/api/requests";
import dayjs from "dayjs";
import IonIcon from "@reacticons/ionicons";
import Swal from "sweetalert2";
import React from "react";
import { Requests } from "./AllRequestsPage";
import { toast } from "react-toastify";

type props = Partial<MaintenanceRequests & Reports> & {
  requests: Requests;
  setRequests: React.Dispatch<React.SetStateAction<Requests | undefined>>;
  username?: string;
};

export default function RequestCardGeneric({
  id,
  description,
  solved,
  updatedAt,
  createdAt,
  Apartament,
  setRequests,
  requests,
  apartamentId,
  username,
}: props) {
  function maintenanceSolved() {
    const maintenances = requests.Maintenances;
    for (let i = 0; i < maintenances.length; i++) {
      if (maintenances[i].id === id) {
        maintenances[i].solved = true;
      }
    }
    setRequests({
      Maintenances: maintenances,
      Reports: requests.Reports,
    });
  }

  function reportSolved() {
    const reports = requests.Reports;
    for (let i = 0; i < reports.length; i++) {
      if (reports[i].id === id) {
        reports[i].solved = true;
      }
    }
    setRequests({
      Maintenances: requests.Maintenances,
      Reports: reports,
    });
  }

  function handleClick() {
    Swal.fire({
      title: "Deseja marcar como feito?",
      text: "Essa ação não poderá ser desfeita.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Continuar",
    }).then(async (r) => {
      if (r.isConfirmed) {
        try {
          if (apartamentId) {
            await markMaintenanceAsSolved(id);
            maintenanceSolved();
          } else {
            await markReportAsSolved(id);
            reportSolved();
          }
        } catch (err) {
          toast("Algo deu errado, tente novamente mais tarde");
        }
      }
    });
  }

  return (
    <CardContainer transparent={solved ? true : false}>
      <Title color={solved ? "green" : "#f0e111"}>
        <span>
          {apartamentId ? (
            <h1>Apartamento {Apartament?.name}</h1>
          ) : (
            <h1>{username} (morador)</h1>
          )}
        </span>
        <p>Aberto em: {dayjs(createdAt).format("DD/MM/YYYY")}</p>
      </Title>
      <ButtonDiv>
        <p id="desc">&quot;{description}&quot;</p>
        {!solved ? (
          <button onClick={() => handleClick()}>
            <span>Resolvido</span>
            <IonIcon className="bigger" name="checkmark-circle-outline" />
          </button>
        ) : (
          <p id="solvedText">
            Resolvido em: {dayjs(updatedAt).format("DD/MM/YYYY")}
          </p>
        )}
      </ButtonDiv>
    </CardContainer>
  );
}

export const CardContainer = styled.div<{ transparent: boolean }>`
  background-color: #e8e6e6;
  width: 95%;
  height: fit-content;
  margin: 10px;
  padding: 10px;
  font-size: 15px;
  opacity: ${({ transparent }) => (transparent ? "60%" : "none")};
  border-radius: 3px;

  #desc {
    padding-top: 10px;
  }
`;

const Title = styled.div<{ color: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ color }) => color};
  padding-bottom: 5px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-weight: bold;
    font-size: 18px;
  }
  p {
    font-size: 13px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ButtonDiv = styled.div`
  /* background-color: red; */
  padding-bottom: 30px;
  width: 100%;
  height: 100%;
  position: relative;

  p {
    margin-bottom: 10px;
  }

  span {
    margin-left: 5px;
  }

  button {
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 3px;
    color: white;
    background-color: #519c15;
    border: none;
    position: absolute;
    right: 0;
  }

  .bigger {
    font-size: 20px;
  }

  #solvedText {
    font-size: 12px;
  }
`;
