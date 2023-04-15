import styled from "styled-components";
import BaseStructure from "../home/BaseStructure";
import postIt from "../../assets/images/pinnedPaper.png";
import Button from "../../assets/styles/Button";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { postReport } from "../../helpers/api/reports";
import { useNavigate } from "react-router-dom";

export default function ReportPage() {
  const [description, setDescription] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  const navigate = useNavigate();

  function confirmReport() {
    Swal.fire({
      title: "Tem certeza?",
      text: "Deseja enviar a reclamação? Além de você, apenas o proprietário poderá ver suas solicitações.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Enviar",
    }).then(async (r) => {
      if (r.isConfirmed) {
        try {
          await postReport(description);
          toast.success("Sua mensagem foi enviada.");
          setDescription("");
        } catch (err: any) {
          if (err.response.status === 440) {
            toast.warn("Sua sessão expirou.");
            return navigate("/login");
          }
          if (!description) {
            return toast.warning("Digite uma mensagem válida.");
          }
          toast.warning("Algo deu errado, tente novamente mais tarde");
        }
      }
    });
  }

  return (
    <BaseStructure>
      <Main>
        <Paper>
          <h1>Insira sua reclamação (imagem opcional)</h1>
          <textarea
            onChange={handleChange}
            placeholder="ex: O morador do 103 fez barulho até 2 da manhã e..."
            value={description}
          />
          <input type="file" multiple accept="image/*" />
          <Button onClick={() => confirmReport()}>Enviar</Button>
        </Paper>
      </Main>
    </BaseStructure>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  min-height: 450px;
  background-image: url(${postIt});
  background-size: 450px;
  background-position: center;
  background-repeat: no-repeat;
`;

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  width: 50%;
  height: 350px;
  /* background-color: blue; */

  h1 {
    margin-top: 10px;
  }

  textarea {
    margin-top: 20px;
    height: 60%;
    padding: 10px;
    resize: none;
    :focus {
      outline: none;
    }
  }

  button {
    margin-top: 20px;
  }

  input {
    margin-top: 10px;
  }
  @media (max-width: 600px) {
    padding: 30px;
    width: 100%;
  }
`;
