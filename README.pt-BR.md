<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.svg" />
  <img src="assets/banner-dark.svg" alt="Danilo Franco — Engenheiro de Software Backend" width="100%" />
</picture>

<br/><br/>

<a href="README.md"><img src="https://img.shields.io/badge/English-30363D?style=flat-square&labelColor=0D1117" alt="English" /></a>
<a href="README.pt-BR.md"><img src="https://img.shields.io/badge/Portugu%C3%AAs-1F6FEB?style=flat-square&labelColor=0D1117" alt="Português" /></a>
&nbsp;&nbsp;
<a href="https://www.linkedin.com/in/danilo-franco-852a4841/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="mailto:danilo.franco90@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
<img src="https://img.shields.io/badge/Leme,%20SP%20—%20Brasil-30363D?style=flat-square" alt="Localização" />
<img src="https://img.shields.io/badge/Aberto%20a%20oportunidades-6DB33F?style=flat-square&labelColor=0D1117" alt="Aberto a oportunidades" />

<br/><br/>

<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&weight=600&size=20&pause=1200&color=1F6FEB&center=true&vCenter=true&width=640&lines=5%2B+anos+de+Java+%26+Spring%2C+10%2B+anos+em+TI;Plataformas+governamentais+de+alta+criticidade;SaaS+multi-tenant+arquitetado+end-to-end;Sistemas+distribu%C3%ADdos+%C2%B7+Event-driven+%C2%B7+Clean+architecture" alt="O que eu faço" />

</div>

<br/>

Engenheiro backend com **5+ anos dedicados a Java e ao ecossistema Spring**, dentro de uma trajetória de 10+ anos que começou no suporte de TI.

Hoje construo e mantenho uma **plataforma governamental de alta criticidade usada por todas as vigilâncias sanitárias do Estado de São Paulo**, e arquitetei um **SaaS B2B multi-tenant end-to-end** — do isolamento schema-per-tenant ao pipeline de eventos, OAuth2 e CI/CD.

O que me move: traduzir regras de negócio complexas em arquiteturas que sobrevivem à mudança. Integridade transacional, resiliência e código que o próximo engenheiro consegue manter de verdade.

<div align="center">

**5+** anos de Java & Spring&nbsp; · &nbsp;**10+** anos em tecnologia&nbsp; · &nbsp;**100+** representantes atendidos por um sistema que mantive sozinho

<br/>

<img src="https://img.shields.io/badge/Java%2021-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java 21" />
<img src="https://img.shields.io/badge/Spring%20Boot%203-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot 3" />
<img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=flat-square&logo=springsecurity&logoColor=white" alt="Spring Security" />
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
<img src="https://img.shields.io/badge/Oracle-F80000?style=flat-square&logo=oracle&logoColor=white" alt="Oracle" />
<img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white" alt="RabbitMQ" />
<img src="https://img.shields.io/badge/Keycloak-4D4D4D?style=flat-square&logo=keycloak&logoColor=white" alt="Keycloak" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white" alt="GitHub Actions" />
<img src="https://img.shields.io/badge/JUnit%205-25A162?style=flat-square&logo=junit5&logoColor=white" alt="JUnit 5" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />

</div>

## O que eu construí

🏛️ &nbsp;**SIVISA** — plataforma de vigilância sanitária do Estado de São Paulo. Alta criticidade, usada por todas as vigilâncias do estado. Desenvolvi o módulo de geração de relatórios e modernizei aplicações legadas em Java / Spring Boot.

📦 &nbsp;**Força de vendas nacional** — o sistema por trás de 100+ representantes comerciais em todo o Brasil, que assumi como **único desenvolvedor da empresa, sem supervisão técnica**.

🚀 &nbsp;**InsightFlow** — SaaS B2B de inteligência de vendas, arquitetado e desenvolvido end-to-end. Multi-tenant com isolamento schema-per-tenant, pipeline assíncrono de eventos e segurança OAuth2. `Repositório privado`

## Aprofundar

<details>
<summary><b>&nbsp;🏗️&nbsp; Arquitetura em foco — InsightFlow</b></summary>
<br/>

O problema: atender múltiplas empresas clientes numa só plataforma, com **isolamento rígido de dados**, **entrega confiável de eventos** entre ingestão, analytics e notificações, e **sem dual-write entre banco e broker**.

