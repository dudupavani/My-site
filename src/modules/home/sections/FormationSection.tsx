const formations = [
  {
    degree: "Bacharel em Desenho Industrial - Programação Visual",
    logo: "/images/logos-form/univ%20positivo%20white.webp",
    alt: "Universidade Positivo",
    logoClass:
      "max-w-[110px] max-h-[24px] sm:max-w-[120px] sm:max-h-[50px] object-contain",
  },
  {
    degree: "Pós-graduação em Design de Hipermídia",
    logo: "/images/logos-form/anhembi%20white.webp",
    alt: "Anhembi Morumbi",
    logoClass:
      "max-w-[110px] max-h-[24px] sm:max-w-[130px] sm:max-h-[50px] object-contain",
  },
  {
    degree: "Digital Product Leadership - Product Manager",
    logo: "/images/logos-form/tera%20white.webp",
    alt: "Tera",
    logoClass:
      "max-w-[120px] max-h-[20px] sm:max-w-[120px] sm:max-h-[26px] object-contain",
  },
  {
    degree: "Marketing Digital - Nanodegree",
    logo: "/images/logos-form/udacity%20white.webp",
    alt: "Udacity",
    logoClass: "max-w-[100px] max-h-[24px] sm:max-h-[50px] object-contain",
  },
  {
    degree: "Estratégias Digitais de Marketing",
    logo: "/images/logos-form/espm%20vazada%20white.webp",
    alt: "ESPM",
    logoClass:
      "max-w-[100px] max-h-[18px] sm:max-w-[120px] sm:max-h-[24px] object-contain",
  },
  {
    degree: "Atendimento em Agências de Comunicação",
    logo: "/images/logos-form/espm%20vazada%20white.webp",
    alt: "ESPM",
    logoClass:
      "max-w-[100px] max-h-[18px] sm:max-w-[120px] sm:max-h-[24px] object-contain",
  },
];

export function FormationSection() {
  return (
    <section className="bg-zinc-900 text-white">
      <div className="flex flex-col items-stretch">
        <div className="flex justify-start md:justify-center items-center px-6 pt-12 pb-6 sm:py-12">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-2xl font-medium -tracking-wide text-zinc-500">
            Formação
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-1 gap-2 px-6 sm:px-12">
          {formations.map((item) => (
            <div
              key={item.degree}
              className="px-6 py-6 md:py-10 md:px-10 border border-zinc-800/60 bg-zinc-950/30 rounded-xl flex flex-col gap-2 justify-between">
              <h3 className="text-base sm:text-lg mb-2 text-white">
                {item.degree}
              </h3>
              <div className="opacity-60">
                <img
                  src={item.logo}
                  alt={item.alt}
                  className={item.logoClass}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
