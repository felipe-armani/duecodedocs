/* ================================================================
   DueCodeDocs — SPA Router + Module Data
   ================================================================ */

// ── Module Data ────────────────────────────────────────────
const MODULES = [
  { code: "00", id: "home",        to: "/",                       label: "Visão geral" },
  { code: "01", id: "acesso",      to: "/modulos/acesso",         label: "Acesso ao ambiente" },
  { code: "02", id: "painel",      to: "/modulos/painel",         label: "Painel & navegação" },
  { code: "03", id: "repositorios",to: "/modulos/repositorios",   label: "Repositórios" },
  { code: "04", id: "analise",     to: "/modulos/analise",        label: "Análise de código" },
  { code: "05", id: "pullrequests",to: "/modulos/pullrequests",   label: "Pull Requests" },
  { code: "06", id: "pipelines",   to: "/modulos/pipelines",      label: "Pipelines CI/CD" },
  { code: "07", id: "configuracoes",to: "/modulos/configuracoes", label: "Configurações" },
  { code: "08", id: "integracoes", to: "/modulos/integracoes",    label: "Integrações" },
  { code: "09", id: "logs",        to: "/modulos/logs",           label: "Logs & auditoria" },
  { code: "10", id: "status",      to: "/modulos/status",         label: "Status do sistema" },
];

// ── Project Switcher ──────────────────────────────────────
const PROJECTS = [
  { id: "duecode", name: "DueCode", url: "https://felipe-armani.github.io/duecodedocs/" },
  { id: "profile", name: "Profile", url: "https://duegetec.github.io/profiledocs/" },
  { id: "pam",     name: "PAM",     url: "https://felipe-armani.github.io/pamdocs/" },
];
const CURRENT_PROJECT = "duecode";

function buildProjectSwitcher() {
  const sel = document.getElementById('projectSwitcher');
  if (!sel) return;
  sel.innerHTML = PROJECTS.map(p =>
    `<option value="${p.id}"${p.id === CURRENT_PROJECT ? ' selected' : ''}>${p.name}</option>`
  ).join('');
  sel.addEventListener('change', () => {
    const p = PROJECTS.find(x => x.id === sel.value);
    if (p) window.location.href = p.url;
  });
}

// ── Version Switcher ──────────────────────────────────────
const VERSIONS = [
  { label: "v1.0", url: "https://felipe-armani.github.io/duecodedocs/" },
];
const CURRENT_VERSION = "v1.0";

function buildVersionSwitcher() {
  const sel = document.getElementById('versionSwitcher');
  if (!sel) return;
  sel.innerHTML = VERSIONS.map(v =>
    `<option value="${v.label}"${v.label === CURRENT_VERSION ? ' selected' : ''}>${v.label}</option>`
  ).join('');
  sel.addEventListener('change', () => {
    const v = VERSIONS.find(x => x.label === sel.value);
    if (v) window.location.href = v.url;
  });
}

// ── Base Path (detect GitHub Pages only) ─────────────────
let basePath = '';
(function() {
  const p = window.location.pathname;
  if (window.location.hostname.includes('github.io') && p.includes('/duecodedocs/')) basePath = '/duecodedocs';
})();

