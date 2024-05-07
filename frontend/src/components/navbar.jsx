import AppBar from "@mui/material/AppBar";
import logo from "../assets/logo.png";

const pages = [
  {
    label: "Usuarios",
    href: "/usuarios",
  },
  {
    label: "Heróis",
    href: "/herois",
  },
];

function NavBar() {
  return (
    <AppBar position="static">
      <div className="px-2 flex flex-row justify-between py-4">
        {/* <a href="/home">
          <img src={logo} alt="MARVEL" className="h-10" />
        </a> */}
        <a href="/home" className="flex items-center">
          <span className="text-white font-bold text-2xl mr-2">M</span>
          <span className="text-white font-bold text-2xl mr-2">A</span>
          <span className="text-white font-bold text-2xl mr-2">R</span>
          <span className="text-white font-bold text-2xl mr-2">V</span>
          <span className="text-white font-bold text-2xl mr-2">E</span>
          <span className="text-white font-bold text-2xl mr-2">L</span>
        </a>
        <div className="flex flex-1 items-center ml-4">
          {pages.map((page) => (
            <a
              href={page.href}
              key={page.label}
              className="px-4 cursor-pointer w-auto uppercase"
            >
              {page.label}
            </a>
          ))}
        </div>
      </div>
    </AppBar>
  );
}
export default NavBar;
