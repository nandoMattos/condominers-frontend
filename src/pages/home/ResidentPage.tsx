import styled from "styled-components";
import BaseStructure from "./BaseStructure";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import { getResidentUser } from "../../helpers/api/resident";
import { ResidentUser } from "../../protocols";
import { MAIN_COLOR } from "../../assets/colors";
import IonIcon from "@reacticons/ionicons";
import { toast } from "react-toastify";
import LoadingCircle from "../../components/LoadingCircle";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ResidentPage() {
  const [residentData, setResidentData] = useState<null | ResidentUser>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { userInfo } = useContext(UserContext) as UserContextType;
  const user = userInfo.user;

  const navigate = useNavigate();

  async function getResidentData() {
    try {
      const data = await getResidentUser(user.id);
      setResidentData(data);
    } catch (err: any) {
      if (err.response.status === 440) {
        toast.warn("Sua sessão expirou.");
        return navigate("/login");
      }
      toast.warn("Algo deu errado. Tente novamente mais tarde");
    }
    setLoading(false);
  }

  useEffect(() => {
    getResidentData();
  }, []);

  function handleLogout() {
    Swal.fire({
      showCancelButton: true,
      title: "Deseja sair?",
      cancelButtonColor: "red",
      confirmButtonColor: "#1877f2",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.clear();
        navigate("/login");
      }
    });
  }

  return (
    <BaseStructure>
      {loading && <LoadingCircle height={70} loading={loading} color="white" />}

      {!loading && (
        <>
          {residentData?.Apartament ? (
            <>
              <UserInfo>
                <UserText>
                  <div className="flex">
                    <AccountCircleIcon fontSize="inherit" />
                  </div>
                </UserText>
                <div className="text">
                  <p>
                    <Bold>Apartamento: </Bold>
                    {residentData?.Apartament.name}
                  </p>
                  <p>
                    <Bold>Nome: </Bold>
                    {user?.name}
                  </p>
                </div>
                <Logout onClick={() => handleLogout()}>
                  <LogoutIcon fontSize="inherit" />
                </Logout>
              </UserInfo>
              <ContainerOptions>
                <Options>
                  <Option onClick={() => navigate("/maintenance")}>
                    <h1>Solicitar manutenção</h1>
                    <div>
                      <IonIcon name="build"></IonIcon>
                    </div>
                  </Option>
                  <Option onClick={() => navigate("/rent-space")}>
                    <h1>Agendar espaço</h1>
                    <div>
                      <IonIcon name="calendar-number"></IonIcon>
                    </div>
                  </Option>
                </Options>

                <Options>
                  <Option onClick={() => navigate("/my-requests")}>
                    <h1>Minhas solicitações</h1>
                    <div>
                      <IonIcon name="receipt"></IonIcon>
                    </div>
                  </Option>
                  <Option onClick={() => navigate("/report")}>
                    <h1>Reportar problema</h1>
                    <div>
                      <IonIcon name="alert-circle"></IonIcon>
                    </div>
                  </Option>
                </Options>
              </ContainerOptions>
            </>
          ) : (
            <Warning>
              Você não está em um apartamento. Peça um convite ao proprietário
            </Warning>
          )}
        </>
      )}
    </BaseStructure>
  );
}
export const UserInfo = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  color: black;
  background-color: white;
  width: 93%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 40px;
  border-radius: 3px;
  font-family: "Oswald", sans-serif;

  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* width: 30%; */
    font-size: 20px;
  }
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const UserText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 55px;
  color: white;
  background-color: ${MAIN_COLOR};
  border-radius: 5px;
  padding: 10px;
`;

export const Logout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${MAIN_COLOR};
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 55px;

  :hover {
    cursor: pointer;
    background-color: #232323;
    transition: all 0.2s;
  }
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
    transition: all 0.2s;
    background-color: #c4c4c4;
  }

  width: 44%;
  height: 130px;
  background-color: white;
  color: ${MAIN_COLOR};
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

const Warning = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding-top: 30px;
  width: 70%;
`;
