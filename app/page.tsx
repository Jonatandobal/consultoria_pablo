import LeadForm from "@/components/LeadForm";

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#top" aria-label="EnLimpio inicio">
            <span className="badge">EL</span>
            <span className="brand-name">
              En<b>Limpio</b>
            </span>
          </a>
          <nav className="nav-links" aria-label="Principal">
            <a className="link" href="#como">Cómo funciona</a>
            <a className="link" href="#informe">Qué recibís</a>
            <a className="link" href="#pablo">Quién te acompaña</a>
            <a className="btn btn-primary" href="#top">Quiero mi diagnóstico</a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">Diagnóstico financiero gratis · 72 horas</span>
              <h1 className="hero-title" style={{ marginTop: 16 }}>
                Tu negocio,
                <br />
                <span className="u">en limpio</span>.
              </h1>
              <p className="hero-sub">
                Mandanos la info de un mes <b>como la tengas</b> —Excel, fotos, papelitos, notas— y te devolvemos el{" "}
                <b>estado de resultados</b> de tu negocio. Sabés, por fin, si ganás o perdés y por qué.
              </p>
              <LeadForm />
            </div>

            {/* Estado de resultados de ejemplo */}
            <div className="report" aria-label="Ejemplo de estado de resultados">
              <div className="report-head">
                <div>
                  <div className="rh-label">Estado de resultados · junio 2026</div>
                  <h3>Café Belgrano</h3>
                </div>
                <span className="stamp">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Revisado por Pablo
                </span>
              </div>
              <div className="report-body">
                <div className="line-item"><span className="li-label">Ventas netas (sin IVA)</span><span className="li-val tnum">$12.450.000</span></div>
                <div className="line-item"><span className="li-label">Costo de mercadería</span><span className="li-val neg tnum">− $7.080.000</span></div>
                <div className="line-item"><span className="li-label">Gastos con comprobante</span><span className="li-val neg tnum">− $2.310.000</span></div>
                <div className="line-item"><span className="li-label">Gastos en efectivo</span><span className="li-val neg tnum">− $1.640.000</span></div>
                <div className="line-item total"><span className="li-label">Resultado del mes</span><span className="li-val tnum">$1.420.000</span></div>
              </div>
              <div className="report-foot">
                <div className="kpi"><div className="k-val tnum">43,1%</div><div className="k-lab">Margen bruto</div></div>
                <div className="kpi"><div className="k-val tnum">11,4%</div><div className="k-lab">Rentabilidad</div></div>
                <div className="kpi"><div className="k-val tnum">$1,4M</div><div className="k-lab">Ganancia</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section id="como">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Cómo funciona</span>
              <h2>Tres pasos. Vos no ordenás nada.</h2>
              <p>El trabajo sucio lo hacemos nosotros. Vos mandás lo que tengas y terminás con una llamada para entender tus números.</p>
            </div>
            <div className="steps">
              <div className="step">
                <div className="n">1</div>
                <h3>Mandá tu info</h3>
                <p>Como la tengas: Excel, fotos de facturas, capturas del banco, notas. Sin ordenar, sin completar todo.</p>
              </div>
              <div className="step">
                <div className="n">2</div>
                <h3>La pasamos en limpio</h3>
                <p>Armamos tu estado de resultados. Pablo lo revisa y lo firma antes de que lo veas. Listo en 72 horas.</p>
              </div>
              <div className="step">
                <div className="n">3</div>
                <h3>Lo leés con Pablo</h3>
                <p>Una llamada corta para entender qué dicen los números y qué conviene mirar el mes que viene.</p>
              </div>
            </div>
          </div>
        </section>

        {/* QUÉ RECIBÍS */}
        <section id="informe">
          <div className="wrap">
            <div className="findings-wrap">
              <div className="sec-head" style={{ marginBottom: 26 }}>
                <span className="eyebrow">Qué recibís</span>
                <h2>No solo los números. Lo que esconden.</h2>
                <p>Junto a tu estado de resultados te marcamos lo que encontramos en tu negocio —en plata y en horas—.</p>
              </div>
              <div className="findings">
                <div className="finding">
                  <span className="f-ic f-alert">!</span>
                  <p><b>El 42% de tus gastos no tiene comprobante.</b> Eso complica tu equilibrio fiscal y esconde costos reales. Se puede ordenar.</p>
                </div>
                <div className="finding">
                  <span className="f-ic f-alert">!</span>
                  <p><b>Cargás las ventas a mano todas las semanas: ~12 horas al mes.</b> Es tiempo que se puede automatizar por completo.</p>
                </div>
                <div className="finding">
                  <span className="f-ic f-info">i</span>
                  <p><b>Tu margen está sano, pero no sabés cuánto stock tenés inmovilizado.</b> Es el primer número que miraría el mes que viene.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PABLO */}
        <section id="pablo" style={{ paddingTop: 20 }}>
          <div className="wrap">
            <div className="pablo">
              <div className="avatar" aria-hidden="true">PR</div>
              <div>
                <span className="eyebrow">Quién te acompaña</span>
                <h3 style={{ marginTop: 8 }}>Pablo Rostein</h3>
                <div className="role">Asesor financiero de pymes</div>
                <p className="bio">
                  Hace años ayuda a dueños de comercios y locales a entender una sola cosa con claridad: si su negocio gana o
                  pierde, y por qué. Cada informe pasa por sus manos antes de llegar a las tuyas —por eso lleva su firma.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot-inner">
          <div className="brand" style={{ gap: 9 }}>
            <span className="badge" style={{ width: 28, height: 28, fontSize: 12, borderRadius: 8 }}>EL</span>
            <span>
              <span className="brand-name" style={{ fontSize: 16 }}>En<b>Limpio</b></span>
              <p style={{ marginTop: 2 }}>Tu negocio, en limpio · 2026</p>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
