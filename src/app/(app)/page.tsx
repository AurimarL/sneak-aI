import Link from "next/link";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Radio,
  CheckCircle2,
  Globe2,
  Box,
  KeyRound,
  WifiOff,
  Zap,
  ShoppingBag,
} from "lucide-react";

/*

import { getPayload } from 'payload'
import config from '@/payload.config'
const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
*/

export default function LandingPage() {
  return (
    <div>
      {/* Hero Principal - Focado na Solução */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 border-b border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs">
              <ShoppingBag className="h-3.5 w-3.5 text-orange-500" />
              <span>Entregas físicas diretas na sua porta</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-50 leading-tight">
              Os melhores modelos de IA, <br />
              <span className="text-orange-500">entregues em mãos.</span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Esqueça downloads lentos que demoram dias ou consomem a sua
              internet. Escolha os modelos de IA que precisa, selecione a mídia
              (SSD ou Pen Drive) e receba tudo pronto a usar.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/marketplace"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-semibold px-5 py-2.5 rounded-lg text-sm transition-all"
              >
                <span>Ver Catálogo e Comprar</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register?type=distributor"
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold px-5 py-2.5 rounded-lg text-sm border border-zinc-800 transition-all"
              >
                <span>Ser um Distribuidor</span>
              </Link>
            </div>
          </div>

          {/* Card de Destaque do Catálogo */}
          <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-zinc-400">
              <span className="flex items-center gap-2">
                <Radio className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
                <span className="font-semibold text-zinc-200">
                  Modelos Prontos para Envio
                </span>
              </span>
            </div>

            <div className="py-4 space-y-3">
              <div className="p-3 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-zinc-200 font-bold">Llama 3 (70B)</div>
                  <div className="text-[11px] text-zinc-500">
                    Ideal para assistentes complexos • 38.5 GB
                  </div>
                </div>
                <span className="text-emerald-400 text-[11px] font-medium">
                  Em Stock
                </span>
              </div>

              <div className="p-3 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-zinc-200 font-bold">
                    DeepSeek R1 (32B)
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Especialista em raciocínio • 34.0 GB
                  </div>
                </div>
                <span className="text-emerald-400 text-[11px] font-medium">
                  Em Stock
                </span>
              </div>

              <div className="p-3 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-zinc-200 font-bold">
                    Qwen 2.5 Coder (32B)
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Geração e análise de código • 20.2 GB
                  </div>
                </div>
                <span className="text-emerald-400 text-[11px] font-medium">
                  Em Stock
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Arquivos testados e verificados</span>
              <Link
                href="/marketplace"
                className="text-orange-400 hover:underline font-medium"
              >
                Explorar todos &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Secção 1: (#about) */}
      <section
        id="about"
        className="max-w-7xl mx-auto px-6 py-20 border-b border-zinc-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-xs uppercase tracking-wider text-orange-500 font-semibold">
              Sem Complicações
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
              A forma mais rápida de ter Inteligência Artificial no seu
              computador.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Baixar dezenas de gigabytes pela internet pode falhar a meio,
              gastar muitos dados e demorar muito tempo.
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Nós simplificamos o processo: grava-se o modelo numa mídia física
              de alta velocidade e entrega-se diretamente a si.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-lg">
              <Zap className="h-5 w-5 text-orange-500 mb-2" />
              <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                Chegar e Usar
              </h4>
              <p className="text-xs text-zinc-500">
                Conecte o Pen Drive ou SSD ao seu computador e comece a usar sem
                configurações complexas.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-orange-500 mb-2" />
              <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                Arquivos Garantidos
              </h4>
              <p className="text-xs text-zinc-500">
                Garantimos que todos os dados gravados estão completos e sem
                erros de corrupção.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-lg">
              <Box className="h-5 w-5 text-orange-500 mb-2" />
              <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                Mídias À Sua Escolha
              </h4>
              <p className="text-xs text-zinc-500">
                Compre mídias de marcas confiáveis ajustadas ao tamanho exato
                dos seus modelos.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-lg">
              <KeyRound className="h-5 w-5 text-orange-500 mb-2" />
              <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                Total Privacidade
              </h4>
              <p className="text-xs text-zinc-500">
                Use a sua inteligência artificial de forma 100% privada e sem
                precisar de estar ligado à internet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Secção 2: */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs uppercase tracking-wider text-orange-500 font-semibold">
            Pensado Para Si
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
            Como o SneakAI facilita a sua vida
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-lg p-6 space-y-3">
            <WifiOff className="h-6 w-6 text-orange-500" />
            <h4 className="text-base font-bold text-zinc-200">
              Economize a sua Internet
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Não gaste o seu plano de dados nem oculte a velocidade da sua rede
              doméstica a fazer downloads pesados durante dias.
            </p>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-lg p-6 space-y-3">
            <Truck className="h-6 w-6 text-orange-500" />
            <h4 className="text-base font-bold text-zinc-200">
              Envios Rápidos e Transparentes
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Veja o preço fixo de transporte antes de comprar e escolha entre
              distribuidores locais ou de outros locais.
            </p>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-lg p-6 space-y-3">
            <ShoppingBag className="h-6 w-6 text-orange-500" />
            <h4 className="text-base font-bold text-zinc-200">
              Compre Sem Complicações
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Adicione os modelos ao carrinho, insira a sua morada de entrega e
              conclua o pedido sem necessidade de registos demorados.
            </p>
          </div>
        </div>
      </section>

      {/* Secção 3: (#distributors) */}
      <section
        id="distributors"
        className="max-w-7xl mx-auto px-6 py-20 border-b border-zinc-900"
      >
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded">
                <Globe2 className="h-3.5 w-3.5" />
                <span>Oportunidade para Parceiros</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50">
                Tem mídias de armazenamento e boa internet?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Junte-se à rede do SneakAI como distribuidor. Prepare os modelos
                em SSDs ou Pen Drives, defina os seus preços e taxas de envio, e
                atenda os pedidos dos clientes da sua região.
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-zinc-300">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Venda o seu próprio stock
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Defina os seus preços de frete
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Plataforma simples de gerir
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/register?type=distributor"
                className="w-full sm:w-auto text-center bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-500/10"
              >
                Tornar-se Distribuidor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