// ── Module Content ─────────────────────────────────────────
const CONTENT = {

home: {
  title: "Plataforma de qualidade de código — DueCode",
  intro: "Documentação técnica destinada aos usuários finais da plataforma DueCode. Reúne os procedimentos padronizados de acesso, gestão de repositórios, análise de código, revisão de pull requests e pipelines de CI/CD.",
},

acesso: {
  title: "Acesso ao ambiente",
  intro: "Procedimento de autenticação para acesso à plataforma DueCode. Utilize suas credenciais corporativas ou autenticação via GitHub/GitLab.",
  steps: [
    {
      title: "Tela de login",
      summary: "Acesse a URL da plataforma DueCode com seu navegador. É possível autenticar via SSO corporativo ou OAuth com GitHub/GitLab.",
      html: `
        ${figure("01-login.png", "Tela de login do DueCode", "Fig. 01 — Tela de autenticação do DueCode")}
        ${stepList(["Abra a URL do DueCode no navegador corporativo.", "Escolha o método de autenticação: SSO corporativo ou GitHub/GitLab.", "Informe suas credenciais.", "Clique em Entrar para acessar a plataforma."])}
      `
    },
    {
      title: "Verificação de acesso",
      summary: "O sistema valida automaticamente seu perfil, permissões e vínculo com organizações.",
      html: fieldGrid([
        ["Autenticação", "SSO corporativo + OAuth GitHub/GitLab"],
        ["Validação", "Permissões verificadas automaticamente por organização"],
        ["Sessão", "Token JWT com expiração configurável"],
        ["Segurança", "2FA disponível para administradores"],
      ])
    },
    {
      title: "Problemas de acesso",
      summary: "Caso não consiga acessar, verifique as situações abaixo antes de acionar o suporte.",
      html: stepList([
        "Confira se seu e-mail e senha estão corretos.",
        "Verifique se sua conta está ativa e vinculada a uma organização.",
        "Certifique-se de que o token OAuth do GitHub/GitLab não expirou.",
        "Caso o problema persista, acione o suporte de DevOps.",
      ])
    },
    {
      title: "Redefinição de senha",
      summary: "Utilize a opção 'Esqueci minha senha' na tela de login para recuperar o acesso.",
      html: callout("Próximo passo", "Após autenticação, avance para o módulo <strong>02 — Painel & navegação</strong>.")
    }
  ]
},

painel: {
  title: "Painel & navegação",
  intro: "Dashboard principal com visão consolidada de repositórios, análises pendentes, pull requests abertos e status dos pipelines.",
  steps: [
    {
      title: "Dashboard principal",
      summary: "Ponto de entrada após login. Exibe cards de KPI e gráficos de atividade recente.",
      html: `
        ${figure("02-dashboard.png", "Dashboard DueCode", "Fig. 02 — Dashboard com cards de estatísticas")}
        ${fieldGrid([
          ["📁 Repositórios", "Total de repositórios monitorados"],
          ["🔍 Análises", "Análises de código pendentes e concluídas"],
          ["🔀 Pull Requests", "PRs abertos aguardando revisão"],
          ["⚙️ Pipelines", "Execuções de pipeline em andamento"],
        ])}
      `
    },
    {
      title: "Menu lateral",
      summary: "Sidebar fixa com acesso a todos os módulos: Repositórios, Análise, PRs, Pipelines, Configurações.",
      html: stepList([
        "Visão Geral — Dashboard principal (página atual)",
        "Repositórios — Gestão de repositórios de código",
        "Análise de Código — Resultados e métricas de qualidade",
        "Pull Requests — Revisão e aprovação de código",
        "Pipelines — Configuração e execução de CI/CD",
        "Integrações — Conexão com GitHub, GitLab, Bitbucket",
        "Configurações — Regras, webhooks, notificações",
        "Logs — Registro de auditoria das operações",
        "Status — Saúde dos serviços e workers",
      ])
    },
    {
      title: "Seletor de organização",
      summary: "Dropdown para alternar entre organizações. Usuários podem pertencer a múltiplas organizações.",
      html: callout("Funcionalidade", "Os cards do dashboard e as tabelas são atualizados automaticamente ao trocar a organização no seletor. O painel também exibe o status de processamento das filas de análise.")
    }
  ]
},

repositorios: {
  title: "Repositórios",
  intro: "Gestão de repositórios de código vinculados à plataforma DueCode. Adicione repositórios do GitHub, GitLab ou Bitbucket para monitoramento e análise.",
  steps: [
    {
      title: "Listagem de repositórios",
      summary: "Tabela com todos os repositórios cadastrados: Nome, Organização, Linguagem, Última análise e Status.",
      html: figure("03-repositorios.png", "Listagem de repositórios", "Fig. 03 — Tabela de repositórios do DueCode")
    },
    {
      title: "Adicionar repositório",
      summary: "Formulário para adicionar um novo repositório ao monitoramento.",
      html: stepList([
        "Clique em Novo Repositório para abrir o formulário.",
        "Selecione a organização e o provedor (GitHub, GitLab, Bitbucket).",
        "Busque e selecione o repositório desejado.",
        "Configure as opções de análise e clique em Salvar.",
      ])
    },
    {
      title: "Configuração de análise",
      summary: "Defina regras de análise, frequência e escopo para cada repositório.",
      html: fieldGrid([
        ["Branch padrão", "Branch principal para análise (main, master, develop)"],
        ["Frequência", "A cada push, PR ou agendamento periódico"],
        ["Escopo", "Arquivos e diretórios analisados (com suporte a glob)"],
        ["Regras", "Conjunto de regras aplicadas (padrão ou customizado)"],
      ])
    },
    {
      title: "Remover repositório",
      summary: "Desvincule um repositório da plataforma sem afetar o código-fonte original.",
      html: callout("Atenção", "A remoção do repositório do DueCode não afeta o repositório original no provedor (GitHub, GitLab, etc.). Apenas interrompe o monitoramento e remove os dados de análise armazenados.")
    }
  ]
},

analise: {
  title: "Análise de código",
  intro: "Resultados das análises estáticas de código: métricas de qualidade, complexidade, duplicação, cobertura de testes e vulnerabilidades.",
  steps: [
    {
      title: "Visão geral da análise",
      summary: "Dashboard de qualidade com pontuação geral, tendências e distribuição de problemas por severidade.",
      html: `
        ${figure("04-analise.png", "Análise de código", "Fig. 04 — Dashboard de qualidade de código")}
        ${fieldGrid([
          ["🏆 Code Score", "Pontuação de 0-100 baseada em métricas agregadas"],
          ["🐛 Bugs", "Potenciais bugs detectados por análise estática"],
          ["🔒 Segurança", "Vulnerabilidades e exposições (CVEs)"],
          ["📏 Code Smells", "Más práticas e violações de estilo"],
        ])}
      `
    },
    {
      title: "Métricas detalhadas",
      summary: "Aprofunde nas métricas de cada arquivo e diretório do repositório.",
      html: stepList([
        "Selecione um repositório no dashboard de análise.",
        "Navegue pela árvore de arquivos para ver métricas individuais.",
        "Clique em um arquivo para ver o código-fonte anotado com os problemas encontrados.",
        "Utilize os filtros por severidade, categoria e data.",
      ])
    },
    {
      title: "Linha do tempo de qualidade",
      summary: "Acompanhe a evolução das métricas ao longo do tempo com gráficos de tendência.",
      html: callout("Dica", "Configure metas de qualidade (Quality Gates) para bloquear merges quando as métricas estiverem abaixo do esperado. Veja o módulo <strong>06 — Pipelines</strong> para configurar Quality Gates.")
    }
  ]
},

pullrequests: {
  title: "Pull Requests",
  intro: "Revisão de código integrada com análise automática. Cada PR recebe um relatório de qualidade antes da aprovação.",
  steps: [
    {
      title: "Listagem de PRs",
      summary: "Visão consolidada de todos os pull requests abertos com status da análise.",
      html: `
        ${figure("05-pullrequests.png", "Lista de Pull Requests", "Fig. 05 — Pull requests com status de análise")}
        ${fieldGrid([
          ["✅ Aprovado", "PR passou em todas as verificações"],
          ["⚠️ Atenção", "Problemas encontrados que exigem revisão"],
          ["❌ Bloqueado", "PR não atende aos Quality Gates"],
          ["⏳ Pendente", "Análise em andamento"],
        ])}
      `
    },
    {
      title: "Relatório de análise no PR",
      summary: "Cada PR recebe um comentário automático com o resumo da análise e problemas encontrados.",
      html: stepList([
        "Abra um pull request no provedor (GitHub, GitLab).",
        "O DueCode analisa automaticamente as alterações.",
        "Um comentário é publicado no PR com o resumo da análise.",
        "Revise os problemas apontados e corrija antes do merge.",
      ])
    },
    {
      title: "Code Review assistida",
      summary: "Sugestões automáticas de melhorias baseadas nas regras configuradas.",
      html: callout("Funcionalidade", "O DueCode sugere trechos de código alternativos para corrigir problemas. As sugestões podem ser aplicadas diretamente no PR com um clique (disponível para GitHub).")
    }
  ]
},

pipelines: {
  title: "Pipelines CI/CD",
  intro: "Configuração e monitoramento de pipelines de integração e entrega contínua. Automatize builds, testes e deploys com Quality Gates integrados.",
  steps: [
    {
      title: "Visão geral de pipelines",
      summary: "Dashboard com todas as execuções de pipeline: status, duração e taxa de sucesso.",
      html: figure("06-pipelines.png", "Pipelines CI/CD", "Fig. 06 — Dashboard de pipelines")
    },
    {
      title: "Configuração de Quality Gates",
      summary: "Defina critérios de qualidade que devem ser atendidos para o pipeline avançar.",
      html: `
        ${fieldGrid([
          ["Code Score mínimo", "Nota mínima de qualidade (ex: 80/100)"],
          ["Cobertura mínima", "Percentual mínimo de cobertura de testes (ex: 80%)"],
          ["Bugs críticos", "Zero bugs de severidade crítica"],
          ["Vulnerabilidades", "Zero vulnerabilidades de severidade alta"],
        ])}
        ${callout("Configuração", "Quality Gates são definidos por repositório no módulo <strong>07 — Configurações</strong>. Podem ser diferentes por branch (ex: mais rigoroso na main).")}
      `
    },
    {
      title: "Execução manual",
      summary: "Dispara pipelines manualmente para branches específicas ou tags.",
      html: stepList([
        "Acesse o módulo Pipelines e selecione um repositório.",
        "Clique em Executar Pipeline.",
        "Selecione a branch ou tag de origem.",
        "Confirme para iniciar a execução.",
      ])
    }
  ]
},

configuracoes: {
  title: "Configurações",
  intro: "Central de configurações do DueCode: regras de análise, Quality Gates, webhooks, notificações e chaves de API.",
  steps: [
    {
      title: "Regras de análise",
      summary: "Gerencie os conjuntos de regras aplicadas nas análises de código.",
      html: `
        ${figure("07-configuracoes.png", "Configurações do DueCode", "Fig. 07 — Painel de configurações")}
        ${fieldGrid([
          ["Regras padrão", "Conjunto base para todas as linguagens"],
          ["Regras customizadas", "Regras específicas por repositório ou organização"],
          ["Severidade", "Ajuste de severidade para cada regra"],
          ["Supressão", "Marcação de falsos positivos"],
        ])}
      `
    },
    {
      title: "Webhooks",
      summary: "Configure endpoints para receber notificações de eventos da plataforma.",
      html: stepList([
        "Acesse Configurações → Webhooks.",
        "Adicione a URL do seu endpoint.",
        "Selecione os eventos que deseja receber.",
        "Salve e teste a conexão com um evento de exemplo.",
      ])
    },
    {
      title: "Notificações",
      summary: "Canais de notificação: Slack, Discord, Microsoft Teams e e-mail.",
      html: callout("Integração", "Conecte o DueCode ao Slack para receber notificações de análises concluídas, PRs com problemas e pipelines falhos diretamente nos canais da sua equipe.")
    },
    {
      title: "Chaves de API",
      summary: "Gerencie chaves de API para integração com sistemas externos e CI/CD.",
      html: fieldGrid([
        ["API Key", "Chave para autenticação nas APIs do DueCode"],
        ["Escopo", "Permissões da chave (leitura, escrita, admin)"],
        ["Expiração", "Data de expiração configurável"],
        ["Revogação", "Revogue chaves comprometidas imediatamente"],
      ])
    }
  ]
},

integracoes: {
  title: "Integrações",
  intro: "Conecte o DueCode com provedores de código, ferramentas de CI/CD e plataformas de comunicação.",
  steps: [
    {
      title: "Painel de integrações",
      summary: "Lista de integrações configuradas com tipo, status e última sincronização.",
      html: figure("08-integracoes.png", "Painel de integrações", "Fig. 08 — Integrações configuradas")
    },
    {
      title: "Provedores de código",
      summary: "GitHub, GitLab e Bitbucket. Configure a conexão OAuth para cada provedor.",
      html: fieldGrid([
        ["GitHub", "OAuth App + GitHub App para comentários em PRs"],
        ["GitLab", "OAuth + webhooks para eventos de merge request"],
        ["Bitbucket", "OAuth + integração com Pipelines"],
      ])
    },
    {
      title: "Ferramentas externas",
      summary: "Integração com SonarQube, Snyk, Checkmarx e outras ferramentas de segurança.",
      html: callout("Disponível", "A exportação de resultados para SonarQube está disponível no plano Enterprise. Consulte o time de DevOps para ativar.")
    }
  ]
},

logs: {
  title: "Logs & auditoria",
  intro: "Registro de todas as operações realizadas na plataforma para fins de auditoria e rastreabilidade.",
  steps: [
    {
      title: "Visualização de logs",
      summary: "Tabela com data, usuário, ação, recurso afetado e detalhes da operação.",
      html: figure("09-logs.png", "Logs de auditoria", "Fig. 09 — Logs do sistema")
    },
    {
      title: "Filtros e exportação",
      summary: "Filtre logs por período, usuário, ação ou recurso. Exporte para CSV ou JSON.",
      html: stepList([
        "Selecione o período desejado no calendário.",
        "Aplique filtros por usuário, ação ou tipo de recurso.",
        "Visualize os resultados na tabela.",
        "Clique em Exportar para baixar em CSV ou JSON.",
      ])
    }
  ]
},

status: {
  title: "Status do sistema",
  intro: "Monitoramento de workers, filas de processamento e saúde dos serviços da plataforma DueCode.",
  steps: [
    {
      title: "Status de serviços",
      summary: "Visão geral dos serviços com indicadores de saúde, latência e tempo de atividade.",
      html: `
        ${figure("10-status.png", "Status do sistema", "Fig. 10 — Status dos serviços")}
        ${fieldGrid([
          ["🟢 API", "Serviço principal — operacional"],
          ["🟢 Workers", "Processamento de análises — operacional"],
          ["🟢 Banco de dados", "Cluster de banco de dados — operacional"],
          ["🟡 Cache", "Redis — latência elevada"],
        ])}
      `
    },
    {
      title: "Filas de processamento",
      summary: "Status das filas de análise de código: pendentes, em processamento e concluídas.",
      html: callout("Monitoramento", "O tempo médio de processamento de uma análise é de 2-5 minutos, dependendo do tamanho do repositório. Repositórios muito grandes (>1GB) podem levar até 15 minutos.")
    }
  ]
}

}; // end CONTENT

