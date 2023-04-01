import styled from "styled-components";
import BaseStructure from "./BaseStructure";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import { getResidentUser } from "../../helpers/api/resident";
import { ResidentUser } from "../../protocols";
import { MAIN_COLOR, SECONDARY_COLOR } from "../../assets/colors";
import IonIcon from "@reacticons/ionicons";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import LoadingCircle from "../../components/LoadingCircle";

export default function ResidentPage() {
  const [residentData, setResidentData] = useState<null | ResidentUser>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { userInfo } = useContext(UserContext) as UserContextType;
  const user = userInfo.user;

  async function getResidentData() {
    try {
      const data = await getResidentUser(user.id);
      setResidentData(data);
    } catch (err: any) {
      toast.warn("Algo deu errado. Tente novamente mais tarde");
    }
    setLoading(false);
  }
  console.log(residentData);

  useEffect(() => {
    getResidentData();
  }, []);

  return (
    <BaseStructure>
      {loading && (
        <LoadingCircle height={70} loading={loading} color={MAIN_COLOR} />
      )}

      {!loading && (
        <>
          <UserInfo>
            <h1>Olá, {user.name}</h1>
            <div>
              <p>
                <Bold>Prédio:</Bold> {residentData?.Apartament?.Building.name}{" "}
              </p>
              <p>
                <Bold>Apartamento:</Bold> {residentData?.Apartament?.name}{" "}
              </p>
              {residentData?.ParkingLot && (
                <p>Estacionamento: {residentData.ParkingLot?.name}</p>
              )}
            </div>
          </UserInfo>
          <ContainerOptions>
            <Options>
              <Option>
                <h1>Solicitar manutenção</h1>
                <div>
                  {/* <IonIcon name="add-circle"></IonIcon> */}
                  <IonIcon name="hammer"></IonIcon>
                </div>
              </Option>
              <Option>
                <h1>Agendar espaço</h1>
                <div>
                  {/* <IonIcon name="add-circle"></IonIcon> */}
                  <IonIcon name="calendar-number"></IonIcon>
                </div>
              </Option>
            </Options>

            <Options>
              <Option>
                <h1>Reportar problema</h1>
                <div>
                  <IonIcon name="alert-circle"></IonIcon>
                </div>
              </Option>
              <Option>
                <h1>Minhas solicitações</h1>
                <div>
                  <IonIcon name="receipt"></IonIcon>
                </div>
              </Option>
            </Options>
          </ContainerOptions>
        </>
      )}
    </BaseStructure>
  );
}
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 50px;

  h1 {
    font-family: "Varela", sans-serif;
    font-size: 30px;
  }

  p {
    margin-bottom: 10px;
  }

  height: 30%;
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const ContainerOptions = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-around;

  width: 100%;
  height: fit-content;
  margin-bottom: 30px;
`;

export const Option = styled.div`
  display: flex;
  flex-direction: column;

  cursor: pointer;
  :hover {
    transition: all 0.4s;
    background-color: ${MAIN_COLOR};
  }

  width: 44%;
  height: 130px;
  background-color: ${SECONDARY_COLOR};
  color: white;
  border-radius: 5px;

  font-size: 24px;
  font-weight: bold;
  font-family: "Oswald", sans-serif;

  h1 {
    padding-top: 10px;
    margin: 0 auto;
  }
  div {
    padding-top: 20px;
    margin: 0 auto;
    font-size: 40px;
  }
`;
