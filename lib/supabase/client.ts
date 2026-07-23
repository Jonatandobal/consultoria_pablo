import { createBrowserClient } from "@supabase/ssr";

/** Cliente de Supabase para usar en Client Components (corre en el browser). */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
