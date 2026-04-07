"use client";

export default function PublicError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-800 px-6 text-center">
      <h1 className="text-2xl font-medium text-white">Algo deu errado</h1>
      <p className="mt-3 text-zinc-500">
        Não foi possível carregar o conteúdo. Tente novamente em instantes.
      </p>
    </div>
  );
}
