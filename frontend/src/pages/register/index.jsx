import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { api } from "../../services/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("As senhas não coincidem");
      return;
    }

    await api
      .post("/users", {
        name,
        email,
        password,
        birth_date,
      })
      .then((response) => {
        console.log(response);
        alert("Usuário cadastrado com sucesso.\n\nVocê será redirecionado para a página de login.");
        setName("");
        setEmail("");
        setPassword("");
        setBirthDate("");
        setConfirm("");
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response.message) {
          alert(error.response.message);
        } else alert("Erro ao cadastrar usuário. Tente novamente");
      });
  };

  return (
    <div className="bg-slate-300 w-screen h-screen flex items-center justify-center">
      <div className="bg-white border-t-4 border-solid rounded border-red-600 p-4 w-6/12">
        <h1 className="text-2xl font-bold text-center mb-5">Cadastro</h1>
        <form className="flex flex-col gap-4">
          <TextField
            label="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
            variant="outlined"
            color="error"
          />
          <TextField
            label="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="outlined"
            color="error"
          />
          <TextField
            label="Data de Nascimento"
            type="date"
            onChange={(e) => setBirthDate(e.target.value)}
            value={birth_date}
            variant="outlined"
            color="error"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            variant="outlined"
            type="password"
            color="error"
          />
          <TextField
            label="Confirme a senha"
            onChange={(e) => setConfirm(e.target.value)}
            value={confirm}
            variant="outlined"
            color="error"
            type="password"
          />
          <Button variant="contained" color="error" onClick={handleSubmit}>
            Cadastrar
          </Button>
        </form>
        <hr className="mt-8 mb-5 border-t-2 border-solid border-slate-500" />
        <p>
          Já possui cadastro?
          <a className="text-red-600 font-semibold cursor-pointer" href="/">
            &nbsp;Faça login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
