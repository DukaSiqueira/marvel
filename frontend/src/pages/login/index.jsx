import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { api } from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    await api.post("/login", {
      email,
      password,
    }).then((response) => {
      console.log(response.data);
      alert("Usuário logado com sucesso.");
      setEmail("");
      setPassword("");
      window.sessionStorage.setItem("token", response.data.token);
      window.sessionStorage.setItem("user_id", response.data.id);
      window.sessionStorage.setItem("user_name", response.data.name);
      window.location.href = "/home";
    }).catch((error) => {
      if (error.response.message) {
        alert(error.response.message);
      } else alert("Erro ao logar usuário. Tente novamente");
    })
  }

  return (
    <div className="bg-slate-300 w-screen h-screen flex items-center justify-center">
      <div className="bg-white border-t-4 border-solid rounded border-red-600 p-4">
        <h1 className="text-2xl font-bold text-center mb-5">Bem vindo</h1>
        <form className="flex flex-col gap-4">
          <TextField
            label="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="outlined"
            color="error"
          />
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            variant="outlined"
            color="error"
          />
          <Button variant="contained" color="error" onClick={handleLogin}>
            Login
          </Button>
        </form>
        <hr className="mt-8 mb-5 border-t-2 border-solid border-slate-500" />
        <p>Ainda não possui cadastro?<a className="text-red-600 font-semibold cursor-pointer" href="/register">&nbsp;Cadastre-se</a></p>
      </div>
    </div>
  );
};

export default Login;