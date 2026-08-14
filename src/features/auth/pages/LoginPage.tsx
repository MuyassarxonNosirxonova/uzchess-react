import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { isAxiosError } from "axios";
import { loginUser } from "../../../api/auth.api";
import { useAuth } from "../context/useAuth.ts";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login: setAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = Boolean((location.state as { justRegistered?: boolean } | null)?.justRegistered);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { accessToken } = await loginUser({ login, password });
      setAuthenticated(accessToken);
      navigate("/courses");
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 401) {
        setError("Login yoki parol noto'g'ri.");
      } else if (isAxiosError(err) && !err.response) {
        setError("Backendga ulanib bo'lmadi. Server ishga tushganini tekshiring.");
      } else {
        setError("Kirishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1113] text-[#F7F9FA]">
      <form
        onSubmit={handleSubmit}
        className="w-[380px] bg-[#1A1D1F] border border-[#25292C] rounded-lg p-8 flex flex-col gap-5"
      >
        <h1 className="text-[24px] font-bold text-center">Tizimga kirish</h1>

        {justRegistered && (
          <p className="text-[13px] text-center text-[#82CC27]">
            Ro'yxatdan muvaffaqiyatli o'tdingiz — endi kiring.
          </p>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-[12px] tracking-[1px] text-[#8B8E91]">LOGIN</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="h-[52px] px-4 bg-[#151719] border border-[#25292C] rounded-lg outline-none focus:border-[#1C92E0]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] tracking-[1px] text-[#8B8E91]">PAROL</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-[52px] px-4 bg-[#151719] border border-[#25292C] rounded-lg outline-none focus:border-[#1C92E0]"
          />
        </div>

        {error && <p className="text-[13px] text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-[52px] bg-[#1C92E0] hover:bg-blue-900 rounded-lg font-medium transition disabled:opacity-50"
        >
          {isSubmitting ? "Kirilmoqda..." : "Kirish"}
        </button>

        <p className="text-[13px] text-center text-[#8B8E91]">
          Hisobingiz yo'qmi?{" "}
          <Link to="/register" className="text-[#1C92E0]">
            Ro'yxatdan o'tish
          </Link>
        </p>
      </form>
    </div>
  );
}