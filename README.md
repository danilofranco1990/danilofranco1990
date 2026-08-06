<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0D1117,55:1F6FEB,100:6DB33F&height=190&section=header&text=Danilo%20Franco&fontSize=54&fontColor=FFFFFF&animation=fadeIn&fontAlignY=34&desc=Backend%20Software%20Engineer%20%C2%B7%20Java%20%26%20Spring&descAlignY=55&descSize=18" width="100%" alt="Danilo Franco — Backend Software Engineer" />

<a href="https://github.com/danilofranco1990"><img src="https://img.shields.io/badge/English-1F6FEB?style=for-the-badge&labelColor=0D1117" alt="English" /></a>
<a href="README.pt-BR.md"><img src="https://img.shields.io/badge/Portugu%C3%AAs-30363D?style=for-the-badge&labelColor=0D1117" alt="Português" /></a>

<br/><br/>

<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&weight=600&size=21&pause=1200&color=1F6FEB&center=true&vCenter=true&width=620&lines=5%2B+years+of+Java+%26+Spring%2C+10%2B+years+in+tech;Mission-critical+government+platforms;Multi-tenant+SaaS%2C+architected+end-to-end;Distributed+systems+%C2%B7+Event-driven+%C2%B7+Clean+architecture" alt="What I do" />

<br/>

<a href="https://www.linkedin.com/in/danilo-franco-852a4841/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="mailto:danilo.franco90@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
<img src="https://img.shields.io/badge/Leme,%20SP%20—%20Brazil-30363D?style=for-the-badge&logo=googlemaps&logoColor=white" alt="Location" />
<img src="https://img.shields.io/badge/Open%20to%20opportunities-6DB33F?style=for-the-badge" alt="Open to opportunities" />

</div>

---

## Who I am

Backend engineer with **5+ years dedicated to Java and the Spring ecosystem**, inside a **10+ year trajectory in tech** — from IT support to software engineering and architecture.

I currently build and maintain a **high-criticality government platform used by every public health surveillance unit in the State of São Paulo**, and I architected a **multi-tenant B2B SaaS end-to-end** — from schema-per-tenant isolation and asynchronous event pipelines to OAuth2 security and CI/CD.

What I care about: turning complex business rules into architectures that survive change. Transactional integrity, resilience, observability, and code that the next engineer can actually maintain.

<div align="center">

| | | |
|:---:|:---:|:---:|
| **5+** | **10+** | **100+** |
| years of Java & Spring | years in technology | sales reps served by a system I owned alone |

</div>

---

## What I've built

<table>
<tr>
<td width="33%" valign="top">

### 🏛️ SIVISA
**Health Surveillance Information System — State of São Paulo**

Mission-critical government platform used by **every health surveillance unit in the state**. I engineer and maintain it, guaranteeing availability and data integrity.

Built the **reporting module** that expanded the field teams' ability to extract and analyze data, and modernized legacy Java / Spring Boot applications to cut complexity.

`Java` `Spring Boot` `Oracle` `REST`

</td>
<td width="33%" valign="top">

### 📦 National Sales Force
**Ilumi Materiais Elétricos**

Invited to take over — as the company's **only developer, with no technical supervision** — the sales force system used by **100+ commercial representatives across Brazil**.

Full ownership of operation, maintenance and evolution. Built critical commercial and financial routines with a focus on reliability and transactional integrity.

`Java SE/EE` `SQL Server` `Full ownership`

</td>
<td width="33%" valign="top">

### 🚀 InsightFlow
**B2B Sales Intelligence SaaS** · `Private`

Personal project, architected and developed **end-to-end**: multi-tenant platform with schema-per-tenant isolation, asynchronous event pipeline and multi-tenant security.

Proprietary code — architecture detailed below.

`Java 21` `Spring Boot 3.4` `RabbitMQ` `Keycloak`

</td>
</tr>
</table>

---

## Architecture in focus — InsightFlow

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

---

## AI agent engineering

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

---

## Tech stack

<div align="center">

**Languages & Frameworks**

<img src="https://img.shields.io/badge/Java%2021-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 21" />
<img src="https://img.shields.io/badge/Spring%20Boot%203-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
<img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security" />
<img src="https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Data JPA" />
<img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white" alt="Hibernate" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />

