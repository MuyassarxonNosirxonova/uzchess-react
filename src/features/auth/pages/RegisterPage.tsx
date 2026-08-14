import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { isAxiosError } from "axios";
import { registerUser, setPassword as setPasswordRequest, verifyOtp } from "../../../api/auth.api";
import type { LoginType } from "../../../types/auth.types";

type Step = "details" | "otp" | "password";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PHONE_REGEX = /^\+?\d{9,13}$/;

const RESEND_COOLDOWN_SECONDS = 60;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("details");

  const [loginType, setLoginType] = useState<LoginType>("email");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (step !== "otp" || resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, resendCooldown]);

  function handleLoginTypeChange(next: LoginType) {
    setLoginType(next);
    setUsername("");
    setError(null);
  }

  async function handleDetailsSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (loginType === "email" && !EMAIL_REGEX.test(username)) {
      setError("Email manzilini to'g'ri kiriting (masalan: ism@mail.com).");
      return;
    }
    if (loginType === "number" && !PHONE_REGEX.test(username)) {
      setError("Telefon raqamini to'g'ri kiriting (masalan: +998901234567).");
      return;
    }

    setIsSubmitting(true);
    try {
      await registerUser({ username, fullName, loginType });
      setStep("otp");
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 400) {
        setError("Kiritilgan ma'lumotlar noto'g'ri yoki bu login band.");
      } else if (isAxiosError(err) && !err.response) {
        setError("Backendga ulanib bo'lmadi. Server ishga tushganini tekshiring.");
      } else {
        setError("Ro'yxatdan o'tishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleOtpSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await verifyOtp({ username, code });
      setStep("password");
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 400) {
        setError("Kod noto'g'ri yoki muddati o'tgan. \"Qayta yuborish\" orqali yangi kod so'rang.");
      } else if (isAxiosError(err) && !err.response) {
        setError("Backendga ulanib bo'lmadi. Server ishga tushganini tekshiring.");
      } else {
        setError("Kodni tasdiqlashda xatolik yuz berdi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendOtp() {
    if (resendCooldown > 0 || isResending) return;
    setError(null);
    setInfoMessage(null);
    setIsResending(true);
    try {
      // Backend /auth/register qayta chaqirilganda eski (tasdiqlanmagan) userni
      // o'chirib, yangi OTP yaratib, qaytadan yuboradi — shuning uchun bu yerda
      // ham xuddi shu endpoint ishlatiladi.
      await registerUser({ username, fullName, loginType });
      setCode("");
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
      setInfoMessage("Yangi kod yuborildi.");
    } catch (err) {
      if (isAxiosError(err) && !err.response) {
        setError("Backendga ulanib bo'lmadi. Server ishga tushganini tekshiring.");
      } else {
        setError("Kodni qayta yuborishda xatolik yuz berdi. Birozdan so'ng qaytadan urinib ko'ring.");
      }
    } finally {
      setIsResending(false);
    }
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await setPasswordRequest({ username, code, password });
      navigate("/login", { state: { justRegistered: true } });
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 400) {
        setError("Parolni saqlab bo'lmadi. Qaytadan urinib ko'ring.");
      } else if (isAxiosError(err) && !err.response) {
        setError("Backendga ulanib bo'lmadi. Server ishga tushganini tekshiring.");
      } else {
        setError("Parol o'rnatishda xatolik yuz berdi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1113] text-[#F7F9FA]">
      <form
        onSubmit={
          step === "details" ? handleDetailsSubmit : step === "otp" ? handleOtpSubmit : handlePasswordSubmit
        }
        className="w-[380px] bg-[#1A1D1F] border border-[#25292C] rounded-lg p-8 flex flex-col gap-5"
      >
        <h1 className="text-[24px] font-bold text-center">Ro'yxatdan o'tish</h1>

        {step === "details" && (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] tracking-[1px] text-[#8B8E91]">ISM FAMILIYA</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-[52px] px-4 bg-[#151719] border border-[#25292C] rounded-lg outline-none focus:border-[#1C92E0]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] tracking-[1px] text-[#8B8E91]">TASDIQLASH KODI QAYERGA YUBORILSIN?</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#151719] border border-[#25292C] rounded-lg">
                <button
                  type="button"
                  onClick={() => handleLoginTypeChange("email")}
                  className={`h-10 rounded-md text-[14px] font-medium transition ${
                    loginType === "email" ? "bg-[#1C92E0] text-white" : "text-[#8B8E91]"
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => handleLoginTypeChange("number")}
                  className={`h-10 rounded-md text-[14px] font-medium transition ${
                    loginType === "number" ? "bg-[#1C92E0] text-white" : "text-[#8B8E91]"
                  }`}
                >
                  Telefon
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] tracking-[1px] text-[#8B8E91]">
                {loginType === "email" ? "EMAIL MANZIL" : "TELEFON RAQAM"}
              </label>
              <input
                type={loginType === "email" ? "email" : "tel"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={loginType === "email" ? "ism@mail.com" : "+998901234567"}
                required
                className="h-[52px] px-4 bg-[#151719] border border-[#25292C] rounded-lg outline-none focus:border-[#1C92E0]"
              />
            </div>
          </>
        )}

        {step === "otp" && (
          <div className="flex flex-col gap-2">
            <label className="text-[12px] tracking-[1px] text-[#8B8E91]">
              TASDIQLASH KODI ({username} {loginType === "email" ? "manziliga" : "raqamiga"} yuborildi)
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="h-[52px] px-4 bg-[#151719] border border-[#25292C] rounded-lg outline-none focus:border-[#1C92E0]"
            />

            <div className="flex items-center justify-between mt-1">
              <span className="text-[12px] text-[#8B8E91]">Kod 1 daqiqa amal qiladi</span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || isResending}
                className="text-[13px] text-[#1C92E0] disabled:text-[#8B8E91] disabled:cursor-not-allowed transition"
              >
                {isResending
                  ? "Yuborilmoqda..."
                  : resendCooldown > 0
                    ? `Qayta yuborish (${resendCooldown}s)`
                    : "Qayta yuborish"}
              </button>
            </div>

            {infoMessage && <p className="text-[13px] text-green-400">{infoMessage}</p>}
          </div>
        )}

        {step === "password" && (
          <div className="flex flex-col gap-2">
            <label className="text-[12px] tracking-[1px] text-[#8B8E91]">PAROL</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="h-[52px] px-4 bg-[#151719] border border-[#25292C] rounded-lg outline-none focus:border-[#1C92E0]"
            />
          </div>
        )}

        {error && <p className="text-[13px] text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-[52px] bg-[#1C92E0] hover:bg-blue-900 rounded-lg font-medium transition disabled:opacity-50"
        >
          {isSubmitting
            ? "Yuborilmoqda..."
            : step === "details"
              ? "Davom etish"
              : step === "otp"
                ? "Kodni tasdiqlash"
                : "Ro'yxatdan o'tishni yakunlash"}
        </button>

        <p className="text-[13px] text-center text-[#8B8E91]">
          Hisobingiz bormi?{" "}
          <Link to="/login" className="text-[#1C92E0]">
            Kirish
          </Link>
        </p>
      </form>
    </div>
  );
}