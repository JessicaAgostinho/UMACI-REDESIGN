# Versão F — Natura Glassmorphism

## Conceito
Design orgânico e moderno com efeito glassmorphism — cartões de vidro fosco sobre imagens de fundo de natureza desfocadas. Parallax no hero e nas secções. Navbar flutuante em pílula arredondada. Tipografia serif elegante misturada com sans-serif limpa.

## Paleta de cores
- Fundo: `#f0ece4` (creme natural)
- Texto: `#1e2b1e` (verde muito escuro)
- Accent principal: `#2d5a3d` (verde floresta)
- Accent secundário: `#4a8c5c` (verde médio)
- Destaque complementar: `#a8d8b4` (verde menta)

## Tipografia
- DM Serif Display (títulos) — regular + itálico
- DM Sans (corpo) — pesos 300, 400, 500, 700

## Funcionalidades
- Navbar flutuante estilo "pílula" com glassmorphism
- Hero com parallax e painel de vidro central
- Stack de imagens sobrepostas na secção Sobre
- Secção Coleções com imagem de fundo parallax e cartões glassmorphism
- Efeito de tilt 3D nos cartões ao hover (mouse tracking)
- Pills de áreas de investigação
- Cards de equipa com hover saturação
- Secção de contacto com painel de vidro sobre fundo natural
- Formulário completo com select de assunto
- Animações suaves via IntersectionObserver

## Deploy
1. Abrir `index.html` diretamente no browser
2. Para formulário real: definir `MOCK_MODE = false` e `CONTACT_ENDPOINT` em `scripts.js`
3. Para melhor parallax, servir via HTTP (não file://) — ex: `npx serve .`
