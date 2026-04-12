import {
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/src/modules/home/icons";

export function HeroSection() {
  return (
    <section className="relative h-dvh md:h-screen min-h-[700px] bg-zinc-900 text-white flex flex-col items-center justify-start md:justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <img
        src="/images/symbol.svg"
        className="absolute h-[80%] w-auto object-contain filter opacity-20 left-[20%]"
        alt=""
      />
      <img
        src="/images/symbol.svg"
        className="absolute h-[20%] w-auto object-contain filter !blur-sm opacity-30 right-[10%]"
        alt=""
      />

      <div className="absolute inset-0 z-5 flex items-center justify-center top-20">
        <img
          src="/images/symbol.svg"
          className="h-[100%] w-auto object-contain !blur-3xl !fill-blue-600"
          alt=""
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-end justify-center">
        <img
          src="/images/symbol.svg"
          alt=""
          className="absolute inset-0 z-30 top-[400px] left-[40%] h-[70%] w-auto object-contain !blur-3xl !fill-blue-600 !mix-blend-hard-light"
        />
        <img
          src="/images/img-profile-2.webp"
          alt="Eduardo Pavani"
          className="max-w-[110%] max-h-[80%] sm:h-full sm:max-h-full sm:max-w-lg md:max-w-2xl lg:max-w-[100%] w-auto object-contain object-bottom"
        />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 mt-28 md:mt-44">
        <div className="flex items-center mb-6 md:mb-6">
          <img
            src="/images/logo.svg"
            alt="eduardopavani"
            className="h-12 sm:h-14 md:h-20 lg:h-28 w-auto"
          />
        </div>
        <h1 className="text-lg sm:text-xl md:text-3xl md:max-w-2xl leading-[1.7] sm:leading-[1.4] font-extralight">
          Estratégia, clareza e execução na construção de produtos digitais.
        </h1>
        <div className="flex items-center gap-2 sm:gap-6 mt-6 sm:mt-8 md:mt-12 text-white">
          <a
            href="https://wa.me/5548991587232"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entre em contato pelo WhatsApp"
            className="text-white border border-transparent hover:border-blue-700 transition-colors duration-300 p-4 rounded-lg bg-transparent">
            <WhatsAppIcon className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/eduardopavani/"
            aria-label="Visite meu perfil no LinkedIn"
            className="text-white border border-transparent hover:border-blue-700 transition-colors duration-300 p-4 rounded-lg bg-transparent">
            <LinkedInIcon className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a
            href="https://www.instagram.com/eduardopavanipro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visite meu perfil no Instagram"
            className="text-white border border-transparent hover:border-blue-700 transition-colors duration-300 p-4 rounded-lg bg-transparent">
            <InstagramIcon className="w-6 h-6 md:w-8 md:h-8" />
          </a>
        </div>
      </div>
    </section>
  );
}
