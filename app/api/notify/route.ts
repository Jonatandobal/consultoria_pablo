import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Avisa a Jonatan/Pablo que un lead terminó de cargar.
 * Si hay RESEND_API_KEY + NOTIFY_EMAIL configurados, manda un email;
 * si no, registra en el log del servidor (suficiente para el piloto).
 */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "no auth" }, { status: 401 });
  }

  const { count } = await supabase
    .from("cargas")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  const resumen = `Lead ${user.email} envió su info para diagnóstico (${count ?? 0} cargas).`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;

  if (apiKey && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "EnLimpio <onboarding@resend.dev>",
          to,
          subject: "Nuevo lead cargó su info — EnLimpio",
          text: resumen,
        }),
      });
    } catch (e) {
      console.error("notify: fallo el envío de email", e);
    }
  } else {
    console.log("notify:", resumen);
  }

  return NextResponse.json({ ok: true });
}
