import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">Página Inicial</h1>
      <p>
        Poderá visualizar as páginas no endereço{" "}
        <Link href="/docs" className="font-medium underline">
          /docs
        </Link>{" "}
        e visualizar todos os serviços e funcionalidades da API.
      </p>
    </div>
  );
}
