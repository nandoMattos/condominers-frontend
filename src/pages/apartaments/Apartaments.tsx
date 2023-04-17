import styled from "styled-components";
import Header from "../../components/Header";
import BaseStructure from "../home/BaseStructure";
import LoadingCircle from "../../components/LoadingCircle";
import { useEffect, useState } from "react";
import { getAllApartaments } from "../../helpers/api/apartaments";
import { ApartamentsInfo } from "../../protocols";
import { toast } from "react-toastify";
import Apartament from "./Apartament";
import { useNavigate } from "react-router-dom";

export default function Apartaments() {
  const [loading, setLoading] = useState<boolean>(true);
  const [apartaments, setApartaments] = useState<null | ApartamentsInfo[]>(
    null
  );
  const [inviteLoading, setInviteLoading] = useState(0);

  const navigate = useNavigate();

  async function getApartamentsInfo() {
    try {
      const apartaments = await getAllApartaments();
      setApartaments(apartaments);
      setLoading(false);
    } catch (err: any) {
      if (err.response.status === 440) {
        toast.warn("Sua sessão expirou.");
        return navigate("/login");
      }
      toast.warning("Algo deu errado, tente novamente mais tarde.");
      setLoading(false);
    }
  }

  useEffect(() => {
    getApartamentsInfo();
  }, []);

  return (
    <BaseStructure>
      {loading && <LoadingCircle height={70} loading={loading} color="white" />}

      {!loading && (
        <Main>
          <Title>
            <h1>Apartamentos</h1>
          </Title>
          <div className="wrapper">
            <ApartamentsContainer>
              {apartaments?.map((a) => (
                <Apartament
                  id={a.id}
                  name={a.name}
                  avaliableVacancies={a.avaliableVacancies}
                  maintenaceRequests={a.maintenaceRequests}
                  totalVacancies={a.totalVacancies}
                  isLoading={a.id === inviteLoading}
                  setInviteLoading={setInviteLoading}
                  disabled={
                    a.totalVacancies - a.avaliableVacancies >= a.totalVacancies
                  }
                  key={a.id}
                />
              ))}
            </ApartamentsContainer>
          </div>
        </Main>
      )}
      <Header />
    </BaseStructure>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .wrapper {
    display: flex;
    justify-content: center;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;

  h1 {
    color: white;
    font-size: 60px;
    font-family: "Oswald", sans-serif;
  }
`;

const ApartamentsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  list-style-type: none;
  width: 80%;
`;
