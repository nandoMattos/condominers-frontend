import styled from "styled-components";
import BaseStructure from "../home/BaseStructure";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  LeisureSpaceFormat,
  getLeisureSpaces,
  getSpaceSchedule,
  rentSpace,
} from "../../helpers/api/leisure-space";
import LoadingCircle from "../../components/LoadingCircle";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Button from "../../assets/styles/Button";
import utc from "dayjs/plugin/utc";

export default function RentSpacePage() {
  dayjs.extend(utc);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [spaces, setSpaces] = useState<LeisureSpaceFormat[] | undefined>(
    undefined
  );
  const [selectedSpaceId, setSelectedSapceId] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [spaceSchedule, setDaySchedule] = useState<any>(undefined);
  const navigate = useNavigate();

  async function getSpaces() {
    try {
      const leisureSpaces = await getLeisureSpaces();
      setSpaces(leisureSpaces);
      setPageLoading(false);
    } catch (err: any) {
      if (err.response.status === 440) {
        toast.warn("Sua sessão expirou.");
        return navigate("/login");
      }
      toast.warning("Aldo deu errado, tente novamente mais tarde");
    }
  }

  async function getSchedule() {
    try {
      const spaceSchedule = await getSpaceSchedule(selectedSpaceId);
      setDaySchedule(spaceSchedule);
      setScheduleLoading(false);
    } catch (err: any) {
      if (err.response.status === 440) {
        toast.warn("Sua sessão expirou.");
        return navigate("/login");
      }
      toast.warning("Algo deu errado, tente novamente mais tarde");
    }
  }

  async function handleClick() {
    try {
      await rentSpace(selectedSpaceId, startDate);
      setDaySchedule([...spaceSchedule, startDate]);
      setStartDate(null);
      toast.success("Espaço agendado com sucesso!");
    } catch (err: any) {
      toast.warning("Algo deu errado, tente novamente mais tarde");
    }
  }

  useEffect(() => {
    getSpaces();
    if (scheduleLoading) {
      setStartDate(null);
      getSchedule();
    }
  }, [scheduleLoading]);

  return (
    <BaseStructure>
      <Main>
        {pageLoading && <LoadingCircle color="white" loading={pageLoading} />}

        {!pageLoading && (
          <>
            <h1>Escolha um espaço:</h1>
            <Carousel
              setScheduleLoading={setScheduleLoading}
              selectedSpaceId={selectedSpaceId}
              setSelectedSapceId={setSelectedSapceId}
              spaces={spaces}
            />

            {selectedSpaceId ? (
              <>
                {scheduleLoading ? (
                  <LoadingCircle color="white" loading={scheduleLoading} />
                ) : (
                  <ConfirmRent>
                    <p>Defina uma data:</p>
                    <DivCalendar>
                      <DatePicker
                        placeholderText={dayjs().format("DD/MM/YYYY")}
                        excludeDates={spaceSchedule}
                        minDate={new Date()}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </DivCalendar>
                    {startDate && (
                      <Button onClick={() => handleClick()} width="100px">
                        Agendar
                      </Button>
                    )}
                  </ConfirmRent>
                )}
              </>
            ) : (
              ""
            )}
          </>
        )}
      </Main>
    </BaseStructure>
  );
}

const Main = styled.main`
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

const DivCalendar = styled.div``;

const ConfirmRent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 30px;
  width: 80%;
  height: 100px;
  p {
    margin-bottom: 10px;
  }
  button {
    margin-top: 10px;
  }
`;
