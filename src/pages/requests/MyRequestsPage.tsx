import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BaseStructure from "../home/BaseStructure";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import RequestCard from "./RequestCard";
import LoadingCircle from "../../components/LoadingCircle";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import { RequestsParsed, getUserRequests } from "../../helpers/api/requests";
import { toast } from "react-toastify";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RentCard from "./RentCard";

export default function MyRequestsPage() {
  const [loading, setLoading] = useState(true);
  const [opennedReq, setOpennedReq] = useState(false);
  const [opennedRent, setOpennedRent] = useState(false);
  const [requests, setRequests] = useState<undefined | RequestsParsed>(
    undefined
  );

  const { userInfo } = useContext(UserContext) as UserContextType;
  const user = userInfo.user;

  async function tryGetUserRequests() {
    try {
      const requestsNow = await getUserRequests(user.id);
      setRequests(requestsNow);
      setLoading(false);
    } catch (err) {
      toast.warning("Algo deu errado, tente novamente mais tarde.");
    }
  }

  useEffect(() => {
    tryGetUserRequests();
  }, []);

  return (
    <BaseStructure className="scrollable">
      {loading && <LoadingCircle height={70} loading={loading} color="white" />}
      {!loading && (
        <Main>
          <Title>Registro de Atividades</Title>

          <Lists>
            <ListItemButton onClick={() => setOpennedReq(!opennedReq)}>
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary="Pedidos" />
              {opennedReq ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={opennedReq} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListWrapper>
                  {requests?.allUnsolved.map((s, i) => (
                    <RequestCard
                      solved={false}
                      key={i}
                      createdAt={s.createdAt}
                      id={s.id}
                      description={s.description}
                      type={s.type}
                    />
                  ))}
                  {requests?.allSolved.map((u, i) => (
                    <RequestCard
                      solved={true}
                      createdAt={u.createdAt}
                      description={u.description}
                      id={u.id}
                      type={u.type}
                      key={i}
                    />
                  ))}
                </ListWrapper>
              </List>
            </Collapse>
          </Lists>

          <Lists>
            <ListItemButton onClick={() => setOpennedRent(!opennedRent)}>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Agendamentos" />
              {opennedRent ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={opennedRent} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListWrapper>
                  {requests?.rents.map((r) => (
                    <RentCard
                      key={r.id}
                      LeisureSpace={r.LeisureSpace}
                      createdAt={r.createdAt}
                      day_rent={r.day_rent}
                    />
                  ))}
                </ListWrapper>
              </List>
            </Collapse>
          </Lists>
        </Main>
      )}
    </BaseStructure>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
`;

const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  margin: 20px 0;
  font-family: "Oswald", sans-serif;
`;

const Lists = styled.div`
  background-color: white;
  width: 80%;
  border-radius: 3px;
  color: black;
  margin-bottom: 20px; ;
`;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
