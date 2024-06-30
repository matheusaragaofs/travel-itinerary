import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-24">
      <div className="flex items-center flex-col gap-10">
        <div className="">Crie seu roteiro de viagem! </div>
        <div>
          Já pensou em ter um roteiro de viagem personalizado para você?
        </div>

        <div className="flex gap-10">
          <div className="w-48  h-48 border-gray-400 border  rounded-lg flex items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-all ">
            Já sei o lugar que pretendo visitar
          </div>
          <Link href="/continent-selection">
            <div className="w-48  h-48 border-gray-400 border  rounded-lg flex items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-all ">
              Ainda não sei o lugar que pretendo visitar
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
