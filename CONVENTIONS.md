# Convenções do Projeto — DueCode Docs

> **Objetivo:** Garantir que toda documentação de produto Duegetec (DueCode, Profile, PAM e futuros) siga o mesmo padrão visual, estrutural e de código. Nenhuma alteração deve ser feita sem respeitar estas regras.

---

## 1. Estrutura de diretórios

```
duecode/
├── docs/                       ← Documentação do projeto
│   ├── .github/
│   │   └── workflows/
│   │       └── deploy-gh-pages.yml  # GitHub Actions — NUNCA alterar sem testar
│   ├── site/
│   │   ├── index.html              # HTML principal — única página da SPA
│   │   ├── 404.html                # Fallback para GitHub Pages SPA routing
│   │   ├── styles.css              # Design system completo (sem frameworks externos)
│   │   ├── script.js               # Router SPA + dados dos módulos + helpers
│   │   ├── assets/
│   │   │   ├── duegetec-logo.svg   # Logo oficial Duegetec (NÃO criar versão customizada)
│   │   │   ├── pattern-lines.svg   # Padrão de fundo — modo escuro
│   │   │   ├── pattern-lines-light.svg # Padrão de fundo — modo claro
│   │   │   ├── 01-login.png        # Screenshots: XX-nome.png (XX = número do módulo)
│   │   │   ├── 02-dashboard.png
│   │   │   └── ...
│   │   └── fonts/
│   │       └── Epilogue-VariableFont_wght.ttf  # Fonte única do projeto. NUNCA trocar
│   ├── .gitignore
│   ├── GH-PAGES.md                 # Instruções de deploy
│   └── CONVENTIONS.md              # Este arquivo
└── app/                        ← Código-fonte da aplicação
    └── static/
        └── tmp/
```

---

## 2. HTML — `index.html`

### 2.1 Estrutura obrigatória do `<header>`

```html
<header id="header">
  <div class="header-inner">
    <a href="/" class="logo" data-nav="/">
      <img src="assets/duegetec-logo.svg" alt="Duegetec" class="logo-img" id="logoImg">
      <span class="logo-divider"></span>
      <div class="logo-text">
        <span class="logo-title">Manual do Usuário · DueCode</span>
      </div>
    </a>
    <div class="header-actions">
      <div class="header-selectors">
        <select id="projectSwitcher" class="header-select" aria-label="Selecionar projeto"></select>
        <select id="versionSwitcher" class="header-select" aria-label="Selecionar versão"></select>
      </div>
      <button id="themeToggle" class="theme-btn" aria-label="Alternar tema">☀️</button>
    </div>
    <button id="menuBtn" class="menu-btn" aria-label="Menu">☰</button>
  </div>
</header>
```

**Regras:**
- `id="header"`, `id="sidebar"`, `id="main"`, `id="nav"` — NUNCA renomear
- `id="projectSwitcher"`, `id="versionSwitcher"`, `id="themeToggle"`, `id="menuBtn"` — NUNCA renomear
- `id="logoImg"` — NUNCA renomear (CSS usa `.dark .logo-img` para inverter cores)
- `data-nav="/"` no logo é obrigatório para o router SPA
- O `<select>` de projeto e versão são preenchidos dinamicamente via JS

### 2.2 Layout principal

```html
<div class="layout">
  <aside id="sidebar">
    <div class="sidebar-sticky">
      <div class="sidebar-label">Sumário</div>
      <div class="sidebar-divider"></div>
      <nav id="nav"></nav>
      <div class="sidebar-support">
        <div class="sidebar-label">Suporte</div>
        <p>MENSAGEM DE SUPORTE</p>
      </div>
    </div>
  </aside>
  <main id="main"></main>
</div>
```

### 2.3 Lightbox e Footer

```html
<div id="lightbox" class="lightbox">
  <button class="lightbox-close" aria-label="Fechar">✕</button>
  <img id="lightboxImg" src="" alt="">
  <p id="lightboxCaption"></p>
</div>
```

IDs do lightbox são imutáveis — o JS referencia `lightbox`, `lightboxImg`, `lightboxCaption`.

### 2.4 Overlay mobile (criado dinamicamente)

O overlay NUNCA deve ser adicionado ao HTML. Ele é criado dinamicamente no `script.js`:
```js
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);
```

