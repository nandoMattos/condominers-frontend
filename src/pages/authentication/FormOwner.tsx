import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../assets/styles/Button";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import { loginAsOwner } from "../../helpers/api/auth";
import { Form, FormContainer } from "./FormResident";
import LoadingCircle from "../../components/LoadingCircle";

export default function FormOwner() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    token: "",
  });
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext) as UserContextType;
  const [loading, setLoading] = useState(false);

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
      const data = await loginAsOwner(form);
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
        <input
          value={form.token}
          type="password"
          name="token"
          placeholder="chave de acesso"
          onChange={handleForm}
          required
        />
        <Button type="submit" width="100%">
          {loading ? (
            <LoadingCircle color="white" width={50} loading={loading} />
          ) : (
            "Entrar"
          )}
        </Button>
      </Form>
    </FormContainer>
  );
}
