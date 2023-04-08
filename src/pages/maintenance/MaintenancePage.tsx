import styled from "styled-components";
import BaseStructure from "../home/BaseStructure";
import Button from "../../assets/styles/Button";
import React, { useContext, useEffect, useState } from "react";
import { getResidentUser } from "../../helpers/api/resident";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ResidentUser } from "../../protocols";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import LoadingCircle from "../../components/LoadingCircle";
import { postMaintenance } from "../../helpers/api/maintenance";
import Swal from "sweetalert2";

export default function MaintenancePage() {
  const [residentData, setResidentData] = useState<null | ResidentUser>(null);
  const [description, setDescription] = useState<undefined | string>(undefined);
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

  async function confirmMaintenance() {
    Swal.fire({
      title: "Tem certeza?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Solicitar manutenção",
    }).then(async (r) => {
      if (r.isConfirmed) {
        try {
          await postMaintenance(residentData?.Apartament?.id, description);
        } catch (err) {
          toast("Algo deu errado, tente novamente mais tarde");
        }
      }
    });
  }

  function handleForm(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  return (
    <BaseStructure>
      {loading && <LoadingCircle height={70} loading={loading} color="white" />}

      {!loading && (
        <Wrap>
          <PaperDiv>
            <h1>Manutenção</h1>
            <User>
              <p>Nome: Luiz Fernando</p>
              <p>Apartamento: 101</p>
            </User>

            <FormDiv>
              <label htmlFor="description">Descreva o problema:</label>
              <textarea
                onChange={handleForm}
                id="description"
                placeholder="ex: Estou com problemas no encanamento e gostaria..."
              ></textarea>

              <Button onClick={() => confirmMaintenance()}>
                Solicitar Manutenção
              </Button>
            </FormDiv>
          </PaperDiv>
        </Wrap>
      )}
    </BaseStructure>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const PaperDiv = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 70%;
  height: 90%;
  background-color: white;
  border-radius: 2px;

  h1 {
    text-align: center;
    font-family: "Oswald", sans-serif;
    font-size: 50px;
  }
`;

const User = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  padding: 10px;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  #description {
    width: 90%;
    height: 60%;
    margin-top: 10px;
    resize: none;
    background-color: #cccccc;
    :focus {
      /* border: none; */
      outline: none;
    }
  }
`;