### 2.5 404.html

O arquivo `404.html` deve conter o script de redirect que salva a rota no `sessionStorage` com a chave `__duecode_redirect` e redireciona para a raiz. O `script.js` no Init recupera essa chave e chama `renderRoute()` com o path armazenado.

### 2.6 Favicon

O favicon é um SVG inline com a letra inicial do projeto:
- **DueCode:** `D` com fundo `#4f46e5` (violet)

---

## 3. CSS — `styles.css`

### 3.1 Regras absolutas

- ❌ **NUNCA** adicionar frameworks CSS externos (Bootstrap, Tailwind, etc.)
- ❌ **NUNCA** alterar nomes das variáveis CSS definidas em `:root`
- ❌ **NUNCA** alterar as cores dos temas claro/escuro
- ❌ **NUNCA** adicionar novas fontes além de Epilogue

### 3.2 Variáveis CSS (imutáveis)

```css
:root {
  --ink: oklch(0.27 0.05 286);       /* Cor de texto principal */
  --violet: oklch(0.69 0.08 295);    /* Cor de destaque */
  --stone: oklch(0.89 0.005 20);     /* Neutro claro */
  --bg: oklch(0.985 0.003 20);       /* Fundo — modo claro */
  --fg: var(--ink);                  /* Cor do texto */
  --card: oklch(1 0 0);              /* Fundo de cards */
  --muted: oklch(0.94 0.005 20);     /* Áreas secundárias */
  --muted-fg: oklch(0.45 0.02 286);  /* Texto secundário */
  --border: oklch(0.87 0.01 280);    /* Bordas */
  --radius: 4px;                     /* Arredondamento */
  --font: 'Epilogue', system-ui, sans-serif;
}
```

### 3.3 Classes de componentes disponíveis

Use SEMPRE as classes existentes antes de criar novas:

| Classe | Uso |
|--------|-----|
| `.hero` | Seção de destaque na home |
| `.module-card` | Cards de módulo na home |
| `.module-header` | Cabeçalho de módulo |
| `.steps-nav` | Navegação por abas de etapas |
| `.step-tab` | Aba individual de etapa |
| `.step-content` | Conteúdo de etapa |
| `.figure` | Container de screenshot com zoom |
| `.step-list` | Lista numerada de passos |
| `.field-grid` | Grid 2-colunas chave-valor |
| `.callout` | Caixa de destaque |
| `.doc-table` | Tabela de documentação |
| `.btn` | Botão de ação |
| `.badge` | Etiqueta informativa |

### 3.4 Breakpoints responsivos

```css
/* Mobile first, depois desktop */
@media (min-width: 640px)   { /* Tablets */ }
@media (min-width: 768px)   { /* Header desktop */ }
@media (min-width: 1024px)  { /* Layout desktop: sidebar visível */ }
```

---

## 4. JavaScript — `script.js`

### 4.1 Ordem obrigatória das seções

O arquivo `script.js` DEVE seguir esta ordem exata:

1. **MODULES[]** — Lista de módulos (código, id, rota, label)
2. **PROJECTS[]** — Opções do seletor de projetos
3. **buildProjectSwitcher()** — Constrói o dropdown de projetos
4. **VERSIONS[]** — Opções do seletor de versões
5. **buildVersionSwitcher()** — Constrói o dropdown de versões
6. **basePath** — Detecção de GitHub Pages
7. **CONTENT{}** — Conteúdo de todos os módulos
8. **Helpers**: `figure()`, `stepList()`, `fieldGrid()`, `callout()`
9. **State**: `currentModule`, `currentStep`
10. **Router**: `navigate()`, `getRouteFromPath()`, `renderRoute()`
11. **Render**: `renderHome()`, `getModuleDesc()`, `renderModule()`, `showStep()`, `updateStepButtons()`
12. **Navigation**: `buildNav()`, `updateNav()`
13. **Event Delegation**: click handler, popstate
14. **Lightbox**: `openZoom()`, `closeZoom()`, listeners
15. **Theme Toggle**: localStorage, system preference
16. **Mobile Menu**: overlay dinâmico, toggle
17. **Init**: buildNav, buildProjectSwitcher, buildVersionSwitcher, redirect check, renderRoute

