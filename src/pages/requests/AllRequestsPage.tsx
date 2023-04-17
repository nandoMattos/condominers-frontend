import styled from "styled-components";
import BaseStructure from "../home/BaseStructure";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LoadingCircle from "../../components/LoadingCircle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  MaintenanceRequests,
  Reports,
  getAllRequests,
} from "../../helpers/api/requests";
import RequestCardGeneric from "./RequestCardGeneric";
import { Main } from "./MyRequestsPage";

export type Requests = {
  Maintenances: MaintenanceRequests[];
  Reports: Reports[];
};

export default function AllRequestsPage() {
  const [opennedMaintenance, setOpennedMaintenance] = useState(false);
  const [opennedReports, setOpennedReports] = useState(false);
  const [requests, setRequests] = useState<undefined | Requests>(undefined);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function tryGetAllRequests() {
    try {
      const requestsNow = await getAllRequests();
      setRequests(requestsNow);
      setLoading(false);
    } catch (err: any) {
      if (err.response.status === 440) {
        toast.warn("Sua sessão expirou.");
        return navigate("/login");
      }
      toast.warning("Algo deu errado, tente novamente mais tarde");
    }
  }

  useEffect(() => {
    tryGetAllRequests();
  }, []);

  return (
    <BaseStructure>
      {loading && <LoadingCircle loading={loading} color="white" />}

      {!loading && (
        <Main>
          <Title>Notificações</Title>
          <Lists>
            <ListItemButton
              onClick={() => setOpennedMaintenance(!opennedMaintenance)}
            >
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary="Manutenções" />
              {opennedMaintenance ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={opennedMaintenance} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListWrapper>
                  {requests?.Maintenances.map((m) => (
                    <RequestCardGeneric
                      id={m.id}
                      requests={requests}
                      setRequests={setRequests}
                      Apartament={m.Apartament}
                      key={m.id}
                      description={m.description}
                      solved={m.solved}
                      updatedAt={m.updatedAt}
                      apartamentId={m.apartamentId}
                      createdAt={m.createdAt}
                    />
                  ))}
                </ListWrapper>
              </List>
            </Collapse>
          </Lists>

          <Lists>
            <ListItemButton onClick={() => setOpennedReports(!opennedReports)}>
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary="Reclamações" />
              {opennedReports ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={opennedReports} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListWrapper>
                  {requests?.Reports.map((m) => (
                    <RequestCardGeneric
                      id={m.id}
                      requests={requests}
                      setRequests={setRequests}
                      key={m.id}
                      description={m.description}
                      solved={m.solved}
                      updatedAt={m.updatedAt}
                      username={m.User.name}
                      createdAt={m.createdAt}
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

const Title = styled.h1`
  font-size: 50px;
  margin: 30px;
  font-family: "Oswald", sans-serif;
`;
