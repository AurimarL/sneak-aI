# 🚀 Contributing to SneakAI

First off, thank you for considering contributing to **SneakAI**!

Our goal is to democratize access to Artificial Intelligence by decoupling large language model deployment from high-speed internet dependencies. Whether you are fixing bugs, improving UX, refining documentation, or introducing new features, every contribution is highly valuable.

---

## 🛠️ How to Contribute

### 1. Reporting Bugs

Before creating a new issue, please search the [Issues](https://www.google.com/search?q=../../issues) tab to verify whether the bug has already been reported.

When opening a bug report, please include:

* A clear and descriptive title.
* Step-by-step instructions to reproduce the issue.
* Expected behavior vs. actual behavior.
* Screenshots, terminal output/logs, and environment details (OS, Bun version, Node/Browser version).

### 2. Requesting Features

Suggestions for geographical matching algorithms, Hugging Face integrations, or distributor portal enhancements are strongly encouraged. Open an Issue with the `enhancement` label to start a conversation.

### 3. Submitting Pull Requests (PRs)

1. **Fork** the repository.
2. **Create a branch** for your feature or bug fix:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix

```


3. **Install dependencies** and run code checks using [Bun](https://bun.sh/):
```bash
bun install
bun lint
bun typecheck

```


4. **Commit your changes** following the [Conventional Commits](https://www.google.com/search?q=https://www.conventionalcommits.org/) format:
* `feat: add country filter to checkout distributor matching`
* `fix: resolve SHA-256 checksum verification on drive uploads`
* `docs: update setup steps in README`


5. **Push to your fork** and submit a **Pull Request** targeting the `main` branch.

---

## 📐 Development Guidelines

* **Runtime & Package Manager:** We use **Bun** exclusively for package management and running project scripts.
* **Strict TypeScript:** All code must be strictly typed to ensure reliability across the system.
* **UI Components:** Use Tailwind CSS and UI primitives matching the project design system.
* **Database & Payload CMS Schemas:** Any modifications to collections should be reflected in the Payload CMS config (`payload.config.ts`) and corresponding schemas (`collections/`).

---

Thank you for helping us build a physical, decentralized, and accessible AI infrastructure for everyone! 🌍