"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/src/shared/ui/icons/SocialIcons";

type PublicHeaderProps = {
  variant: "home" | "blog";
};

export function PublicHeader({ variant }: PublicHeaderProps) {
  const isBlog = variant === "blog";
  const logoSrc = isBlog
    ? "/images/symbol-white.svg"
    : "/images/symbol-white.svg";
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={
        isBlog
          ? "absolute w-full top-0 left-0 z-50 mx-auto px-6 sm:px-6 pt-8 sm:pt-10"
          : "absolute flex justify-center w-full top-0 left-0 z-50 mx-auto px-6 sm:px-6 md:px-10 xl:px-16 pt-6 sm:pt-6 md:pt-10"
      }>
      <div className="flex items-center justify-between flex-1 max-w-8xl ">
        <Link href="/" className="flex items-center">
          <img
            src={logoSrc}
            alt="Eduardo Pavani"
            className="h-9 sm:h-12 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-3 sm:gap-12">
          <nav
            aria-label="Navegação principal"
            className="flex items-center gap-6 sm:gap-8 text-stone-200">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/blog" className="transition-colors hover:text-white">
              Conteúdo
            </Link>
          </nav>

          {/* redes sociais */}
          <div className="flex items-center gap-2 sm:gap-2 text-white">
            <a
              href="https://wa.me/5548991587232"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entre em contato pelo WhatsApp"
              className="text-white border border-transparent hover:bg-stone-900/20 transition-colors duration-300 p-2 rounded-lg bg-transparent">
              <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/eduardopavani/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visite meu perfil no LinkedIn"
              className="text-white border border-transparent hover:bg-stone-900/20 transition-colors duration-300 p-2 rounded-lg bg-transparent">
              <LinkedInIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://www.instagram.com/eduardopavanipro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visite meu perfil no Instagram"
              className="text-white border border-transparent hover:bg-stone-900/20 transition-colors duration-300 p-2 rounded-lg bg-transparent">
              <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-sm text-stone-100 p-2  backdrop-blur-sm transition-colors hover:bg-black/40">
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`md:hidden fixed inset-0 z-70 transition-opacity duration-500 ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}>
        <div
          className="absolute inset-0 "
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-transform duration-700 ${
            isMenuOpen ? "scale-100" : "scale-105"
          }`}
        />

        <div
          className={`relative z-10 flex h-full flex-col px-6 pt-6 pb-10 transition-all duration-500 ${
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsMenuOpen(false)}>
              <img src={logoSrc} alt="Eduardo Pavani" className="h-8 w-auto" />
            </Link>

            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center justify-center text-stone-100 p-2 backdrop-blur-sm transition-colors hover:bg-black/40">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav
            aria-label="Navegação principal mobile"
            className="mt-24 flex flex-col items-center gap-8 text-stone-100 text-4xl sm:text-5xl font-light">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`transition-all duration-500 hover:text-stone-300 ${
                isMenuOpen
                  ? "translate-y-0 opacity-100 delay-150"
                  : "translate-y-4 opacity-0"
              }`}>
              Home
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className={`transition-all duration-500 hover:text-stone-300 ${
                isMenuOpen
                  ? "translate-y-0 opacity-100 delay-200"
                  : "translate-y-4 opacity-0"
              }`}>
              Conteúdo
            </Link>
          </nav>

          <div
            className={`mt-auto mb-20 flex items-center justify-center gap-8 text-white transition-all duration-500 ${
              isMenuOpen
                ? "translate-y-0 opacity-100 delay-300"
                : "translate-y-4 opacity-0"
            }`}>
            <a
              href="https://www.linkedin.com/in/eduardopavani/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visite meu perfil no LinkedIn"
              className="text-white hover:border-stone-400 transition-colors duration-300 p-3 rounded-lg ">
              <LinkedInIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/eduardopavanipro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visite meu perfil no Instagram"
              className="text-white hover:border-stone-400 transition-colors duration-300 p-3 rounded-lg">
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/5548991587232"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entre em contato pelo WhatsApp"
              className="text-white hover:border-stone-400 transition-colors duration-300 p-3 rounded-lg">
              <WhatsAppIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
