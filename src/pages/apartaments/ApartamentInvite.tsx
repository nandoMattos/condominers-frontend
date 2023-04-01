import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { joinApartament } from "../../helpers/api/apartaments";
import { toast } from "react-toastify";
import BaseStructure from "../home/BaseStructure";
import Button from "../../assets/styles/Button";
import Header from "../../components/Header";

export default function ApartamentInvite() {
  const { jwToken } = useParams();
  const originalToken = jwToken?.replaceAll("*", ".");
  const navigate = useNavigate();

  async function tryJoinApartament() {
    try {
      await joinApartament(originalToken);
      toast.success("boa");
      navigate("/");
    } catch (err) {
      console.log(err);
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
