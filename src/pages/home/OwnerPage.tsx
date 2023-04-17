import BaseStructure from "./BaseStructure";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import { OwnerUser } from "../../protocols";
import { MAIN_COLOR } from "../../assets/colors";
import IonIcon from "@reacticons/ionicons";
import { toast } from "react-toastify";
import LoadingCircle from "../../components/LoadingCircle";
import {
  Bold,
  ContainerOptions,
  Logout,
  Option,
  Options,
  UserInfo,
  UserText,
} from "./ResidentPage";
import { getOwnerInfo } from "../../helpers/api/owner";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Swal from "sweetalert2";

export default function OwnerPage() {
  const [ownerData, setOwnerData] = useState<null | OwnerUser>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { userInfo } = useContext(UserContext) as UserContextType;
  const user = userInfo.user;
  const navigate = useNavigate();

  async function getOwnerData() {
    try {
      const data = (await getOwnerInfo(user.id)) as unknown as OwnerUser;
      setOwnerData(data);
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
    getOwnerData();
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
      {loading && (
        <LoadingCircle height={70} loading={loading} color={MAIN_COLOR} />
      )}

      {!loading && (
        <>
          <UserInfo>
            <UserText>
              <div className="flex">
                <AdminPanelSettingsIcon fontSize="inherit" />
              </div>
            </UserText>
            <div className="text">
              <p>
                <Bold>Prédio: </Bold>
                {ownerData?.Building.name}
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
              <Option onClick={() => navigate("/requests")}>
                <h1>Caixa de entrada</h1>
                <div>
                  <IonIcon name="mail"></IonIcon>
                </div>
              </Option>
              <Option onClick={() => navigate("/apartaments")}>
                <h1>Apartamentos</h1>
                <div>
                  <IonIcon name="business"></IonIcon>
                </div>
              </Option>
            </Options>

            <Options>
              <Option
                onClick={() =>
                  Swal.fire({
                    title: "Ops!",
                    icon: "warning",
                    text: "Essa funcionalidade não está disponível",
                  })
                }
              >
                <h1>Estacionamento</h1>
                <div>
                  <IonIcon name="car"></IonIcon>
                </div>
              </Option>
              <Option onClick={() => navigate("/spaces")}>
                <h1>Espaços de lazer</h1>
                <div>
                  <IonIcon name="pizza"></IonIcon>
                </div>
              </Option>
            </Options>
          </ContainerOptions>
        </>
      )}
    </BaseStructure>
  );
}
