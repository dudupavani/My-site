import { LegalPageLayout } from "@/src/modules/legal/ui/LegalPageLayout";

const sectionClass = "space-y-3 border-t border-zinc-800 pt-7 first:border-0 first:pt-0";
const headingClass = "text-xl font-medium text-zinc-100";
const paragraphClass = "text-[15px] leading-7 text-zinc-400";
const linkClass = "text-gold-400 underline decoration-gold-800 underline-offset-4 hover:text-gold-300";

export function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Privacidade"
      title="Como os dados são tratados."
      summary="Esta política explica o tratamento de dados no site Eduardo Pavani e na ferramenta administrativa de SEO conectada ao Google Search Console."
    >
      <section className={sectionClass}>
        <h2 className={headingClass}>Responsável e contato</h2>
        <p className={paragraphClass}>
          Eduardo Pavani é responsável pelo tratamento de dados realizado neste site e na ferramenta administrativa descrita aqui. Para dúvidas ou solicitações sobre privacidade, entre em contato pelo <a className={linkClass} href="https://wa.me/5548991587232" target="_blank" rel="noreferrer">WhatsApp</a>.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Dados tratados</h2>
        <p className={paragraphClass}>
          Nas páginas públicas, o site carrega o Google Tag Manager para administrar etiquetas de medição. As etiquetas habilitadas podem usar cookies ou tecnologias semelhantes e tratar informações como páginas visitadas, interações, navegador e dispositivo. O funcionamento depende das etiquetas configuradas no contêiner do site; consulte também a política de privacidade do <a className={linkClass} href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google</a>.
        </p>
        <p className={paragraphClass}>
          O acesso ao painel administrativo usa autenticação por link enviado ao e-mail informado pelo administrador. Se o administrador conectar uma conta Google, a integração recebe tokens OAuth e consulta métricas de pesquisa, páginas e o estado dos sitemaps da propriedade autorizada.
        </p>
        <p className={paragraphClass}>
          O site também contém links para serviços externos, como WhatsApp, LinkedIn e Instagram. Ao acessá-los, o tratamento de dados passa a seguir as políticas desses serviços.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Finalidades e uso de dados do Google</h2>
        <p className={paragraphClass}>
          Os dados do Search Console são usados exclusivamente para avaliar a presença orgânica de eduardopavani.com e consultar o estado dos sitemaps. Não são vendidos, usados para publicidade, criação de perfis de usuários ou treinamento de modelos de inteligência artificial.
        </p>
        <p className={paragraphClass}>
          A aplicação solicita dados do Google apenas após a autorização do administrador. Os dados de relatórios são consultados para exibição na área administrativa; o token de atualização OAuth é armazenado no servidor em formato criptografado para manter a conexão. O acesso é restrito ao servidor e protegido por controles do banco de dados.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Armazenamento, retenção e terceiros</h2>
        <p className={paragraphClass}>
          O token OAuth é mantido enquanto a integração estiver conectada. O administrador pode desconectar a integração no painel ou revogar o acesso nas configurações de segurança da Conta Google. Ao desconectar pelo painel, o token é removido do banco e a aplicação solicita ao Google a revogação do acesso. Dados técnicos necessários à hospedagem, autenticação e segurança podem ser processados pelos provedores usados para operar o site, incluindo Vercel, Supabase e Google.
        </p>
        <p className={paragraphClass}>
          Esses provedores podem processar informações em outros países e aplicam suas próprias medidas e políticas. O site não compartilha dados do Search Console com terceiros para fins próprios deles, salvo o necessário para realizar as chamadas ao Google ou operar a infraestrutura do serviço.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Seus direitos</h2>
        <p className={paragraphClass}>
          Nos termos da legislação aplicável, inclusive da LGPD quando aplicável, você pode solicitar confirmação do tratamento, acesso, correção, anonimização, bloqueio ou eliminação de dados, além de exercer outros direitos previstos em lei. Envie a solicitação pelo canal de contato acima; pedidos serão avaliados e respondidos conforme os requisitos legais.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Atualizações</h2>
        <p className={paragraphClass}>
          Esta política pode ser atualizada para refletir mudanças no site, nos serviços usados ou na integração. A versão vigente ficará disponível nesta página, com a data da última atualização no início do documento.
        </p>
      </section>
    </LegalPageLayout>
  );
}
