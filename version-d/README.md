# Versão D — Dark Minimal

## Conceito
Design escuro e minimalista com foco em tipografia grande, animações subtis e uma paleta monocromática com detalhes dourados. Estrutura assimétrica com hero de texto dominante sobre fundo escuro.

## Paleta de cores
- Fundo: `#0d0d0d` / `#141414`
- Texto: `#f0ede8`
- Destaque: `#e8d5a3` (dourado claro)
- Secundário: `#c4a96b`

## Tipografia
- Inter (Google Fonts) — pesos 300, 400, 600, 700, 900

## Funcionalidades
- Navbar fixa com efeito de blur ao fazer scroll
- Hero com texto gigante e imagem de fundo escurecida
- Contadores animados (0 → valor final)
- Grelha de coleções 2×2 com imagem lateral
- Animações de entrada via IntersectionObserver
- Formulário de contacto (modo mock por defeito)
- Menu mobile (hamburger)

## Deploy
1. Abrir `index.html` diretamente no browser (funciona sem servidor)
2. Para formulário real: definir `MOCK_MODE = false` e `CONTACT_ENDPOINT` em `scripts.js`
