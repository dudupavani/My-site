import Link from "next/link";

type PublicHeaderProps = {
  variant: "home" | "blog";
};

export function PublicHeader({ variant }: PublicHeaderProps) {
  const isBlog = variant === "blog";

  return (
    <header
      className={
        isBlog
          ? "absolute w-full top-0 left-0 z-50 mx-auto px-4 sm:px-6 pt-8 sm:pt-10"
          : "absolute w-full top-0 left-0 z-50 mx-auto px-4 sm:px-6 pt-10 sm:pt-6"
      }>
      <div
        className={
          isBlog
            ? "mx-auto flex max-w-7xl items-center justify-between"
            : "mx-auto flex max-w-7xl items-center justify-center md:justify-end"
        }>
        {isBlog ? (
          <Link href="/" className="flex items-center">
            <img
              src="/images/symbol.svg"
              alt="Eduardo Pavani"
              className="h-8 w-auto"
            />
          </Link>
        ) : null}

        <nav
          aria-label="Navegação principal"
          className="flex items-center gap-8 text-sm text-zinc-300">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/blog" className="transition-colors hover:text-white">
            Conteúdo
          </Link>
        </nav>
      </div>
    </header>
  );
}
