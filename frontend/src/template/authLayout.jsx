import NavBar from "../components/navbar";

const authLayout = ({ children }) => {
    const token = sessionStorage.getItem("token");
    if(!token) {
        alert("Acesso negado. Realize o login.");
        window.location.href = "/";
    }
  return (
    <div className="w-screen min-h-screen bg-slate-200">
      <NavBar />
      <div className="p-5">{children}</div>
    </div>
  );
};

export default authLayout;