// ── Helper: HTML generators ────────────────────────────────
function figure(src, alt, caption) {
  return `
    <div class="figure" data-zoom="${basePath}/assets/${src}">
      <img src="${basePath}/assets/${src}" alt="${alt}" loading="lazy" onerror="this.parentElement.style.display='none'">
      <span class="fig-badge">🔍 Ampliar</span>
      ${caption ? `<div class="fig-caption">${caption}</div>` : ''}
    </div>`;
}

function stepList(items) {
  return `<ol class="step-list">${items.map((t, i) =>
    `<li><span class="sl-num">${String(i+1).padStart(2,'0')}</span><span>${t}</span></li>`
  ).join('')}</ol>`;
}

function fieldGrid(pairs) {
  return `<div class="field-grid">${pairs.map(([k,v]) =>
    `<div class="fg-item"><div class="fg-k">${k}</div><div class="fg-v">${v}</div></div>`
  ).join('')}</div>`;
}

function callout(title, text) {
  return `<div class="callout"><div class="co-label">${title}</div><div class="co-text">${text}</div></div>`;
}

// ── State ───────────────────────────────────────────────────
let currentModule = null;
let currentStep = 0;

// ── Router ──────────────────────────────────────────────────
function navigate(path) {
  history.pushState(null, '', basePath + path);
  renderRoute(path);
}

