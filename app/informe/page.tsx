import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const money = (n: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(
    Math.round(n),
  );
const pct = (n: number) => `${(Math.round(n * 10) / 10).toLocaleString("es-AR")}%`;

type Hallazgo = { tipo: "alerta" | "info"; texto: string };

export default async function InformePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/acceso");

  // RLS: solo devuelve el informe si está 'liberado' (revisado por Pablo).
  const { data: informe } = await supabase
    .from("informes")
    .select("mes, ventas_netas, costo_mercaderia, gastos_comprobante, gastos_efectivo, hallazgos")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const waPablo = process.env.NEXT_PUBLIC_PABLO_WHATSAPP;

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <Link className="brand" href="/" aria-label="EnLimpio inicio">
            <span className="badge">EL</span>
            <span className="brand-name">En<b>Limpio</b></span>
          </Link>
          <nav className="nav-links">
            <Link className="link" href="/mi-negocio">Cargar más info</Link>
          </nav>
        </div>
      </header>

      <main className="wrap-narrow" style={{ padding: "56px 24px 90px" }}>
        {!informe ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div className="badge" style={{ margin: "0 auto 20px", width: 52, height: 52, fontSize: 22, borderRadius: 14 }}>EL</div>
            <h1 style={{ fontSize: "clamp(26px, 4.5vw, 38px)" }}>Tu informe está en preparación</h1>
            <p style={{ color: "var(--ink-soft)", fontSize: 18, marginTop: 14, maxWidth: "32em", marginInline: "auto" }}>
              Pablo está revisando tus números. Ningún informe se libera sin su revisión. Te avisamos apenas esté listo
              para leerlo juntos.
            </p>
            <Link className="btn btn-ghost" href="/mi-negocio" style={{ marginTop: 26 }}>
              Mientras tanto, cargá más info
            </Link>
          </div>
        ) : (
          <Informe
            informe={informe as InformeRow}
            waPablo={waPablo}
          />
        )}
      </main>
    </>
  );
}

type InformeRow = {
  mes: string | null;
  ventas_netas: number;
  costo_mercaderia: number;
  gastos_comprobante: number;
  gastos_efectivo: number;
  hallazgos: Hallazgo[];
};

function Informe({ informe, waPablo }: { informe: InformeRow; waPablo?: string }) {
  const gananciaBruta = informe.ventas_netas - informe.costo_mercaderia;
  const resultado = gananciaBruta - informe.gastos_comprobante - informe.gastos_efectivo;
  const margen = informe.ventas_netas ? (gananciaBruta / informe.ventas_netas) * 100 : 0;
  const rent = informe.ventas_netas ? (resultado / informe.ventas_netas) * 100 : 0;
  const hallazgos = Array.isArray(informe.hallazgos) ? informe.hallazgos : [];

  return (
    <>
      <span className="eyebrow">Estado de resultados{informe.mes ? ` · ${informe.mes}` : ""}</span>
      <h1 style={{ fontSize: "clamp(26px, 4.5vw, 40px)", marginTop: 10, marginBottom: 26 }}>Tu negocio, en limpio</h1>

      <div className="report">
        <div className="report-head">
          <div>
            <div className="rh-label">Estado de resultados{informe.mes ? ` · ${informe.mes}` : ""}</div>
            <h3>Resultado del mes</h3>
          </div>
          <span className="stamp">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Revisado por Pablo
          </span>
        </div>
        <div className="report-body">
          <div className="line-item"><span className="li-label">Ventas netas (sin IVA)</span><span className="li-val tnum">{money(informe.ventas_netas)}</span></div>
          <div className="line-item"><span className="li-label">Costo de mercadería</span><span className="li-val neg tnum">− {money(informe.costo_mercaderia)}</span></div>
          <div className="line-item"><span className="li-label">Ganancia bruta</span><span className="li-val tnum">{money(gananciaBruta)}</span></div>
          <div className="line-item"><span className="li-label">Gastos con comprobante</span><span className="li-val neg tnum">− {money(informe.gastos_comprobante)}</span></div>
          <div className="line-item"><span className="li-label">Gastos en efectivo</span><span className="li-val neg tnum">− {money(informe.gastos_efectivo)}</span></div>
          <div className="line-item total"><span className="li-label">Resultado del mes</span><span className="li-val tnum">{money(resultado)}</span></div>
        </div>
        <div className="report-foot">
          <div className="kpi"><div className="k-val tnum">{pct(margen)}</div><div className="k-lab">Margen bruto</div></div>
          <div className="kpi"><div className="k-val tnum">{pct(rent)}</div><div className="k-lab">Rentabilidad</div></div>
          <div className="kpi"><div className="k-val tnum">{money(resultado)}</div><div className="k-lab">Resultado</div></div>
        </div>
      </div>

      {hallazgos.length > 0 && (
        <div style={{ marginTop: 36 }}>
          <h2 style={{ fontSize: 24, marginBottom: 18 }}>Lo que encontramos en tu negocio</h2>
          <div className="findings">
            {hallazgos.map((h, i) => (
              <div className="finding" key={i}>
                <span className={`f-ic ${h.tipo === "alerta" ? "f-alert" : "f-info"}`}>
                  {h.tipo === "alerta" ? "!" : "i"}
                </span>
                <p>{h.texto}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
        {waPablo ? (
          <a className="btn btn-primary" href={`https://wa.me/${waPablo}?text=${encodeURIComponent("¡Hola Pablo! Vi mi informe y quiero coordinar la llamada.")}`} target="_blank" rel="noopener">
            📞 Agendar llamada con Pablo
          </a>
        ) : (
          <span className="notice" style={{ margin: 0 }}>Pablo te contacta para leer el informe juntos.</span>
        )}
      </div>
    </>
  );
}
