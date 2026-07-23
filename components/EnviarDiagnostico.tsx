"use client";

import { useState } from "react";

export default function EnviarDiagnostico() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function enviar() {
    setStatus("loading");
    try {
      const res = await fetch("/api/notify", { method: "POST" });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <span className="notice" style={{ margin: 0 }}>
        ¡Recibido! Pablo revisa tu info y te contacta para leer tu informe. Podés seguir cargando cuando quieras.
      </span>
    );
  }

  return (
    <button className="btn btn-primary" onClick={enviar} disabled={status === "loading"}>
      {status === "loading" ? "Enviando…" : "Enviar para mi diagnóstico"}
    </button>
  );
}