function getRouteFromPath() {
  let p = window.location.pathname;
  if (basePath) p = p.replace(basePath, '') || '/';
  return p;
}

function renderRoute(path) {
  const main = document.getElementById('main');
  const sid = document.getElementById('sidebar');

  if (path === '/') {
    currentModule = 'home';
    currentStep = 0;
    renderHome(main);
  } else {
    const mod = MODULES.find(m => m.to === path && m.id !== 'home');
    if (mod && CONTENT[mod.id]) {
      currentModule = mod.id;
      currentStep = 0;
      renderModule(main, mod, CONTENT[mod.id]);
    } else {
      main.innerHTML = `<div class="hero"><h1>404</h1><p>Página não encontrada.</p><a href="${basePath}/" class="btn" data-nav="/">Voltar ao início</a></div>`;
    }
  }

  updateNav();
  if (sid) sid.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('open');
  window.scrollTo(0, 0);
}

// ── Render: Home ────────────────────────────────────────────
function renderHome(main) {
  const mods = MODULES.filter(m => m.id !== 'home');
  main.innerHTML = `
    <section class="hero">
      <div class="doc-ref">DOC · 2026.06 / REV 01</div>
      <div class="hero-eyebrow">Duegetec · Manual operacional</div>
      <h1>${CONTENT.home.title}</h1>
      <p>${CONTENT.home.intro}</p>
      <div class="hero-actions">
        <a href="${basePath}/modulos/acesso" class="btn" data-nav="/modulos/acesso">Iniciar pelo módulo 01 →</a>
        <span class="badge">${mods.length} módulos · etapas guiadas</span>
      </div>
    </section>

    <section class="modules-grid">
      <h2>Módulos disponíveis <span class="count">${String(mods.length).padStart(2,'0')} / ${String(mods.length).padStart(2,'0')}</span></h2>
      <div class="modules-list">
        ${mods.map(m => `
          <a href="${basePath}${m.to}" class="module-card" data-nav="${m.to}">
            <span class="mc-code">${m.code}</span>
            <div>
              <div class="mc-title">${m.label}</div>
              <div class="mc-desc">${getModuleDesc(m.id)}</div>
            </div>
            <span class="mc-arrow">→</span>
          </a>
        `).join('')}
      </div>
    </section>

    <section class="principles">
      <div class="principle"><div class="pr-label">Princípio 01</div><div class="pr-title">Qualidade contínua</div><div class="pr-desc">Análise automática a cada commit para manter o código saudável.</div></div>
      <div class="principle"><div class="pr-label">Princípio 02</div><div class="pr-title">Revisão inteligente</div><div class="pr-desc">Sugestões automáticas que aceleram o code review sem substituir o humano.</div></div>
      <div class="principle"><div class="pr-label">Princípio 03</div><div class="pr-title">Pipeline seguro</div><div class="pr-desc">Quality Gates bloqueiam código que não atende aos padrões antes do deploy.</div></div>
    </section>
  `;
}

