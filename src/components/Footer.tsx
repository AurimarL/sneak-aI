import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 px-6 text-xs bg-zinc-950 text-zinc-100 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>SneakAI © 2026 — AurimarL</div>
        <div className="flex gap-4">
          <Link
            href="https://github.com/AurimarL/SneakAI"
            className="hover:text-zinc-300"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
