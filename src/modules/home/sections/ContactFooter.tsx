import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/src/modules/home/icons";

export function ContactFooter() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-16 sm:gap-8 pt-20 pb-32 px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="flex items-center animate-pulse">
          <img
            src="/images/logo-footer.svg"
            alt="eduardopavani"
            className="h-10 sm:h-12 w-auto"
          />
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="https://wa.me/5548991587232"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entre em contato pelo WhatsApp"
            className=" text-zinc-400 hover:text-white border border-transparent hover:border-gold-800 transition-colors duration-300 p-4 rounded-lg"
          >
            <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
          <a
            href="https://www.linkedin.com/in/eduardopavani/"
            aria-label="Visite meu perfil no LinkedIn"
            className=" text-zinc-400 hover:text-white  border border-transparent hover:border-gold-800 transition-colors duration-300 p-4 rounded-lg"
          >
            <LinkedInIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
          <a
            href="https://www.instagram.com/eduardopavanipro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visite meu perfil no Instagram"
            className=" text-zinc-400 hover:text-white  border border-transparent hover:border-gold-800 transition-colors duration-300 p-4 rounded-lg"
          >
            <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
        </div>
      </div>
    </footer>
  );
}
