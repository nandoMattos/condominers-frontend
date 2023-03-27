import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../assets/styles/Button";
import { Form, FormContainer } from "./FormResident";

export default function FormOwner() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    token: "",
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
        <input
          value={form.token}
          type="password"
          name="password"
          placeholder="token"
          onChange={handleForm}
        />
        <Button width="100%">Entrar</Button>
        Não tem uma conta? Cadastre-se <Link to="a">aqui</Link>
      </Form>
    </FormContainer>
  );
}
