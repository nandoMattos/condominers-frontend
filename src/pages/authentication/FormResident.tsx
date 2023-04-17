import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../assets/styles/Button";
import { loginAsResident } from "../../helpers/api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import LoadingCircle from "../../components/LoadingCircle";

export default function FormResident() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext) as UserContextType;

  function handleForm(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginAsResident(form);
      setUserInfo(data);
      navigate("/");
    } catch (err: any) {
      setLoading(false);
      if (err.response.status == 401)
        return toast.warning("Email ou senha inválidos");
      return toast.warn("Algo de errado, tente novamente mais tarde");
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <input
          value={form.email}
          type="email"
          name="email"
          placeholder="email"
          onChange={handleForm}
          required
        />
        <input
          value={form.password}
          type="password"
          name="password"
          placeholder="senha"
          onChange={handleForm}
          required
          minLength={5}
        />
        <Button type="submit" width="100%">
          {loading ? (
            <LoadingCircle color="white" width={50} loading={loading} />
          ) : (
            "Entrar"
          )}
        </Button>
        <TextSignUp>
          Não possui uma conta? Cadastre-se <Link to="/sign-up">aqui</Link>
        </TextSignUp>
      </Form>
    </FormContainer>
  );
}

export const FormContainer = styled.div`
  width: 100%;
`;

export const Form = styled.form`
  height: fit-content;
  input {
    font-family: "Oswald";
    font-size: 20px;
    font-weight: bold;

    padding-left: 10px;
  }
  a {
    color: white;
  }
`;

export const TextSignUp = styled.div`
  width: 100%;
  font-size: 15px;
  margin-top: 10px;
`;
