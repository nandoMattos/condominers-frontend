import {
  FormContainerAuth,
  FormWraper,
  HeaderWrap,
  Page,
  Wraper,
} from "./AuthPage";
import logo from "../../assets/images/building.png";
import { Form, TextSignUp } from "./FormResident";
import React, { useState } from "react";
import Button from "../../assets/styles/Button";
import LoadingCircle from "../../components/LoadingCircle";
import { toast } from "react-toastify";
import { singUp } from "../../helpers/api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
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
    setLoading(true);
    try {
      await singUp(form);
      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      toast.warning("Algo deu errado, tente novamente mais tarde");
    }
    setLoading(false);
  }

  return (
    <Page>
      <Wraper>
        <HeaderWrap>
          <img src={logo} />
          <h1>Condominers</h1>
        </HeaderWrap>
        <FormWraper>
          <h2>Registrar-se (morador)</h2>
          <FormContainerAuth>
            <Form onSubmit={handleSubmit}>
              <input
                value={form.name}
                type="text"
                name="name"
                placeholder="nome"
                onChange={handleForm}
                required
              />
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
                  "Registrar"
                )}
              </Button>
              <TextSignUp>
                Ja possui uma conta? Entre <Link to="/login">aqui</Link>
              </TextSignUp>
            </Form>
          </FormContainerAuth>
        </FormWraper>
      </Wraper>
    </Page>
  );
}
