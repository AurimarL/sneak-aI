# 👟🌍 SneakAI

> **Physical LLM Distribution Network — Decoupling AI from High-Speed Internet**

---

## 🌍 Overview

**SneakAI** is an open-source platform designed to solve the bandwidth limitations and high data costs associated with downloading Large Language Models (LLMs) in regions with constrained internet infrastructure.

The platform connects users to a decentralized network of **local and international distributor nodes** equipped with physical storage media (SSDs, HDDs, and Flash Drives) pre-loaded with cryptographically verified GGUF weights (SHA-256), enabling direct physical delivery and 100% offline execution.

---

## 🛠️ Tech Stack

- **Runtime & Package Manager:** [Bun](https://bun.sh/) (`>= 1.x`)
- **Web Framework:** Next.js 15+ (App Router)
- **Headless CMS & Admin:** Payload CMS 3.x
- **Database:** PostgreSQL + PostGIS
- **Styling & UI:** Tailwind CSS + shadcn/ui
- **Language:** TypeScript

---

## 📂 Repository Structure

```text
sneak-ai/
├── app/                               # Next.js App Router (Pages & Routes)
│   ├── page.tsx                       # 🌐 Main Landing Page (Value proposition & CTAs)
│   ├── marketplace/                   # 🛒 GGUF Model Catalog & GB Accumulator Calculator
│   ├── checkout/                      # 📦 Guest Checkout, Node Filters & Freight Matching
│   ├── (auth)/                        # 🔐 Unified Authentication (Login & Registration)
│   ├── (distributor)/                 # 🛠️ Distributor Portal (Inventory & Freight Management)
│   └── (payload)/                     # ⚙️ Payload CMS Admin Panel (/admin)
│
├── collections/                       # Payload CMS Backend Collections (Database Schemas)
│   ├── Users.ts                       # Users and Roles (Admin, Distributor, Customer)
│   ├── Models.ts                      # Curated Hugging Face AI Models (Sizes in GB)
│   ├── Distributors.ts                # Node Profiles, Locations & Fixed Freight Rates
│   ├── Drives.ts                      # Hardware Inventory (New/Used, Capacity, Pricing)
│   └── Orders.ts                      # Orders and Transaction History
│
├── components/                        # Reusable UI components (Tailwind + shadcn/ui)
├── lib/                               # Database connections, Payload instances, and utils
├── types/                             # Global TypeScript type definitions
├── payload.config.ts                  # Central Payload CMS 3.x configuration
└── package.json                       # Dependency management via Bun

```

---

## 🎯 Key Features

1. **GGUF Model Marketplace:**

- Curated selection of top-tier models from Hugging Face (e.g., Llama, DeepSeek, Qwen, Mistral).
- Real-time dynamic counter for accumulated space in Gigabytes (`GB Counter`).

2. **Frictionless Guest Checkout:**

- Complete physical media orders instantly without mandatory upfront account creation.
- Advanced filtering and matching system for distributors by **Country, City, and Media Condition (New / Used)**.
- Automated calculation of fixed **National and International** shipping fees.

3. **Distributor Portal:**

- Unified dashboard for managing drive inventory, updating stock status, and processing incoming orders.

---

## 🚀 Running Locally

### 1. Prerequisites

Ensure you have the following installed on your system:

- [Bun](https://bun.sh/)

### 2. Environment Setup

Clone the repository and install dependencies:

```bash
git clone [https://github.com/your-username/sneak-ai.git](https://github.com/your-username/sneak-ai.git)
cd sneak-ai
bun install

```

Create a `.env` file in the root directory with your environment variables:

```env
DATABASE_URI=postgres://postgres:postgres@localhost:5432/sneak_ai
PAYLOAD_SECRET=your-payload-secret-key-here

```

### 3. Run Development Server

```bash
bun run dev

```

Access the application at [http://localhost:3000](http://localhost:3000) and the CMS admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).

---
