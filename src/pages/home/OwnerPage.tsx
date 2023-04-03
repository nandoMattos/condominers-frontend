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
  Option,
  Options,
  UserInfo,
} from "./ResidentPage";
import { getOwnerInfo } from "../../helpers/api/owner";
import { useNavigate } from "react-router-dom";

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
      toast.warn("Algo deu errado. Tente novamente mais tarde");
    }
    setLoading(false);
  }

  useEffect(() => {
    getOwnerData();
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
                <Bold>Prédio: </Bold>
                {ownerData?.Building.name}
              </p>
              <p>
                <Bold>Apartamentos:</Bold> 2/10 ocupados
              </p>
              <p>
                <Bold>Estacionamentos:</Bold> 0/10 ocupados
              </p>
            </div>
          </UserInfo>
          <ContainerOptions>
            <Options>
              <Option>
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
              <Option>
                <h1>Estacionamento</h1>
                <div>
                  <IonIcon name="car"></IonIcon>
                </div>
              </Option>
              <Option>
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
