import {Link} from "react-router";
import {useState} from "react";
import {useAuth} from "../../../auth/context/useAuth.ts";
import { useNavigate } from "react-router";

export function Header() {
  const { isAuthenticated, displayName, logout } = useAuth();
  const navigate = useNavigate();

  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [language, setLanguage] = useState("O'zbekcha");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header
      className="flex justify-between items-center w-[1376px] h-[76px] px-6 py-3 mt-6 mx-8 bg-[#1A1D1F] rounded-[16px]">

      <div className="flex items-center">
        <img
          src="/icons/Logo.svg"
          alt="Main Logo"
        />
        <div className="w-px h-6 bg-[#F7F9FA33] mx-5"/>

        <div className="relative">
          <input type="checkbox" id="language" className="hidden"
                 checked={isLanguageOpen}
                 onChange={() => setIsLanguageOpen(!isLanguageOpen)}/>
          <label
            htmlFor="language"
            className="flex items-center gap-3 text-[#F7F9FA] text-[14px] cursor-pointer"
          >
            <span>{language}</span>

            <span
              className={`transition-transform ${
                isLanguageOpen ? "rotate-180" : ""
              }`}
            >
    <img src="/icons/chevron-down.svg" alt="chevron-down"/>
  </span>
          </label>
          {isLanguageOpen && (
            <div className="absolute top-8 left-0 w-[140px] bg-[#1A1D1F] rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  setLanguage("O'zbekcha");
                  setIsLanguageOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-white/70 hover:bg-[#25292C] hover:text-white transition">O'zbekcha
              </button>
              <button
                onClick={() => {
                  setLanguage("Русский");
                  setIsLanguageOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-white/70 hover:bg-[#25292C] hover:text-white transition">Русский
              </button>

              <button
                onClick={() => {
                  setLanguage("English");
                  setIsLanguageOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-white/70 hover:bg-[#25292C] hover:text-white transition"
              >English
              </button>
            </div>
          )}

        </div>
      </div>

      <nav className="flex gap-10 items-center">
        <Link to="/main"
              className="text-white/70 text-[14px] hover:text-[#1C92E0] transition">
          Asosiy
        </Link>

        <Link to="/news"
              className="text-white/70 text-[14px] hover:text-[#1C92E0] transition">
          Yangiliklar
        </Link>

        <Link to="/courses"
              className="text-white/70 text-[14px] hover:text-[#1C92E0] transition">
          Kurslar
        </Link>

        <Link to="/library"
              className="text-white/70 text-[14px] hover:text-[#1C92E0] transition">
          Kutubxona
        </Link>

        <Link to="/contact"
              className="text-white/70 text-[14px] hover:text-[#1C92E0] transition">
          Bog'lanish
        </Link>
      </nav>

      <div className="flex items-center gap-8">
        <img src="/icons/search.svg"
             alt="search"
             className="w-5 h-5"/>
        <img
          src="/icons/Korzinka.svg"
          alt="cart"
          className="w-5 h-5"/>
        <img
          src="/icons/notifications.svg"
          alt="bell"
          className="w-5 h-5"/>

        <div className="w-px h-6 bg-[#F7F9FA33]" />

        {isAuthenticated ? (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
      <span className="text-white text-[14px]">
        {displayName}
          </span>
              <div className="w-8 h-8 rounded-full bg-[#F7F9FA33] flex items-center justify-center overflow-hidden">
                <img
                  src="/icons/user.svg"
                  alt="user"
                />
              </div>
            </div>
            <div className="absolute right-0 top-full w-[180px] bg-[#1A1D1F] rounded-lg shadow-lg p-2 hidden group-hover:block ">
              <button
                onClick={handleLogout}
                className="w-full flex justify-center items-center text-left px-4 py-2 text-white/70 hover:bg-[#25292C] hover:text-white rounded-md"
              >
                Chiqish
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login"
                className="w-[132px] h-10 group bg-[#1C92E0] hover:bg-blue-900 text-white text-[16px] px-8 py-2 rounded-md flex items-center gap-2 transition"
          >Kirish
            <img
              src="/icons/log-in.svg"
              alt="login"
              className="w-5 h-5 group-hover:brightness-125"
            />
          </Link>
        )}
      </div>
    </header>
  );
}