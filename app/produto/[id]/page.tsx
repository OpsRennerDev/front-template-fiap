import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

export const revalidate = 60;

export default async function ProdutoDetalhe({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const produto = await api.buscarProduto(id);

    return (
      <>
        <Link href="/" className="back">← Voltar</Link>
        <div className="detalhe">
          <h2>{produto.nome}</h2>
          <p className="preco">R$ {produto.preco.toFixed(2)}</p>
          <p>{produto.descricao}</p>
        </div>
      </>
    );
  } catch {
    notFound();
  }
}