**Architecture & Design**

<img src="https://img.shields.io/badge/RESTful%20APIs-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="RESTful APIs" />
<img src="https://img.shields.io/badge/Modular%20Monolith-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Modular Monolith" />
<img src="https://img.shields.io/badge/Hexagonal-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Hexagonal Architecture" />
<img src="https://img.shields.io/badge/Multi--tenancy-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Multi-tenancy" />
<img src="https://img.shields.io/badge/Event--Driven-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Event-Driven" />
<img src="https://img.shields.io/badge/Transactional%20Outbox-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Transactional Outbox" />
<img src="https://img.shields.io/badge/System%20Design-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="System Design" />

**Data & Messaging**

<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
<img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" alt="Oracle" />
<img src="https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge" alt="SQL Server" />
<img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white" alt="RabbitMQ" />
<img src="https://img.shields.io/badge/Flyway-CC0200?style=for-the-badge&logo=flyway&logoColor=white" alt="Flyway" />
<img src="https://img.shields.io/badge/Caffeine%20Cache-6E4C1E?style=for-the-badge&logo=coffeescript&logoColor=white" alt="Caffeine" />

**Security & Auth**

<img src="https://img.shields.io/badge/Keycloak-4D4D4D?style=for-the-badge&logo=keycloak&logoColor=white" alt="Keycloak" />
<img src="https://img.shields.io/badge/OAuth2%20%2F%20OIDC-F78C40?style=for-the-badge&logo=openid&logoColor=white" alt="OAuth2 / OIDC" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
<img src="https://img.shields.io/badge/RBAC-30363D?style=for-the-badge" alt="RBAC" />
<img src="https://img.shields.io/badge/Bucket4j%20Rate%20Limiting-30363D?style=for-the-badge" alt="Bucket4j" />

**DevOps & Quality**

<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
<img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven" />
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
<img src="https://img.shields.io/badge/JUnit%205-25A162?style=for-the-badge&logo=junit5&logoColor=white" alt="JUnit 5" />
<img src="https://img.shields.io/badge/Mockito-78A641?style=for-the-badge" alt="Mockito" />
<img src="https://img.shields.io/badge/Testcontainers-291A47?style=for-the-badge&logo=docker&logoColor=white" alt="Testcontainers" />

</div>

---

## Trajectory

```
2011 ──── 2012 ──────── 2017 ──── 2018 ──────── 2021 ──── 2021 ─────────────► now
  │         │             │         │             │
  IT        IT            ↓         IT Analyst    ↓        Backend Engineer
  Intern    Assistant               Java Dev               Java · Spring
  │         │                       │                      │
  └─ Ilumi Materiais Elétricos ─────┴──────────────────────┴─ Stefanini Group
```

A decade of climbing from support to engineering. I know what breaks in production because I used to be the one they called when it broke.

**Education**

<img src="https://img.shields.io/badge/Postgrad%20—%20Software%20Engineering%20·%20PUC%20Minas%20·%202025-0D1117?style=for-the-badge&labelColor=6DB33F" alt="Postgraduate degree" />
<img src="https://img.shields.io/badge/BSc%20Tech%20—%20Systems%20Analysis%20%26%20Development-0D1117?style=for-the-badge&labelColor=1F6FEB" alt="Technologist degree" />

**Languages** — Portuguese (native) · English (technical reading and conversational comprehension; speaking in progress)

---

## GitHub

<p align="center">
  <img src="github-metrics.svg" alt="GitHub metrics" />
</p>

> Most of my work lives in private and corporate repositories — government systems and proprietary SaaS code. The architecture above is the honest picture of what I build.

---

<div align="center">

### Let's talk

I'm open to backend engineering opportunities where architecture, reliability and ownership actually matter.

<a href="https://www.linkedin.com/in/danilo-franco-852a4841/"><img src="https://img.shields.io/badge/Connect%20on%20LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="mailto:danilo.franco90@gmail.com"><img src="https://img.shields.io/badge/Send%20an%20email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6DB33F,50:1F6FEB,100:0D1117&height=120&section=footer" width="100%" alt="" />

</div>
