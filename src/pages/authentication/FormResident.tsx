import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../assets/styles/Button";

export default function FormResident() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  console.log(form);

  function handleForm(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <FormContainer>
      <Form>
        <input
          value={form.email}
          type="text"
          name="email"
          placeholder="email"
          onChange={handleForm}
        />
        <input
          value={form.password}
          type="password"
          name="password"
          placeholder="senha"
          onChange={handleForm}
        />
        <Button width="100%">Entrar</Button>
        Não tem uma conta? Cadastre-se <Link to="a">aqui</Link>
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
