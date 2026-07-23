import LeadForm from "@/components/LeadForm";
import Link from "next/link";

export default async function AccesoPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <Link className="brand" href="/" aria-label="EnLimpio inicio">
            <span className="badge">EL</span>
            <span className="brand-name">En<b>Limpio</b></span>
          </Link>
        </div>
      </header>

      <main className="wrap-narrow" style={{ padding: "80px 24px" }}>
        <span className="eyebrow">Acceso privado</span>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 44px)", marginTop: 12 }}>Entrá con tu link</h1>
        <p style={{ color: "var(--ink-soft)", fontSize: 18, marginTop: 14, maxWidth: "34em" }}>
          Poné tu email y te mandamos un <b>link privado</b> para cargar la info de tu negocio y ver tu informe.
          Sin contraseñas.
        </p>

        {error === "link" && (
          <p className="notice" style={{ marginTop: 24 }}>
            Ese link ya se usó o venció. No pasa nada: pedí uno nuevo abajo.
          </p>
        )}

        <LeadForm />
      </main>
    </>
  );
}
