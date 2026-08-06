<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0D1117,55:1F6FEB,100:6DB33F&height=190&section=header&text=Danilo%20Franco&fontSize=54&fontColor=FFFFFF&animation=fadeIn&fontAlignY=34&desc=Engenheiro%20de%20Software%20Backend%20%C2%B7%20Java%20%26%20Spring&descAlignY=55&descSize=17" width="100%" alt="Danilo Franco — Engenheiro de Software Backend" />

<a href="README.md"><img src="https://img.shields.io/badge/English-30363D?style=for-the-badge&labelColor=0D1117" alt="English" /></a>
<a href="README.pt-BR.md"><img src="https://img.shields.io/badge/Portugu%C3%AAs-1F6FEB?style=for-the-badge&labelColor=0D1117" alt="Português" /></a>

<br/><br/>

<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&weight=600&size=21&pause=1200&color=1F6FEB&center=true&vCenter=true&width=640&lines=5%2B+anos+de+Java+%26+Spring%2C+10%2B+anos+em+TI;Plataformas+governamentais+de+alta+criticidade;SaaS+multi-tenant+arquitetado+end-to-end;Sistemas+distribu%C3%ADdos+%C2%B7+Event-driven+%C2%B7+Clean+architecture" alt="O que eu faço" />

<br/>

<a href="https://www.linkedin.com/in/danilo-franco-852a4841/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="mailto:danilo.franco90@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
<img src="https://img.shields.io/badge/Leme,%20SP%20—%20Brasil-30363D?style=for-the-badge&logo=googlemaps&logoColor=white" alt="Localização" />
<img src="https://img.shields.io/badge/Aberto%20a%20oportunidades-6DB33F?style=for-the-badge" alt="Aberto a oportunidades" />

</div>

---

## Quem eu sou

Engenheiro backend com **5+ anos dedicados a Java e ao ecossistema Spring**, dentro de uma **trajetória de 10+ anos em TI** — do suporte à engenharia e arquitetura de software.

Hoje construo e mantenho uma **plataforma governamental de alta criticidade usada por todas as vigilâncias sanitárias do Estado de São Paulo**, e arquitetei um **SaaS B2B multi-tenant end-to-end** — do isolamento schema-per-tenant e pipeline assíncrono de eventos até segurança OAuth2 e CI/CD.

O que me move: traduzir regras de negócio complexas em arquiteturas que sobrevivem à mudança. Integridade transacional, resiliência, observabilidade e código que o próximo engenheiro consegue manter de verdade.

---

## O que eu construí

<table>
<tr>
<td width="33%" valign="top">

### 🏛️ SIVISA
**Sistema de Informação em Vigilância Sanitária — Estado de SP**

Plataforma governamental de alta criticidade usada por **todas as vigilâncias sanitárias do estado**. Faço a engenharia e a manutenção, garantindo disponibilidade e integridade dos dados.

Desenvolvi o **módulo de geração de relatórios**, ampliando a capacidade de extração e análise das equipes de vigilância, e modernizei aplicações legadas em Java / Spring Boot para reduzir complexidade.

`Java` `Spring Boot` `Oracle` `REST`

</td>
<td width="33%" valign="top">

### 📦 Força de Vendas Nacional
**Ilumi Materiais Elétricos**

Fui convidado a assumir — como **único desenvolvedor da empresa, sem supervisão técnica** — o sistema de força de vendas usado por **mais de 100 representantes comerciais em todo o Brasil**.

Responsabilidade integral por operação, manutenção e evolução. Desenvolvi rotinas comerciais e financeiras críticas com foco em confiabilidade e integridade transacional.

`Java SE/EE` `SQL Server` `Ownership total`

</td>
<td width="33%" valign="top">

### 🚀 InsightFlow
**SaaS B2B de Inteligência de Vendas** · `Privado`

Projeto autoral, arquitetado e desenvolvido **end-to-end**: plataforma multi-tenant com isolamento schema-per-tenant, pipeline assíncrono de eventos e segurança multi-tenant.

Código proprietário — arquitetura detalhada abaixo.

`Java 21` `Spring Boot 3.4` `RabbitMQ` `Keycloak`

</td>
</tr>
</table>

---

## Arquitetura em foco — InsightFlow

O problema: atender múltiplas empresas clientes numa só plataforma, com **isolamento rígido de dados**, **entrega confiável de eventos** entre ingestão, analytics e notificações, e **sem dual-write entre banco e broker**.

