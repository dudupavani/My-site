import { CircleArrowRight } from "lucide-react";

export function ExperienceSection() {
  return (
    <section className="relative bg-stone-900 text-white py-20 sm:py-24 md:py-32 px-4 sm:px-12 md:px-20 lg:px-24 overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24">
        <div className="flex flex-col gap-10 sm:gap-8 xl:gap-8 items-center basis-0 grow-6">
          <div className="space-y-4 max-w-4xl text-left px-4 sm:px-0">
            <h2 className="text-3xl lg:text-4xl leading-tight sm:leading-[1.3]">
              Experiência e responsabilidade real
            </h2>
            <p className="text-stone-400 text-base sm:text-lg md:text-xl leading-[1.6] font-regular lg:font-extralight">
              Ao longo de mais de 20 anos, atuei em contextos onde decisões de
              produto eram decisões de negócio
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="flex items-start gap-2 md:gap-4 border-b border-stone-700/40 py-4 sm:py-6">
              <span className="text-yellow-500 mt-1">
                <CircleArrowRight className="w-4 h-4 md:w-6 md:h-6" />
              </span>
              <p className="text-base leading-[1.8] text-white font-light">
                Fundador de duas empresas, uma de software e sites e outra de
                propaganda, branding e design, com atuação direta em negócio,
                gestão de equipe, relacionamento com clientes e entregas.
              </p>
            </div>
            <div className="flex items-start gap-2 md:gap-4 border-b border-stone-700/40 py-4 sm:py-6">
              <span className="text-yellow-500 mt-1">
                <CircleArrowRight className="w-4 h-4 md:w-6 md:h-6" />
              </span>
              <p className="text-base leading-[1.8] text-white font-light">
                Liderança de produto em startup alemã de EdTech, estruturando a
                visão de produto com o founder e estratégias de execução com
                liderança de engenharia.
              </p>
            </div>
            <div className="flex items-start gap-2 md:gap-4 border-b border-stone-700/40 py-4 sm:py-6">
              <span className="text-yellow-500 mt-1">
                <CircleArrowRight className="w-4 h-4 md:w-6 md:h-6" />
              </span>
              <p className="text-base leading-[1.8] text-white font-light">
                Atualmente na{" "}
                <a
                  href="https://yungas.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-yellow-500 transition-colors">
                  Yungas Tecnologia
                </a>
                , faço parte do board de produto com os founders, lidero a
                concepção e direcionamentos estratégicos de execução.
              </p>
            </div>
            <div className="flex items-start gap-2 md:gap-4 border-b border-stone-700/40 py-4 sm:py-6">
              <span className="text-yellow-500 mt-1">
                <CircleArrowRight className="w-4 h-4 md:w-6 md:h-6" />
              </span>
              <p className="text-base leading-[1.8] text-white font-light">
                Atualmente meu trabalho impacta operações de grande porte, com
                marcas como Burger King, Subway, Bob’s, CNA Idiomas, Omie, entre
                outras.
              </p>
            </div>
          </div>
        </div>
        <div className="basis-0 lg:grow-4 scale-90 sm:w-auto">
          <img
            src="/images/me-final.webp"
            alt="eduardo pavani - product lead"
            className="block w-full h-auto rounded-3xl shadow-2xl shadow-stone-950/40"
          />
        </div>
      </div>
    </section>
  );
}
