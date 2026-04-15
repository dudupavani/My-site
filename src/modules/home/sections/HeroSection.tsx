import { Suspense } from "react";
import Link from "next/link";

import { getFeaturedPost } from "@/src/modules/blog/server/queries";

async function FeaturedPostBanner() {
  const post = await getFeaturedPost();
  if (!post) return null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group mt-8 md:mt-10 block w-full max-w-sm sm:max-w-md">
      <div className="flex items-center gap-0 rounded-xl bg-stone-800 overflow-hidden border border-stone-700/50 transition-colors group-hover:border-stone-600">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 object-cover"
          />
        ) : (
          <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 bg-stone-700" />
        )}
        <span className="px-4 text-sm sm:text-base font-light text-stone-300 line-clamp-2 group-hover:text-white transition-colors leading-snug">
          {post.title}
        </span>
      </div>
    </Link>
  );
}

export function HeroSection() {
  return (
    <section className="relative h-dvh md:h-screen min-h-175 bg-stone-900 text-white flex flex-col items-center justify-start md:justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg-blur.png"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Simbolo Grande esquerda */}
      <div className="absolute z-5 top-[250px] -left-[220px] sm:top-[170px] sm:-left-[130px]">
        <svg
          viewBox="0 0 150 150"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[150px] h-[150px] origin-top-left scale-[4] sm:scale-[8] opacity-50 fill-current text-[#998663]"
          aria-hidden="true">
          <path
            d="M48.4031 101.41C55.3743 108.434 64.8403 112.42 74.7389 112.5L74.8902 150C55.0142 149.96 35.9659 142.041 21.9256 127.98C7.88534 113.919 -4.03957e-05 94.8651 0 75V0H75.0415C88.207 0.014549 101.137 3.49061 112.533 10.0792C123.929 16.6677 133.391 26.1369 139.967 37.5359C146.544 48.9349 150.004 61.8625 150 75.0207C149.996 88.1789 146.529 101.105 139.946 112.5H75.3441C85.2952 112.46 94.8228 108.471 101.831 101.41C108.839 94.3486 112.754 84.7944 112.714 74.8488C112.673 64.9032 108.682 55.3808 101.617 48.3766C94.5521 41.3723 84.9926 37.4599 75.0415 37.5H37.5208V75C37.5204 84.8934 41.432 94.3862 48.4031 101.41Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Simbolo blur direita */}
      <img
        src="/images/symbol.svg"
        className="absolute h-60 xl:h-80 w-auto right-20 xl:right-50 2xl:right-100 top-40 object-contain filter blur-lg! opacity-30 "
        alt=""
      />

      {/* Simbolo topo direita */}
      <div className="absolute inset-0 z-5 flex items-center justify-center -top-100 -right-150 sm:-top-150 sm:-right-380 2xl:-top-150 2xl:-right-460 opacity-70">
        <svg
          viewBox="0 0 150 150"
          xmlns="http://www.w3.org/2000/svg"
          className="h-100 sm:h-200 2xl:h-300 w-auto object-contain fill-current text-[#68553C]"
          aria-hidden="true">
          <path
            d="M48.4031 101.41C55.3743 108.434 64.8403 112.42 74.7389 112.5L74.8902 150C55.0142 149.96 35.9659 142.041 21.9256 127.98C7.88534 113.919 -4.03957e-05 94.8651 0 75V0H75.0415C88.207 0.014549 101.137 3.49061 112.533 10.0792C123.929 16.6677 133.391 26.1369 139.967 37.5359C146.544 48.9349 150.004 61.8625 150 75.0207C149.996 88.1789 146.529 101.105 139.946 112.5H75.3441C85.2952 112.46 94.8228 108.471 101.831 101.41C108.839 94.3486 112.754 84.7944 112.714 74.8488C112.673 64.9032 108.682 55.3808 101.617 48.3766C94.5521 41.3723 84.9926 37.4599 75.0415 37.5H37.5208V75C37.5204 84.8934 41.432 94.3862 48.4031 101.41Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Simbolo blur light */}
      <div className="absolute inset-0 opacity-50 z-20 top-100 2xl:top-130 left-40 2xl:left-80 scale-100  object-contain mix-blend-plus-lighter! blur-3xl">
        <svg
          viewBox="0 0 150 150"
          xmlns="http://www.w3.org/2000/svg"
          className="h-200 2xl:h-300 w-auto object-contain fill-current text-[#68553C] "
          aria-hidden="true">
          <path
            d="M48.4031 101.41C55.3743 108.434 64.8403 112.42 74.7389 112.5L74.8902 150C55.0142 149.96 35.9659 142.041 21.9256 127.98C7.88534 113.919 -4.03957e-05 94.8651 0 75V0H75.0415C88.207 0.014549 101.137 3.49061 112.533 10.0792C123.929 16.6677 133.391 26.1369 139.967 37.5359C146.544 48.9349 150.004 61.8625 150 75.0207C149.996 88.1789 146.529 101.105 139.946 112.5H75.3441C85.2952 112.46 94.8228 108.471 101.831 101.41C108.839 94.3486 112.754 84.7944 112.714 74.8488C112.673 64.9032 108.682 55.3808 101.617 48.3766C94.5521 41.3723 84.9926 37.4599 75.0415 37.5H37.5208V75C37.5204 84.8934 41.432 94.3862 48.4031 101.41Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="absolute inset-0 z-10 flex items-end justify-center">
        <img
          src="/images/me-hero.webp"
          alt="Eduardo Pavani"
          className="drop-shadow-2xl drop-shadow-[#292524]/50 relative z-10 max-w-[110%] max-h-[80%] md:h-full md:max-h-full sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl object-contain object-bottom"
        />
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img
            src="/images/eduardo-pavani.svg"
            alt="eduardopavani"
            className="hidden md:block h-20 lg:h-40 2xl:h-50 w-auto"
          />
          <img
            src="/images/eduardo-pavani-vert.svg"
            alt="eduardopavani"
            className="block md:hidden h-auto w-120 -mb-20"
          />
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 mt-30 sm:mt-28 md:mt-80">
        <div className="mx-auto md:max-w-4xl 2xl:max-w-5xl space-y-4">
          <h1 className="text-lg sm:text-xl md:text-3xl 2xl:text-4xl leading-[1.7] sm:leading-[1.4] 2xl:leading-[1.3] font-light">
            Ajudo empresas de tecnologia a transformar visão de produto em
            estratégia de execução estruturada que gera resultado.
          </h1>
        </div>

        <Suspense fallback={null}>
          <FeaturedPostBanner />
        </Suspense>
      </div>
    </section>
  );
}