```mermaid
flowchart LR
    UI["React + Vite<br/>TypeScript"] -->|"JWT / OIDC"| API["Spring Boot 3.4<br/>Monolito Modular"]
    KC["Keycloak<br/>OAuth2 · RBAC"] -.->|"valida token"| API
    API -->|"Bucket4j<br/>rate limiting"| DOM["Domínios de Negócio"]
    DOM --> DB[("PostgreSQL<br/>schema-per-tenant")]
    DOM --> OBX[("Transactional<br/>Outbox")]
    OBX -->|"relay"| MQ{{"RabbitMQ"}}
    MQ --> AN["Analytics"]
    MQ --> NF["Notificações"]

    style API fill:#6DB33F,stroke:#4A7C2C,color:#fff
    style KC fill:#1F6FEB,stroke:#134a9e,color:#fff
    style MQ fill:#FF6600,stroke:#b34700,color:#fff
    style OBX fill:#8957E5,stroke:#5c3a9e,color:#fff
```

**Decisões que eu defendo numa entrevista:**

| Decisão | Por quê |
|---|---|
| **Monolito modular** em vez de microsserviços | Fronteiras de domínio sem o overhead de sistemas distribuídos neste estágio. Módulos podem ser extraídos depois — as costuras já existem. |
| **Schema-per-tenant** | Isolamento real no nível do banco, sem o custo operacional de um banco por cliente. |
| **Transactional Outbox** | Elimina o problema de dual-write: o evento é commitado na mesma transação do dado e depois publicado. Sem eventos perdidos ou fantasmas. |
| **Keycloak / OAuth2-OIDC** | Identidade como infraestrutura, não como código de aplicação. RBAC por tenant sem lógica de auth espalhada pelos domínios. |
| **Rate limiting com Bucket4j** | Protege recursos compartilhados: um tenant sozinho não degrada os demais. |
| **Flyway + cache L2 Caffeine** | Migrações versionadas e reprodutíveis em todos os schemas de tenant; cache para reduzir pressão no banco em leituras quentes. |

Billing com `Stripe` · conteinerização com `Docker` · CI/CD em `GitHub Actions` para build, testes e deploy.

---

## Engenharia com agentes de IA

Eu não apenas *uso* ferramentas de IA — eu as construo. Meu ângulo é o de engenheiro, não o de usuário: **orquestração, idempotência, tratamento de segredos e pipelines reprodutíveis** aplicados a fluxos de desenvolvimento com agentes.

**Skills autorais de Claude Code** — `trello-init` / `trello-sync`: integração Trello ⇄ Spec-Driven Development que mantém o board de um projeto sincronizado a partir do próprio repositório.

```mermaid
flowchart LR
    Y["work/tasks.yaml<br/>fonte única da verdade"] -->|"git push"| GA["GitHub Actions"]
    GA --> SY["Motor de sync<br/>idempotente"]
    SY --> TR["Board no Trello<br/>Backlog → Doing → Review → Done"]
    SY -.-> LB["Labels de papéis de agente<br/>backend · testes · devops · security · frontend"]

    style GA fill:#1F6FEB,stroke:#134a9e,color:#fff
    style SY fill:#6DB33F,stroke:#4A7C2C,color:#fff
```

**Decisões de engenharia por trás:**

- **Idempotente por design** — reexecuções convergem para o mesmo estado em vez de duplicar cards; o provisionamento aborta se já existe vínculo, salvo forçado explicitamente.
- **Segredos ficam fora da automação** — o script nunca grava credenciais. Cadastrar os secrets do repositório é um passo manual deliberado; o arquivo de vínculo commitado guarda apenas IDs.
- **Controle de concorrência** — o workflow serializa execuções por ref, então pushes em sequência rápida não competem entre si e corrompem o board.
- **Roda onde o runner enxerga** — motor de sync e workflow são vendorizados no repositório, não na config local do agente, porque o ambiente de execução é o CI.
- **Papéis de agente como labels de primeira classe** — o trabalho é roteado por especialidade (backend, testes, release/devops, revisão de segurança, frontend) em vez de um assistente indiferenciado.

---

## Stack técnica

<div align="center">

**Linguagens & Frameworks**

<img src="https://img.shields.io/badge/Java%2021-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 21" />
<img src="https://img.shields.io/badge/Spring%20Boot%203-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
<img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security" />
<img src="https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Data JPA" />
<img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white" alt="Hibernate" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />

