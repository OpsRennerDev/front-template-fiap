const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL não está definida");
}

export type Produto = {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
};

type FetchOpts = {
  revalidate?: number | false;
};

async function request<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: opts.revalidate === false ? { revalidate: 0 } : { revalidate: opts.revalidate ?? 60 },
  });

  if (!res.ok) {
    throw new Error(`API ${path} respondeu ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  listarProdutos: () => request<Produto[]>("/produtos", { revalidate: 60 }),
  buscarProduto: (id: string) => request<Produto>(`/produtos/${id}`, { revalidate: 60 }),
};
