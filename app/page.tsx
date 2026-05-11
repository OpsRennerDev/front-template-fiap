import Link from "next/link";
import { api, type Produto } from "@/lib/api";

export const revalidate = 60;

export default async function Home() {
  let produtos: Produto[] = [];
  let apiIndisponivel = false;

  try {
    produtos = await api.listarProdutos();
  } catch {
    apiIndisponivel = true;
  }

  return (
    <>
      <h2>Produtos</h2>
      <p style={{ color: "#888", marginTop: "0.5rem" }}>
        Esta página é Server Component com revalidate=60. Recarrega no servidor a cada minuto.
      </p>
      {apiIndisponivel && (
        <p style={{ color: "#c00", marginTop: "0.5rem" }}>
          API indisponível no momento. Tente novamente em instantes.
        </p>
      )}
      <div className="grid">
        {produtos.map((p) => (
          <Link key={p.id} href={`/produto/${p.id}`} className="card">
            <h2>{p.nome}</h2>
            <p className="preco">R$ {p.preco.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
