import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { joinApartament } from "../../helpers/api/apartaments";
import { toast } from "react-toastify";
import BaseStructure from "../home/BaseStructure";
import Header from "../../components/Header";

export default function ApartamentInvite() {
  const { jwToken } = useParams();
  const originalToken = jwToken?.replaceAll("*", ".");
  const navigate = useNavigate();

  async function tryJoinApartament() {
    try {
      await joinApartament(originalToken);
      toast.success("Você entrou no apartamento!");
      navigate("/");
    } catch (err: any) {
      if (err.response.status === 440) {
        toast.warning("Sua sessão expirou.");
        return navigate("/login");
      }
      if (err.response.status === 409) {
        toast.success("Você já está nesse apartamento.");
        return navigate("/");
      }
      toast.warning("Algo deu errado, tente novamento mais tarde.");
    }
  }

  useEffect(() => {
    tryJoinApartament();
  }, []);

  return (
    <BaseStructure>
      <Header />
    </BaseStructure>
  );
}