### 4.2 Como adicionar um novo módulo

```js
// 1. Adicionar ao array MODULES
{ code: "XX", id: "novo-modulo", to: "/modulos/novo-modulo", label: "Nome do Módulo" }

// 2. Adicionar conteúdo ao CONTENT
"novo-modulo": {
  title: "Título do Módulo",
  intro: "Descrição introdutória do módulo.",
  steps: [
    {
      title: "Nome da etapa",
      summary: "Resumo do que esta etapa aborda.",
      html: `
        ${figure("XX-screenshot.png", "Descrição da imagem", "Fig. XX — Legenda da figura")}
        ${stepList(["Passo 1", "Passo 2", "Passo 3"])}
        ${fieldGrid([["Chave", "Valor"]])}
        ${callout("Título", "Texto do callout")}
      `
    }
  ]
}

// 3. Adicionar descrição ao getModuleDesc()
"novo-modulo": "Descrição curta de uma linha para o card na home.",
```

### 4.3 Helpers obrigatórios

Use SEMPRE os helpers. NUNCA escreva HTML inline:

- **`figure(src, alt, caption)`** — Screenshot com suporte a zoom
- **`stepList(items)`** — Lista numerada de passos
- **`fieldGrid(pairs)`** — Grid chave-valor 2 colunas
- **`callout(title, text)`** — Caixa de destaque com título

### 4.4 Projetos e versões

O array `PROJECTS[]` deve ser idêntico em TODOS os projetos de documentação Duegetec. Apenas `CURRENT_PROJECT` muda:

```js
const PROJECTS = [
  { id: "duecode", name: "DueCode", url: "https://felipe-armani.github.io/duecodedocs/" },
  { id: "profile", name: "Profile", url: "https://duegetec.github.io/profiledocs/" },
  { id: "pam",     name: "PAM",     url: "https://felipe-armani.github.io/pamdocs/" },
];
const CURRENT_PROJECT = "duecode";  // ← ÚNICA linha que muda por projeto
```

### 4.5 Nomenclatura de screenshots

- Formato: `XX-nome-descritivo.png`
- `XX` = código do módulo (01-10)
- Exemplos: `01-login.png`, `03-repositorios.png`, `06-pipelines.png`

### 4.6 localStorage keys

| Projeto | Chave do tema | Chave do redirect |
|---------|--------------|-------------------|
| DueCode | `duecodedocs-theme` | `__duecode_redirect` |
| Profile | `profiledocs-theme` | `__profile_redirect` |
| PAM | `pamdocs-theme` | `__pam_redirect` |

---

## 5. Git & Deploy

### 5.1 Branches

- `main` — branch principal de desenvolvimento
- `gh-pages-deploy` — aciona deploy automático

### 5.2 Commits

Formato: `tipo: descrição em português`

Tipos:
- `feat:` nova funcionalidade ou módulo
- `fix:` correção de bug ou conteúdo
- `docs:` alteração em documentação
- `style:` ajustes visuais no CSS
- `refactor:` reorganização de código JS
- `chore:` tarefas de manutenção

### 5.3 Deploy

O deploy para GitHub Pages é automático via GitHub Actions ao fazer push para `gh-pages-deploy` ou `main`.

---

## 6. Checklist de validação

Antes de considerar uma alteração concluída, verifique:

- [ ] Modo claro funciona corretamente
- [ ] Modo escuro funciona corretamente
- [ ] Sidebar mobile recolhe e expande
- [ ] Navegação entre todos os módulos funciona
- [ ] Zoom de imagens no lightbox funciona
- [ ] Seletor de projetos redireciona corretamente
- [ ] Seletor de versões redireciona corretamente
- [ ] Nenhuma classe CSS nova foi criada sem necessidade
- [ ] Helpers foram usados em vez de HTML inline
- [ ] Screenshots seguem a nomenclatura `XX-nome.png`
- [ ] IDs imutáveis não foram alterados
- [ ] Nenhum framework externo foi adicionado
- [ ] 404.html usa a chave de redirect correta (`__duecode_redirect`)
- [ ] localStorage key do tema está correta (`duecodedocs-theme`)
- [ ] Testado em resolução mobile (375px) e desktop (1440px)
