import { useEffect } from "react";
import MyTable from "../../components/table";
import { api } from "../../services/api";
import AuthLayout from "../../template/authLayout";
import { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(true);
  const getUsers = async () => {
    const token = sessionStorage.getItem("token");
    const res = await api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data.map((user) => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            birth: Intl.DateTimeFormat("pt-BR").format(
              new Date(user.birth_date)
            ),
          };
        });
      });

    setUsers(res);
    setLoad(false);
  };

  const removeUser = async (user) => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("user_id");

    if (Number(userId) === user.id) {
      alert("Você não pode deletar a si mesmo.");
      return;
    }

    const confirm = window.confirm("Deseja realmente deletar o usuário?");
    if (!confirm) return;
    await api
      .delete(`/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const newUsers = users.filter((u) => u.id !== user.id);
        setUsers(newUsers);
      })
      .catch(() => {
        alert("Erro ao deletar usuário. Tente novamente");
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AuthLayout>
      <h1 className="font-bold text-3xl">Usuários</h1>
      <div className="flex flex-row flex-wrap justify-around mt-8">
        {load ? (
          <p className="text-3xl font-bold text-slate-500 mx-auto mt-10 text-center">
            Carregando...
          </p>
        ) : (
          <MyTable
            headers={[
              { key: "name", label: "Nome" },
              { key: "email", label: "E-mail" },
              { key: "birth", label: "Data de Nascimento" },
            ]}
            rows={users}
            onRemove={removeUser}
          />
        )}
      </div>
    </AuthLayout>
  );
};

export default Users;