function getModuleDesc(id) {
  const map = {
    acesso: "Autenticação SSO, OAuth e controle de acesso por organização.",
    painel: "Visão consolidada de repositórios, análises, PRs e pipelines.",
    repositorios: "Adicione e gerencie repositórios do GitHub, GitLab e Bitbucket.",
    analise: "Métricas de qualidade, bugs, vulnerabilidades e code smells.",
    pullrequests: "Revisão de código com análise automática integrada.",
    pipelines: "CI/CD com Quality Gates e deploys automatizados.",
    configuracoes: "Regras de análise, webhooks, notificações e chaves de API.",
    integracoes: "Conexão com provedores Git, ferramentas de segurança e comunicação.",
    logs: "Registro de auditoria de todas as operações na plataforma.",
    status: "Monitoramento de serviços, workers e filas de processamento.",
  };
  return map[id] || '';
}

// ── Render: Module ──────────────────────────────────────────
function renderModule(main, mod, data) {
  const steps = data.steps || [];
  const max = steps.length;

  main.innerHTML = `
    <div class="module-header">
      <div class="mh-eyebrow"><span>MÓDULO ${mod.code}</span><span>Procedimento operacional</span></div>
      <h1>${data.title}</h1>
      <p>${data.intro}</p>
    </div>
    ${max > 1 ? `
      <div class="steps-nav">
        ${steps.map((s, i) => `
          <button class="step-tab${i === 0 ? ' active' : ''}" data-step="${i}">
            <span class="st-num">${String(i+1).padStart(2,'0')}</span>
            <span class="st-label">Etapa</span>
            <span class="st-title">${s.title}</span>
          </button>
        `).join('')}
      </div>
    ` : ''}
    <div class="steps-container">
      ${steps.map((s, i) => `
        <div class="step-content${i === 0 ? ' active' : ''}" data-step="${i}">
          <h2>${s.title}</h2>
          <p class="st-summary">${s.summary}</p>
          ${s.html || ''}
        </div>
      `).join('')}
    </div>
    ${max > 1 ? `
      <div class="step-nav-btns">
        <button id="prevStep" disabled>← Etapa anterior</button>
        <span class="snb-counter">01 — ${String(max).padStart(2,'0')}</span>
        <button id="nextStep">Próxima etapa →</button>
      </div>
    ` : ''}
  `;

  if (max > 1) {
    currentStep = 0;
    updateStepButtons(max);

    main.querySelectorAll('.step-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        currentStep = parseInt(btn.dataset.step);
        showStep(main, currentStep, max);
      });
    });

    const prev = main.querySelector('#prevStep');
    const next = main.querySelector('#nextStep');
    if (prev) prev.addEventListener('click', () => { if (currentStep > 0) { currentStep--; showStep(main, currentStep, max); } });
    if (next) next.addEventListener('click', () => { if (currentStep < max - 1) { currentStep++; showStep(main, currentStep, max); } });
  }

  main.querySelectorAll('[data-zoom]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') openZoom(el.dataset.zoom, el.querySelector('.fig-caption')?.textContent || '');
    });
  });
}

