import { Suspense } from "react";
import Link from "next/link";

import {
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/src/modules/home/icons";
import { getFeaturedPost } from "@/src/modules/blog/server/queries";

async function FeaturedPostBanner() {
  const post = await getFeaturedPost();
  if (!post) return null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group mt-8 md:mt-10 block w-full max-w-sm sm:max-w-md">
      <div className="flex items-center gap-0 rounded-xl bg-zinc-800 overflow-hidden border border-zinc-700/50 transition-colors group-hover:border-zinc-600">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 object-cover"
          />
        ) : (
          <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 bg-zinc-700" />
        )}
        <span className="px-4 text-sm sm:text-base font-light text-zinc-300 line-clamp-2 group-hover:text-white transition-colors leading-snug">
          {post.title}
        </span>
      </div>
    </Link>
  );
}

export function HeroSection() {
  return (
    <section className="relative h-dvh md:h-screen min-h-175 bg-zinc-900 text-white flex flex-col items-center justify-start md:justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <img
        src="/images/symbol.svg"
        className="absolute  h-60 md:h-[80%] top-50 w-auto object-contain filter opacity-20 left-[20%]"
        alt=""
      />
      <img
        src="/images/symbol.svg"
        className="absolute h-[20%] w-auto object-contain filter blur-sm! opacity-30 right-[10%]"
        alt=""
      />

      <div className="absolute inset-0 z-5 flex items-center justify-center top-20">
        <img
          src="/images/symbol.svg"
          className="h-full w-auto object-contain blur-3xl! fill-blue-600!"
          alt=""
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-end justify-center">
        <img
          src="/images/symbol.svg"
          alt=""
          className="absolute inset-0 z-30 top-100 left-[40%] h-[70%] w-auto object-contain blur-3xl! fill-blue-600! mix-blend-hard-light!"
        />
        <img
          src="/images/me-hero.webp"
          alt="Eduardo Pavani"
          className="max-w-[110%] max-h-[80%] md:h-full md:max-h-full sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl object-contain object-bottom"
        />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 mt-28 md:mt-50 xl:mt-80">
        <div className="flex items-center mb-6 md:mb-6">
          <img
            src="/images/logo.svg"
            alt="eduardopavani"
            className="h-12 sm:h-14 md:h-20 lg:h-28 w-auto"
          />
        </div>
        <div className="mx-auto md:max-w-3xl 2xl:max-w-5xl space-y-4">
          <h1 className="text-lg sm:text-xl md:text-3xl 2xl:text-4xl leading-[1.7] sm:leading-[1.4] 2xl:leading-[1.3] font-light">
          Ajudo empresas de tecnologia a transformar visão de produto em execução estruturada que gera resultado.
        </h1>
        <p className="text-lg leading-[1.6] font-extralight">Atuo na interseção entre negócio, produto e operação, organizando direção, prioridade e execução para fazer o produto avançar com consistência.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-6 mt-90 sm:mt-8 md:mt-12 text-white">
          <a
            href="https://wa.me/5548991587232"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entre em contato pelo WhatsApp"
            className="text-white border border-transparent hover:border-blue-700 transition-colors duration-300 p-4 rounded-lg bg-transparent">
            <WhatsAppIcon className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/eduardopavani/"
            aria-label="Visite meu perfil no LinkedIn"
            className="text-white border border-transparent hover:border-blue-700 transition-colors duration-300 p-4 rounded-lg bg-transparent">
            <LinkedInIcon className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/eduardopavanipro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visite meu perfil no Instagram"
            className="text-white border border-transparent hover:border-blue-700 transition-colors duration-300 p-4 rounded-lg bg-transparent">
            <InstagramIcon className="w-6 h-6" />
          </a>
        </div>
        <Suspense fallback={null}>
          <FeaturedPostBanner />
        </Suspense>
      </div>
    </section>
  );
}
