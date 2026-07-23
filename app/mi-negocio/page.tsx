import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CargaBoxes from "@/components/CargaBoxes";
import EnviarDiagnostico from "@/components/EnviarDiagnostico";

export default async function MiNegocioPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/acceso");

  // Asegura que exista el negocio del lead (uno por usuario).
  await supabase.from("negocios").upsert(
    { user_id: user.id, contacto: user.email },
    { onConflict: "user_id", ignoreDuplicates: true },
  );

  const { data: negocio } = await supabase
    .from("negocios")
    .select("nombre")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: cargas } = await supabase
    .from("cargas")
    .select("id, caja, nota, file_path, file_name")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <Link className="brand" href="/" aria-label="EnLimpio inicio">
            <span className="badge">EL</span>
            <span className="brand-name">En<b>Limpio</b></span>
          </Link>
          <nav className="nav-links">
            <Link className="link" href="/informe">Mi informe</Link>
          </nav>
        </div>
      </header>

      <main className="wrap" style={{ padding: "56px 24px 90px" }}>
        <span className="eyebrow">Tu negocio</span>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 42px)", marginTop: 12 }}>
          Hola{negocio?.nombre ? `, ${negocio.nombre}` : ""} 👋
        </h1>
        <p style={{ color: "var(--ink-soft)", fontSize: 18, marginTop: 14, maxWidth: "40em" }}>
          Cargá lo que tengas de este mes. No hace falta que esté ordenado ni completo: nosotros lo pasamos en limpio.
          Podés volver con tu link privado a seguir cargando cuando quieras.
        </p>

        <div style={{ marginTop: 34 }}>
          <CargaBoxes userId={user.id} initial={cargas ?? []} />
        </div>

        <div style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <EnviarDiagnostico />
          <span style={{ color: "var(--ink-mute)", fontSize: 13.5 }}>
            🔒 Tus datos se guardan seguros y no se comparten con nadie.
          </span>
        </div>
      </main>
    </>
  );
}
