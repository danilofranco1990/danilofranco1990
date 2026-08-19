<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.svg" />
  <img src="assets/banner-dark.svg" alt="Danilo Franco — Backend Software Engineer" width="100%" />
</picture>

<br/><br/>

<a href="README.md"><img src="https://img.shields.io/badge/English-1F6FEB?style=flat-square&labelColor=0D1117" alt="English" /></a>
<a href="README.pt-BR.md"><img src="https://img.shields.io/badge/Portugu%C3%AAs-30363D?style=flat-square&labelColor=0D1117" alt="Português" /></a>
&nbsp;&nbsp;
<a href="https://www.linkedin.com/in/danilo-franco-852a4841/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="mailto:danilo.franco90@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
<img src="https://img.shields.io/badge/Leme,%20SP%20—%20Brazil-30363D?style=flat-square" alt="Location" />
<img src="https://img.shields.io/badge/Open%20to%20opportunities-6DB33F?style=flat-square&labelColor=0D1117" alt="Open to opportunities" />

<br/><br/>

<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&weight=600&size=20&pause=1200&color=1F6FEB&center=true&vCenter=true&width=620&lines=5%2B+years+of+Java+%26+Spring%2C+10%2B+years+in+tech;Mission-critical+government+platforms;Multi-tenant+SaaS%2C+architected+end-to-end;Distributed+systems+%C2%B7+Event-driven+%C2%B7+Clean+architecture" alt="What I do" />

</div>

<br/>

Backend engineer with **5+ years dedicated to Java and the Spring ecosystem**, inside a 10+ year trajectory that started in IT support.

Today I build and maintain a **high-criticality government platform used by every public health surveillance unit in the State of São Paulo**, and I architected a **multi-tenant B2B SaaS end-to-end** — from schema-per-tenant isolation to event pipelines, OAuth2 and CI/CD.

What I care about: turning complex business rules into architectures that survive change. Transactional integrity, resilience, and code the next engineer can actually maintain.

<div align="center">

**5+** years of Java & Spring&nbsp; · &nbsp;**10+** years in tech&nbsp; · &nbsp;**100+** sales reps served by a system I owned alone

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

## What I've built

🏛️ &nbsp;**SIVISA** — health surveillance platform for the State of São Paulo. Mission-critical, used by every surveillance unit in the state. I built its reporting module and modernized legacy Java / Spring Boot applications.

📦 &nbsp;**National sales force** — the system behind 100+ commercial representatives across Brazil, which I owned as the company's **only developer, with no technical supervision**.

🚀 &nbsp;**InsightFlow** — B2B sales intelligence SaaS, architected and developed end-to-end. Multi-tenant with schema-per-tenant isolation, asynchronous event pipeline and OAuth2 security. `Private repository`

## Dig deeper

<details>
<summary><b>&nbsp;🏗️&nbsp; Architecture in focus — InsightFlow</b></summary>
<br/>

The problem: serve multiple client companies from one platform, with **hard data isolation**, **reliable event delivery** between ingestion, analytics and notifications, and **no dual-write between database and message broker**.

```mermaid
flowchart LR
    UI["React + Vite<br/>TypeScript"] -->|"JWT / OIDC"| API["Spring Boot 3.4<br/>Modular Monolith"]
    KC["Keycloak<br/>OAuth2 · RBAC"] -.->|"validates token"| API
    API -->|"Bucket4j<br/>rate limiting"| DOM["Business Domains"]
    DOM --> DB[("PostgreSQL<br/>schema-per-tenant")]
    DOM --> OBX[("Transactional<br/>Outbox")]
    OBX -->|"relay"| MQ{{"RabbitMQ"}}
    MQ --> AN["Analytics"]
    MQ --> NF["Notifications"]

    style API fill:#6DB33F,stroke:#4A7C2C,color:#fff
    style KC fill:#1F6FEB,stroke:#134a9e,color:#fff
    style MQ fill:#FF6600,stroke:#b34700,color:#fff
    style OBX fill:#8957E5,stroke:#5c3a9e,color:#fff
```

**Decisions worth defending in an interview:**

