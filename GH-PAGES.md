# 🚀 Deploy no GitHub Pages — Passo a Passo

> **Branch:** `gh-pages-deploy`  
> **Data:** 19/06/2026  
> **Projeto:** DueCodeDocs — Manual Operacional DueCode

---

## 📋 Pré-requisitos

- Repositório no GitHub (ex: `felipe-armani/duecode`)
- Permissão de `Actions` habilitada no repositório
- Branch `gh-pages-deploy` (já criada)

---

## ⚙️ 1. Configurar o GitHub Pages no repositório

1. Acesse o repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. Clique em **Save**

---

## 🔐 2. Verificar permissões do workflow

1. Vá em **Settings** → **Actions** → **General**
2. Em **Workflow permissions**, selecione:
   - ✅ **Read and write permissions**
3. Marque:
   - ✅ **Allow GitHub Actions to create and approve pull requests**

---

## 🚀 3. Disparar o deploy

### Opção A — Push na branch (automático)

```bash
git checkout gh-pages-deploy
git push origin gh-pages-deploy
```

O workflow dispara automaticamente no push para `gh-pages-deploy` ou `main`.

### Opção B — Manual (via interface)

1. Vá em **Actions** → **Deploy to GitHub Pages**
2. Clique em **Run workflow** → selecione a branch → **Run workflow**

---

## 📊 4. Acompanhar o deploy

1. Vá em **Actions** → clique no workflow em execução
2. O job `deploy` executa:
   - Checkout do código
   - Setup do GitHub Pages
   - Upload do diretório `docs/site/` como artifact
   - Deploy para GitHub Pages

3. Ao finalizar, a URL estará disponível em:

   ```
   https://felipe-armani.github.io/duecodedocs/
   ```

---

## 📁 5. Estrutura de deploy

O workflow faz upload do diretório `docs/site/` que contém:

```
site/
├── index.html      ← Página principal (SPA)
├── 404.html        ← Fallback para rotas SPA
├── styles.css      ← Design system
├── script.js       ← Router + dados dos módulos
├── assets/         ← Screenshots, logos, patterns
└── fonts/          ← Fonte Epilogue
```

---

## 🧪 6. Testar localmente

Para testar a documentação antes do deploy:

```bash
cd docs/site
python3 -m http.server 8080
```

Acesse: `http://localhost:8080`

**Cache buster:** Altere o `?v=N` nos `<script>` e `<link>` do `index.html` sempre que fizer alterações em produção para forçar o browser a recarregar os assets.

---

## 🔧 7. Adicionando screenshots

1. Coloque os arquivos PNG em `docs/site/assets/`
2. Use a nomenclatura: `XX-nome-descritivo.png` (XX = número do módulo)
3. Referencie no `script.js` usando o helper `figure()`:
   ```js
   ${figure("01-login.png", "Tela de login", "Fig. 01 — Tela de autenticação")}
   ```
4. Screenshots ausentes são automaticamente ocultados pelo `onerror` no helper

---

## 📝 8. Atualizando a documentação

Todo o conteúdo está centralizado no `docs/site/script.js`:

- **MODULES[]** — Adicionar/remover módulos
- **CONTENT{}** — Editar conteúdo dos módulos
- **getModuleDesc()** — Descrições curtas para os cards
- **PROJECTS[]** — Links para outros projetos

**Nunca edite o HTML diretamente** — a interface é gerada dinamicamente pelo JS.

---

## ❗ 9. Troubleshooting

| Problema | Causa provável | Solução |
|----------|---------------|---------|
| Página em branco | `basePath` incorreto | Verifique se `duecodedocs` está no path |
| 404 em rotas | 404.html não configurado | Confirme `__duecode_redirect` no sessionStorage |
| Imagens quebradas | Caminho relativo errado | Use `basePath` no `figure()` helper |
| CSS não carrega | Cache do browser | Atualize `?v=N` no `index.html` |
| Workflow falhou | Permissões insuficientes | Verifique Settings → Actions → General |

---

## 🔗 10. Links úteis

- **Repositório:** `https://github.com/felipe-armani/duecode`
- **Documentação publicada:** `https://felipe-armani.github.io/duecodedocs/`
- **GitHub Actions:** `https://github.com/felipe-armani/duecode/actions`
