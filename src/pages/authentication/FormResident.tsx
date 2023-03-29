import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../assets/styles/Button";
import { loginAsResident } from "../../helpers/api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormResident() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleForm(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await loginAsResident(form);
      navigate("/");
    } catch (err: any) {
      console.log(err);
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
          Entrar como morador
        </Button>
        Não possui uma conta? Cadastre-se <Link to="a">aqui</Link>
      </Form>
    </FormContainer>
  );
}

export const FormContainer = styled.div`
  width: 100%;
`;

export const Form = styled.form`
  height: 200px;
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