| Decision | Why |
|---|---|
| **Modular monolith** over microservices | Domain boundaries without distributed-systems overhead at this stage. Modules can be extracted later — the seams are already there. |
| **Schema-per-tenant** | Real isolation at the database level, without the operational cost of a database per client. |
| **Transactional Outbox** | Kills the dual-write problem: the event is committed in the same transaction as the data, then relayed. No lost or phantom events. |
| **Keycloak / OAuth2-OIDC** | Identity as infrastructure, not application code. RBAC per tenant with no auth logic scattered across domains. |
| **Bucket4j rate limiting** | Protects shared resources from any single tenant degrading the others. |
| **Flyway + Caffeine L2** | Versioned, reproducible migrations across every tenant schema; cache to cut database pressure on hot reads. |

`Stripe` billing · `Docker` containerization · `GitHub Actions` CI/CD for build, test and deploy.

</details>

<details>
<summary><b>&nbsp;🤖&nbsp; AI agent engineering</b></summary>
<br/>

I don't just *use* AI tooling — I build it. My angle is the engineer's, not the user's: **orchestration, idempotency, secret handling and reproducible pipelines** applied to agent-driven development workflows.

**Authored Claude Code skills** — `trello-init` / `trello-sync`: a Trello ⇄ Spec-Driven Development integration that keeps a project board in sync from the repository itself.

```mermaid
flowchart LR
    Y["work/tasks.yaml<br/>single source of truth"] -->|"git push"| GA["GitHub Actions"]
    GA --> SY["Idempotent<br/>sync engine"]
    SY --> TR["Trello board<br/>Backlog → Doing → Review → Done"]
    SY -.-> LB["Agent role labels<br/>backend · tests · devops · security · frontend"]

    style GA fill:#1F6FEB,stroke:#134a9e,color:#fff
    style SY fill:#6DB33F,stroke:#4A7C2C,color:#fff
```

**Engineering choices inside it:**

- **Idempotent by design** — reruns converge to the same state instead of duplicating cards; provisioning aborts on an existing link unless explicitly forced.
- **Secrets stay out of the automation** — the script never writes credentials. Registering repository secrets is a deliberate manual step; the committed link file holds IDs only.
- **Concurrency control** — the workflow serializes runs per ref, so rapid successive pushes can't race each other into a corrupted board.
- **Runs where the runner can see it** — sync engine and workflow are vendored into the repository, not the local agent config, so CI is the execution environment.
- **Agent roles as first-class labels** — work is routed by specialty (backend, testing, release/devops, security review, frontend) instead of one undifferentiated assistant.

</details>

<details>
<summary><b>&nbsp;🧰&nbsp; Full tech stack</b></summary>
<br/>

**Languages & frameworks** — Java 21 · Spring Boot 3 · Spring Security · Spring Data JPA · Hibernate · TypeScript · React · Vite

**Architecture & design** — RESTful APIs · Modular Monolith · Hexagonal Architecture · Multi-tenancy · Event-Driven · Transactional Outbox · System Design

**Data & messaging** — PostgreSQL · Oracle · SQL Server · RabbitMQ · Flyway · Caffeine Cache

**Security & auth** — Keycloak · OAuth2 / OIDC · JWT · RBAC · Bucket4j rate limiting

**DevOps & quality** — Docker · GitHub Actions · Maven · Git · JUnit 5 · Mockito · Testcontainers

</details>

<details>
<summary><b>&nbsp;📈&nbsp; Trajectory & education</b></summary>
<br/>

**2011–2018 · Ilumi Materiais Elétricos** — IT intern, then IT assistant, then IT analyst and Java developer. Ended up owning the national sales force system alone.

**2021–now · Stefanini Group** — Backend Engineer, Java & Spring. SIVISA, the health surveillance platform of the State of São Paulo.

A decade of climbing from support to engineering. I know what breaks in production because I used to be the one they called when it broke.

**Education** — Postgraduate in Software Engineering, PUC Minas (2025) · BSc Tech in Systems Analysis and Development

**Languages** — Portuguese (native) · English (technical reading and conversational comprehension; speaking in progress)

</details>

<br/>

> Most of my work lives in private and corporate repositories — government systems and proprietary SaaS code. The architecture above is the honest picture of what I build.

<div align="center">

<br/>

### Let's talk

I'm open to backend engineering opportunities where architecture, reliability and ownership actually matter.

<a href="https://www.linkedin.com/in/danilo-franco-852a4841/"><img src="https://img.shields.io/badge/Connect%20on%20LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="mailto:danilo.franco90@gmail.com"><img src="https://img.shields.io/badge/Send%20an%20email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>

</div>
