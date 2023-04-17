import { useEffect, useState } from "react";
import BaseStructure from "../home/BaseStructure";
import {
  LeisureSpaceFormat,
  RentSpace,
  getLeisureSpaces,
  getSpaceHistoricById,
} from "../../helpers/api/leisure-space";
import LoadingCircle from "../../components/LoadingCircle";
import styled from "styled-components";
import { toast } from "react-toastify";
import Carousel from "../rent-space/Carousel";
import RentHistoricCard from "./RentHistoricCard";

export default function SpacesPage() {
  const [loading, setLoading] = useState(true);
  const [spaces, setSpaces] = useState<LeisureSpaceFormat[] | undefined>(
    undefined
  );
  const [selectedSpaceId, setSelectedSpaceId] = useState(0);
  const [historicLoading, setHistoricLoading] = useState(false);
  const [historic, setHistoric] = useState<undefined | RentSpace[]>(undefined);

  async function getSpaces() {
    try {
      const spacesNow = await getLeisureSpaces();
      setSpaces(spacesNow);
      setLoading(false);
    } catch (err) {
      toast.warning("Algo deu errado, tente novamente mais tarde");
    }
  }

  async function getSpaceHistoric() {
    try {
      const historicNow = await getSpaceHistoricById(selectedSpaceId);
      setHistoric(historicNow);
      setHistoricLoading(false);
    } catch (err) {
      toast.warning("Algo deu errado, tente novamente mais tarde");
    }
  }

  useEffect(() => {
    getSpaces();
    if (selectedSpaceId) {
      getSpaceHistoric();
    }
  }, [selectedSpaceId]);

  return (
    <BaseStructure>
      <LoadingCircle color="white" loading={loading} />

      {!loading && (
        <Main>
          <TitleDiv>
            <h1 className="page">Espaços</h1>
            <h2 className="page">Clique para ver o histórico de agendamento</h2>
          </TitleDiv>
          <SpacesContainer>
            <Carousel
              setScheduleLoading={setHistoricLoading}
              selectedSpaceId={selectedSpaceId}
              setSelectedSapceId={setSelectedSpaceId}
              spaces={spaces}
            />
          </SpacesContainer>
          {selectedSpaceId ? (
            <Wrapper>
              {historicLoading ? (
                <LoadingCircle color="white" loading={historicLoading} />
              ) : (
                historic?.map((r) => (
                  <RentHistoricCard
                    key={r.id}
                    User={r.User}
                    createdAt={r.createdAt}
                    day_rent={r.day_rent}
                  />
                ))
              )}
            </Wrapper>
          ) : (
            ""
          )}
        </Main>
      )}
    </BaseStructure>
  );
}

const Main = styled.div`
  min-height: 400px;
  color: black;
  h1 {
    font-size: 60px;
    font-family: "Oswald", sans-serif;
  }

  .page {
    color: white;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 110px;
  margin-bottom: 15px;

  h2 {
    padding: 10px;
    text-align: center;
  }
`;

const SpacesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-family: "Varela", sans-serif;

  h1 {
    font-weight: bold;
    margin: 20px 0;
    font-size: 30px;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
`;
