import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/src/modules/home/icons";

export function ContactFooter() {
  return (
    <footer className="bg-zinc-900">
      <div className="flex flex-col items-center gap-8 pt-12 pb-40 px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="flex items-center my-10 md:mb-12 md:mt-20">
          <img
            src="/images/logo-footer.svg"
            alt="eduardopavani"
            className="h-16 sm:h-20 md:h-32 lg:h-40 w-auto"
          />
        </div>
        <h2 className="text-2xl sm:text-2xl md:text-3xl font-extralight mb-4 sm:mb-2 -tracking-[0.02em] !leading-[1.5] text-zinc-400">
          Vamos conversar?
        </h2>
        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="https://wa.me/5548991587232"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entre em contato pelo WhatsApp"
            className="text-zinc-400 hover:text-white hover:border-blue-700 transition-colors duration-300 px-6 py-3 sm:px-10 sm:py-4 rounded-lg border border-zinc-800"
          >
            <WhatsAppIcon className="w-8 h-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/eduardopavani/"
            aria-label="Visite meu perfil no LinkedIn"
            className="text-zinc-400 hover:text-white hover:border-blue-700 transition-colors duration-300 px-6 py-3 sm:px-10 sm:py-4 rounded-lg border border-zinc-800"
          >
            <LinkedInIcon className="w-8 h-8" />
          </a>
          <a
            href="https://www.instagram.com/eduardopavanipro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visite meu perfil no Instagram"
            className="text-zinc-400 hover:text-white hover:border-blue-700 transition-colors duration-300 px-6 py-3 sm:px-10 sm:py-4 rounded-lg border border-zinc-800"
          >
            <InstagramIcon className="w-8 h-8" />
          </a>
        </div>
      </div>
    </footer>
  );
}