function showStep(main, index, max) {
  main.querySelectorAll('.step-tab').forEach((b, i) => b.classList.toggle('active', i === index));
  main.querySelectorAll('.step-content').forEach((c, i) => c.classList.toggle('active', i === index));
  updateStepButtons(max);
  const counter = main.querySelector('.snb-counter');
  if (counter) counter.textContent = `${String(index+1).padStart(2,'0')} — ${String(max).padStart(2,'0')}`;
}

function updateStepButtons(max) {
  const prev = document.getElementById('prevStep');
  const next = document.getElementById('nextStep');
  if (prev) prev.disabled = currentStep === 0;
  if (next) next.disabled = currentStep === max - 1;
}

// ── Navigation Sidebar ──────────────────────────────────────
function buildNav() {
  const nav = document.getElementById('nav');
  nav.innerHTML = MODULES.map(m => `
    <a href="${basePath}${m.to}" data-nav="${m.to}">
      <span class="nav-code">${m.code}</span>
      <span>${m.label}</span>
    </a>
  `).join('');
}

function updateNav() {
  const path = getRouteFromPath();
  document.querySelectorAll('#nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.nav === path);
  });
}

// ── Event Delegation ────────────────────────────────────────
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-nav]');
  if (link) {
    e.preventDefault();
    navigate(link.dataset.nav);
  }
});

window.addEventListener('popstate', () => {
  renderRoute(getRouteFromPath());
});

// ── Lightbox ────────────────────────────────────────────────
function openZoom(src, caption) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeZoom() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this || e.target.classList.contains('lightbox-close')) closeZoom();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeZoom(); });

// ── Theme Toggle ────────────────────────────────────────────
(function() {
  const saved = localStorage.getItem('duecodedocs-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  }
})();

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('duecodedocs-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeIcon();
});

function updateThemeIcon() {
  const btn = document.getElementById('themeToggle');
  btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}
updateThemeIcon();

// ── Mobile Menu ─────────────────────────────────────────────
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

document.getElementById('menuBtn').addEventListener('click', () => {
  const sid = document.getElementById('sidebar');
  sid.classList.toggle('open');
  overlay.classList.toggle('open');
});

overlay.addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
  overlay.classList.remove('open');
});

// ── Init ────────────────────────────────────────────────────
buildNav();
buildProjectSwitcher();
buildVersionSwitcher();

const redirect = sessionStorage.getItem('__duecode_redirect');
if (redirect) {
  sessionStorage.removeItem('__duecode_redirect');
  history.replaceState(null, '', basePath + redirect);
}
renderRoute(getRouteFromPath());
