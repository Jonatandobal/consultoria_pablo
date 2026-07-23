"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function LeadForm() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (!isEmail(v)) {
      setStatus("error");
      setMsg("Escribí un email válido y te mandamos tu link privado de acceso.");
      return;
    }
    setStatus("loading");
    setMsg("");
    const supabase = createClient();
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");
    const { error } = await supabase.auth.signInWithOtp({
      email: v,
      options: {
        emailRedirectTo: `${siteUrl}/auth/confirm?next=/mi-negocio`,
      },
    });
    if (error) {
      setStatus("error");
      setMsg("No pudimos enviar el link. Probá de nuevo en un momento.");
      return;
    }
    setStatus("sent");
    setMsg("¡Listo! Te mandamos un link privado a tu email para empezar. Revisá tu casilla (y el spam).");
  }

  return (
    <div className="lead" id="lead">
      <form onSubmit={onSubmit} noValidate>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Tu email"
          aria-label="Tu email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status === "loading" || status === "sent"}
        />
        <button className="btn btn-primary" type="submit" disabled={status === "loading" || status === "sent"}>
          {status === "loading" ? "Enviando…" : "Quiero mi diagnóstico"}
        </button>
      </form>
      <div className="trust">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        <span>
          Tus datos se guardan seguros y no se comparten con nadie. Sin contraseñas: te mandamos un link privado de acceso.
        </span>
      </div>
      {msg && <p className={`form-msg ${status === "error" ? "err" : "ok"}`}>{msg}</p>}
    </div>
  );
}
