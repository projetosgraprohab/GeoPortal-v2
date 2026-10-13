# Atualização da Nomenclatura do Botão da Navbar: 'Adicionar Camadas Web'

Renomear e harmonizar o botão `#btn-open-wms-modal` no cabeçalho do portal para **"Adicionar Camadas Web"**, integrando a paleta institucional em branco e vermelho e melhorando a clareza da interface cartográfica.

## User Review & Critical Decisions

> [!IMPORTANT]
> A escolha da nomenclatura foi confirmada na etapa interativa anterior.

- **Decisão Confirmada**: O botão de conexão e catálogo de dados geoespaciais será renomeado para **"Adicionar Camadas Web"**.
- **Ajuste de Estilo Institucional**: O botão deixará a paleta azul legada (`bg-blue-50`, `text-blue-700`) e adotará o tema padrão em branco e vermelho institucional (`bg-red-50 hover:bg-red-100 text-red-700 border-red-200` com ícone `text-red-600`), consistente com a modal recém-atualizada.

---

## 1. Overview & Core Concept

- **O que faz**: Atualiza o rótulo e o acabamento do botão principal de entrada de camadas no cabeçalho (`Navbar.tsx`), substituindo o jargão técnico "Conectar WMS / Serviço" por uma expressão universal e intuitiva.
- **Público-Alvo**: Analistas GIS, arquitetos, urbanistas e gestores municipais que utilizam o GRAPROHAB GeoPortal para consultar e carregar camadas temáticas.
- **Valor Principal**: Elimina a barreira cognitiva da sigla técnica WMS isolada, comunicando com clareza que o botão permite adicionar tanto camadas pré-configuradas em um clique (Mananciais, Malha Municipal, Zoneamento) quanto serviços online (WMS, WMTS, GeoJSON, XYZ).

---

## 2. User Experience & Visual Design

- **Fluxo do Usuário**:
  1. No topo da página (`#app-navbar`), o usuário visualiza o botão com o novo rótulo **"Adicionar Camadas Web"** acompanhado de um ícone de globo terráqueo (`Globe`).
  2. Ao passar o cursor (hover), o botão apresenta realce suave em tons de vermelho claro institucional (`bg-red-100/80 border-red-300`).
  3. Ao clicar, a modal unificada (`WmsModal`) se abre, permitindo escolher camadas pré-carregadas ou cadastrar novos serviços remotos.

- **Identidade Visual & Tema**:
  - *Cores*: Fundo `bg-red-50/75`, borda `border-red-200/90`, texto `text-red-800`, hover `hover:bg-red-100 hover:border-red-300`, ícone `text-red-600`.
  - *Tipografia*: `text-xs font-semibold`, mantendo consistência métrica com os botões adjacentes ("Subir Camada GeoJSON" e "Exportar").
  - *Interatividade*: `cursor-pointer transition-all active:scale-98 shadow-xs`.

---

## 3. Key Product Decisions & Trade-Offs

- **Nomenclatura Escolhida**: *"Adicionar Camadas Web"*
  - *Por quê*: É um verbo de ação direto (CTA), cobre tanto camadas em nuvem OGC (WMS/WFS/WMTS) quanto GeoJSON online e camadas pré-configuradas do catálogo, sem excluir usuários não especialistas em SIG.
  - *Alternativas Descartadas*: "Conectar WMS / Serviço" (muito técnico) e "Importar Dados" (confundia com o upload local de arquivos GeoJSON).

- **Harmonização de Cores**:
  - *Por quê*: A modal vinculada ao botão já foi migrada para o tema Branco e Vermelho institucional. Manter o botão azul no cabeçalho criava dissonância cromática.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              APP NAVBAR                                │
│                                                                        │
│  [Graproh@b GeoPortal]             [Subir Camada]                      │
│                                    [Adicionar Camadas Web] ──┐         │
│                                    [Exportar (KML/CSV)]      │         │
└──────────────────────────────────────────────────────────────┼─────────┘
                                                               │ (clique)
                                                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        WMS & SERVICES MODAL                            │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────┐  │
│  │ Catálogo Pré-configurado (1-cl) │  │ Adicionar Serviço Remoto    │  │
│  │ • Áreas de Mananciais (APM/APRM)│  │ • WMS / WMTS / XYZ / GeoJSON│  │
│  │ • Malha Municipal SP (IBGE)     │  │ • URL & Parâmetros OGC      │  │
│  └─────────────────────────────────┘  └─────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

- **Mapeamento de Componente e Estado**:
  - Modificação pontual no componente `src/components/Navbar.tsx` no elemento `#btn-open-wms-modal`.
  - Preserva intactos o evento `onClick={onOpenWmsModal}`, os atributos de acessibilidade e a integração com o estado `isWmsModalOpen` em `App.tsx`.
