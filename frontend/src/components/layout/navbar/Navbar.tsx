import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Menu,LogOut, User } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "text-gray-700 hover:text-indigo-600";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-indigo-600">
          Reunite
        </NavLink>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/report-missing" className={navLinkClass}>
            Report Missing
          </NavLink>

          <NavLink to="/upload-missing-person" className={navLinkClass}>
            Missing Person
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={logout}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            ><LogOut size={18} />
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden "
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t px-4 py-4 md:hidden">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/report-missing" className={navLinkClass}>
            Report Missing
          </NavLink>

          <NavLink to="/found-person" className={navLinkClass}>
            Found Someone
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-left text-red-500"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
