type FormationItem = {
  name: string;
  institution: string;
  logo: string;
  logoClassName: string;
  opacityClassName?: string;
};

const formationItems: FormationItem[] = [
  {
    name: "Bacharel em Desenho Industrial - Programação Visual",
    institution: "Universidade Positivo - Curitiba-PR",
    logo: "/images/logos-form/univ%20positivo%20white.webp",
    logoClassName: "h-[45px] w-[112px]",
  },
  {
    name: "Pós-graduação em Design de Hipermídia",
    institution: "Universidade Anhembi Morumbi - São Paulo-SP",
    logo: "/images/logos-form/anhembi%20white.webp",
    logoClassName: "h-[48px] w-[119px]",
  },
  {
    name: "Digital Product Leadership",
    institution: "Tera",
    logo: "/images/logos-form/tera%20white.webp",
    logoClassName: "h-[45px] w-[62px]",
  },
  {
    name: "Marketing Digital",
    institution: "Udacity",
    logo: "/images/logos-form/udacity%20white.webp",
    logoClassName: "h-[45px] w-[112px]",
  },
  {
    name: "Estratégias Digitais de Marketing",
    institution: "Escola Superior de Propaganda e Marketing - São Paulo-SP",
    logo: "/images/logos-form/espm%20vazada%20white.webp",
    logoClassName: "h-[26px] w-[64px]",
  },
  {
    name: "Atendimento em Agências de Comunicação",
    institution: "Escola Superior de Propaganda e Marketing - São Paulo-SP",
    logo: "/images/logos-form/espm%20vazada%20white.webp",
    logoClassName: "h-[26px] w-[64px]",
  },
  {
    name: "Posicionamento de marca",
    institution: "Brandster",
    logo: "/images/formacao/brandster.png",
    logoClassName: "h-[60px] w-[150px]",
    opacityClassName: "opacity-70",
  },
];

const certificateItems: FormationItem[] = [
  {
    name: "Métricas para negócios digitais",
    institution: "PM3",
    logo: "/images/formacao/pm3.png",
    logoClassName: "h-[28px] w-[84px]",
    opacityClassName: "opacity-70",
  },
  {
    name: "User Experience",
    institution: "FIAP ON",
    logo: "/images/formacao/fiap.png",
    logoClassName: "h-[26px] w-[89px]",
    opacityClassName: "opacity-70",
  },
];

function SectionIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full max-w-75 flex-col gap-2 leading-[1.4]">
      <h2 className="whitespace-nowrap text-2xl font-semibold leading-[1.4] text-zinc-200">
        {title}
      </h2>
      <p className="font-mono text-xs uppercase leading-[1.4] tracking-[0.25em] text-zinc-500">
        {description}
      </p>
    </div>
  );
}

function FormationCard({ item }: { item: FormationItem }) {
  return (
    <article className="flex w-full flex-col gap-6 rounded-lg bg-zinc-950/40 px-6 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10 sm:p-8">
      <div className="min-w-0 flex-1">
        <h3 className="text-base sm:text-lg font-medium leading-[1.4] text-white">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-[1.3] text-zinc-400">
          {item.institution}
        </p>
      </div>
      <div className="flex shrink-0 items-center sm:min-h-12">
        <img
          src={item.logo}
          alt={item.institution}
          className={`${item.logoClassName} ${item.opacityClassName ?? "opacity-60"} object-contain`}
        />
      </div>
    </article>
  );
}

function FormationBlock({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: FormationItem[];
}) {
  return (
    <section className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10 pb-20 border-b last:border-0 border-zinc-800">
      <SectionIntro title={title} description={description} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <FormationCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}

export function AcademicSection() {
  return (
    <div className="flex flex-col gap-20">
      <FormationBlock
        title="Formação"
        description="Graduação - pós-graduação e cursos de formação profissional"
        items={formationItems}
      />
      <FormationBlock
        title="Certificados"
        description="Cursos rápidos introdutórios"
        items={certificateItems}
      />
    </div>
  );
}
