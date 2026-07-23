"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Carga = {
  id: string;
  caja: string;
  nota: string | null;
  file_path: string | null;
  file_name: string | null;
};

const CAJAS = [
  { id: "ventas", icon: "🧾", label: "Ventas", hint: "Archivos, fotos o escribilo" },
  { id: "compras", icon: "📄", label: "Compras", hint: "Facturas de proveedores" },
  { id: "gastos", icon: "💵", label: "Gastos", hint: "Con o sin comprobante" },
] as const;

export default function CargaBoxes({
  userId,
  initial,
}: {
  userId: string;
  initial: Carga[];
}) {
  const supabase = createClient();
  const [items, setItems] = useState<Carga[]>(initial);
  const [busy, setBusy] = useState<string | null>(null);

  const byCaja = (caja: string) => items.filter((i) => i.caja === caja);

  async function onFiles(caja: string, files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(caja);
    for (const file of Array.from(files)) {
      const safe = file.name.replace(/[^\w.\-]+/g, "_");
      const path = `${userId}/${caja}/${Date.now()}-${safe}`;
      const { error: upErr } = await supabase.storage.from("cargas").upload(path, file);
      if (upErr) {
        alert(`No se pudo subir ${file.name}. Probá de nuevo.`);
        continue;
      }
      const { data, error } = await supabase
        .from("cargas")
        .insert({ user_id: userId, caja, file_path: path, file_name: file.name })
        .select()
        .single();
      if (!error && data) setItems((prev) => [...prev, data as Carga]);
    }
    setBusy(null);
  }

  async function addNota(caja: string, nota: string, clear: () => void) {
    const text = nota.trim();
    if (!text) return;
    const { data, error } = await supabase
      .from("cargas")
      .insert({ user_id: userId, caja, nota: text })
      .select()
      .single();
    if (!error && data) {
      setItems((prev) => [...prev, data as Carga]);
      clear();
    }
  }

  async function remove(item: Carga) {
    if (item.file_path) {
      await supabase.storage.from("cargas").remove([item.file_path]);
    }
    await supabase.from("cargas").delete().eq("id", item.id);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  return (
    <div className="cajas">
      {CAJAS.map((c) => (
        <CajaCard
          key={c.id}
          caja={c}
          items={byCaja(c.id)}
          busy={busy === c.id}
          onFiles={(files) => onFiles(c.id, files)}
          onNota={(nota, clear) => addNota(c.id, nota, clear)}
          onRemove={remove}
        />
      ))}
    </div>
  );
}

function CajaCard({
  caja,
  items,
  busy,
  onFiles,
  onNota,
  onRemove,
}: {
  caja: { id: string; icon: string; label: string; hint: string };
  items: Carga[];
  busy: boolean;
  onFiles: (files: FileList | null) => void;
  onNota: (nota: string, clear: () => void) => void;
  onRemove: (item: Carga) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [nota, setNota] = useState("");

  return (
    <div className="caja">
      <h3>
        <span className="caja-ic" aria-hidden="true">{caja.icon}</span>
        {caja.label}
      </h3>
      <p className="hint">{caja.hint}</p>

      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={(e) => onFiles(e.target.files)}
      />
      <div className="dropzone" role="button" tabIndex={0} onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}>
        {busy ? "Subiendo…" : "Subí archivos o fotos (o tocá acá)"}
      </div>

      <textarea
        placeholder="…o escribilo. Ej.: pagué el alquiler en efectivo, $850.000"
        value={nota}
        onChange={(e) => setNota(e.target.value)}
      />
      <button
        className="btn btn-ghost"
        style={{ alignSelf: "flex-start", padding: "9px 16px", fontSize: 14 }}
        onClick={() => onNota(nota, () => setNota(""))}
        disabled={!nota.trim()}
      >
        Agregar nota
      </button>

      {items.map((item) => (
        <div className="uploaded" key={item.id}>
          <span>{item.file_name ? `✓ ${item.file_name}` : `✎ ${item.nota}`}</span>
          <button aria-label="Quitar" onClick={() => onRemove(item)}>×</button>
        </div>
      ))}
    </div>
  );
}