```mermaid
flowchart TB
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

</details>

<details>
<summary><b>&nbsp;🤖&nbsp; Engenharia com agentes de IA</b></summary>
<br/>

Eu não apenas *uso* ferramentas de IA — eu as construo. Meu ângulo é o de engenheiro, não o de usuário: **orquestração, idempotência, tratamento de segredos e pipelines reprodutíveis** aplicados a fluxos de desenvolvimento com agentes.

**Skills autorais de Claude Code** — `trello-init` / `trello-sync`: integração Trello ⇄ Spec-Driven Development que mantém o board de um projeto sincronizado a partir do próprio repositório.

```mermaid
flowchart TB
    Y["work/tasks.yaml<br/>fonte única da verdade"] -->|"git push"| GA["GitHub Actions"]
    GA --> SY["Motor de sync<br/>idempotente"]
    SY --> TR["Board no Trello<br/>Backlog → Doing<br/>→ Review → Done"]
    SY -.-> LB["Labels de papéis de agente<br/>backend · testes · devops<br/>security · frontend"]

    style GA fill:#1F6FEB,stroke:#134a9e,color:#fff
    style SY fill:#6DB33F,stroke:#4A7C2C,color:#fff
```

**Decisões de engenharia por trás:**

- **Idempotente por design** — reexecuções convergem para o mesmo estado em vez de duplicar cards; o provisionamento aborta se já existe vínculo, salvo forçado explicitamente.
- **Segredos ficam fora da automação** — o script nunca grava credenciais. Cadastrar os secrets do repositório é um passo manual deliberado; o arquivo de vínculo commitado guarda apenas IDs.
- **Controle de concorrência** — o workflow serializa execuções por ref, então pushes em sequência rápida não competem entre si e corrompem o board.
- **Roda onde o runner enxerga** — motor de sync e workflow são vendorizados no repositório, não na config local do agente, porque o ambiente de execução é o CI.
- **Papéis de agente como labels de primeira classe** — o trabalho é roteado por especialidade (backend, testes, release/devops, revisão de segurança, frontend) em vez de um assistente indiferenciado.

</details>

<details>
<summary><b>&nbsp;🧰&nbsp; Stack técnica completa</b></summary>
<br/>

**Linguagens & frameworks** — Java 21 · Spring Boot 3 · Spring Security · Spring Data JPA · Hibernate · TypeScript · React · Vite

**Arquitetura & design** — APIs RESTful · Monolito Modular · Arquitetura Hexagonal · Multi-tenancy · Event-Driven · Transactional Outbox · System Design

**Dados & mensageria** — PostgreSQL · Oracle · SQL Server · RabbitMQ · Flyway · Caffeine Cache

**Segurança & autenticação** — Keycloak · OAuth2 / OIDC · JWT · RBAC · Rate limiting com Bucket4j

**DevOps & qualidade** — Docker · GitHub Actions · Maven · Git · JUnit 5 · Mockito · Testcontainers

</details>

<details>
<summary><b>&nbsp;📈&nbsp; Trajetória & formação</b></summary>
<br/>

**2011–2018 · Ilumi Materiais Elétricos** — estagiário de TI, depois assistente, depois analista de TI e desenvolvedor Java. Terminei assumindo sozinho o sistema de força de vendas nacional.

**2021–hoje · Stefanini Group** — Engenheiro Backend, Java & Spring. SIVISA, a plataforma de vigilância sanitária do Estado de São Paulo.

Uma década subindo do suporte à engenharia. Sei o que quebra em produção porque já fui quem atendia o chamado quando quebrava.

**Formação** — Pós-graduação em Engenharia de Software, PUC Minas (2025) · Tecnólogo em Análise e Desenvolvimento de Sistemas

**Idiomas** — Português (nativo) · Inglês (leitura técnica e compreensão de conversas; fala em desenvolvimento)

</details>

<br/>

> A maior parte do meu trabalho vive em repositórios privados e corporativos — sistemas governamentais e código proprietário de SaaS. A arquitetura acima é o retrato honesto do que eu construo.

<div align="center">

<br/>

### Vamos conversar

Estou aberto a oportunidades de engenharia backend onde arquitetura, confiabilidade e ownership realmente importam.

<a href="https://www.linkedin.com/in/danilo-franco-852a4841/"><img src="https://img.shields.io/badge/Conectar%20no%20LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="mailto:danilo.franco90@gmail.com"><img src="https://img.shields.io/badge/Enviar%20e--mail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>

</div>