**Arquitetura & Design**

<img src="https://img.shields.io/badge/APIs%20RESTful-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="APIs RESTful" />
<img src="https://img.shields.io/badge/Monolito%20Modular-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Monolito Modular" />
<img src="https://img.shields.io/badge/Hexagonal-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Arquitetura Hexagonal" />
<img src="https://img.shields.io/badge/Multi--tenancy-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Multi-tenancy" />
<img src="https://img.shields.io/badge/Event--Driven-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Event-Driven" />
<img src="https://img.shields.io/badge/Transactional%20Outbox-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Transactional Outbox" />
<img src="https://img.shields.io/badge/System%20Design-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="System Design" />

**Dados & Mensageria**

<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
<img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" alt="Oracle" />
<img src="https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge" alt="SQL Server" />
<img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white" alt="RabbitMQ" />
<img src="https://img.shields.io/badge/Flyway-CC0200?style=for-the-badge&logo=flyway&logoColor=white" alt="Flyway" />
<img src="https://img.shields.io/badge/Caffeine%20Cache-6E4C1E?style=for-the-badge&logo=coffeescript&logoColor=white" alt="Caffeine" />

**Segurança & Autenticação**

<img src="https://img.shields.io/badge/Keycloak-4D4D4D?style=for-the-badge&logo=keycloak&logoColor=white" alt="Keycloak" />
<img src="https://img.shields.io/badge/OAuth2%20%2F%20OIDC-F78C40?style=for-the-badge&logo=openid&logoColor=white" alt="OAuth2 / OIDC" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
<img src="https://img.shields.io/badge/RBAC-30363D?style=for-the-badge" alt="RBAC" />
<img src="https://img.shields.io/badge/Rate%20Limiting%20Bucket4j-30363D?style=for-the-badge" alt="Bucket4j" />

**DevOps & Qualidade**

<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
<img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven" />
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
<img src="https://img.shields.io/badge/JUnit%205-25A162?style=for-the-badge&logo=junit5&logoColor=white" alt="JUnit 5" />
<img src="https://img.shields.io/badge/Mockito-78A641?style=for-the-badge" alt="Mockito" />
<img src="https://img.shields.io/badge/Testcontainers-291A47?style=for-the-badge&logo=docker&logoColor=white" alt="Testcontainers" />

</div>

---

## Trajetória

```
2011 ──── 2012 ──────── 2017 ──── 2018 ──────── 2021 ──── 2021 ─────────────► hoje
  │         │             │         │             │
  Estagiário Assistente   ↓         Analista TI   ↓        Engenheiro Backend
  de TI      de TI                  Java Dev               Java · Spring
  │         │                       │                      │
  └─ Ilumi Materiais Elétricos ─────┴──────────────────────┴─ Stefanini Group
```

Uma década subindo do suporte à engenharia. Sei o que quebra em produção porque já fui quem atendia o chamado quando quebrava.

**Formação**

<img src="https://img.shields.io/badge/P%C3%B3s%20—%20Engenharia%20de%20Software%20·%20PUC%20Minas%20·%202025-0D1117?style=for-the-badge&labelColor=6DB33F" alt="Pós-graduação" />
<img src="https://img.shields.io/badge/Tecn%C3%B3logo%20—%20An%C3%A1lise%20e%20Desenvolvimento%20de%20Sistemas-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Tecnólogo" />

**Idiomas** — Português (nativo) · Inglês (leitura técnica e compreensão de conversas; fala em desenvolvimento)

---

## GitHub

<p align="center">
  <img src="github-metrics.svg" alt="Métricas do GitHub" />
</p>

> A maior parte do meu trabalho vive em repositórios privados e corporativos — sistemas governamentais e código proprietário de SaaS. A arquitetura acima é o retrato honesto do que eu construo.

---

<div align="center">

### Vamos conversar

Estou aberto a oportunidades de engenharia backend onde arquitetura, confiabilidade e ownership realmente importam.

<a href="https://www.linkedin.com/in/danilo-franco-852a4841/"><img src="https://img.shields.io/badge/Conectar%20no%20LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="mailto:danilo.franco90@gmail.com"><img src="https://img.shields.io/badge/Enviar%20e--mail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6DB33F,50:1F6FEB,100:0D1117&height=120&section=footer" width="100%" alt="" />

</div>
