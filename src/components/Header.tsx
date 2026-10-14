import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-zinc-50"
          >
            SneakAI<span className="text-orange-500">.</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <Link
            href="/marketplace"
            className="hover:text-white transition-colors"
          >
            Modelos
          </Link>
          <span className="text-zinc-700">/</span>
          <Link
            href="#distributors"
            className="hover:text-white transition-colors"
          >
            Distribuidor
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-medium text-zinc-400 hover:text-white px-3 py-1.5 transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-semibold px-3.5 py-1.5 rounded-lg text-xs transition-all"
          >
            Registar
          </Link>
        </div>
      </div>
    </header>
  );
}
