import { LegalPageLayout } from "@/src/modules/legal/ui/LegalPageLayout";

const sectionClass = "space-y-3 border-t border-zinc-800 pt-7 first:border-0 first:pt-0";
const headingClass = "text-xl font-medium text-zinc-100";
const paragraphClass = "text-[15px] leading-7 text-zinc-400";

export function TermsOfUsePage() {
  return (
    <LegalPageLayout
      eyebrow="Termos de uso"
      title="Regras para usar a ferramenta."
      summary="Estes termos se aplicam ao painel administrativo e à integração privada de SEO do site eduardopavani.com."
    >
      <section className={sectionClass}>
        <h2 className={headingClass}>Escopo</h2>
        <p className={paragraphClass}>
          O painel é uma ferramenta privada para administrar o site e consultar métricas de pesquisa e o estado dos sitemaps do próprio conteúdo. Não é um serviço público de análise de sites, não oferece contas abertas ao público e não possui cobrança ou assinatura.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Conexão com o Google</h2>
        <p className={paragraphClass}>
          Ao conectar o Google Search Console, o administrador declara que tem autorização para acessar a propriedade selecionada e consente com as permissões exibidas pelo Google. O uso dos dados também está sujeito aos <a className="text-gold-400 underline decoration-gold-800 underline-offset-4 hover:text-gold-300" href="https://developers.google.com/terms" target="_blank" rel="noreferrer">Termos de Serviço das APIs do Google</a> e às políticas aplicáveis do Google.
        </p>
        <p className={paragraphClass}>
          A autorização pode ser encerrada pelo botão de desconexão do painel ou revogada a qualquer momento nas configurações da Conta Google. Ao desconectar pelo painel, a credencial armazenada é removida e o sistema solicita ao Google a revogação do acesso.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Uso responsável e limitações</h2>
        <p className={paragraphClass}>
          O painel deve ser usado somente para administrar o site e propriedades que o administrador está autorizado a acessar. Não use a integração para contornar permissões do Google, acessar propriedades alheias ou violar leis e direitos de terceiros.
        </p>
        <p className={paragraphClass}>
          As métricas e informações de sitemaps são fornecidas pelo Google e podem ter atrasos, limites ou alterações. Os dados do painel não garantem que uma página seja indexada, exibida ou tenha determinada posição nos resultados de busca.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Disponibilidade e alterações</h2>
        <p className={paragraphClass}>
          A ferramenta depende de serviços externos, incluindo Google, Supabase e Vercel. Esses serviços podem sofrer interrupções, impor limites ou alterar suas condições. A funcionalidade pode ser modificada ou suspensa quando necessário para segurança, manutenção ou mudanças nesses serviços.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Contato</h2>
        <p className={paragraphClass}>
          Para dúvidas sobre estes termos, use o canal de contato informado na <a className="text-gold-400 underline decoration-gold-800 underline-offset-4 hover:text-gold-300" href="/privacidade">política de privacidade</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
