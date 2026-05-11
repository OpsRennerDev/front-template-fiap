import Link from "next/link";
import { api } from "@/lib/api";

export const revalidate = 60;

export default async function Home() {
  const produtos = await api.listarProdutos();

  return (
    <>
      <h2>Produtos</h2>
      <p style={{ color: "#888", marginTop: "0.5rem" }}>
        Esta página é Server Component com revalidate=60. Recarrega no servidor a cada minuto.
      </p>
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
