import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ContinentSelection() {
  const continents = [
    { name: 'Africa', image: '/africa.svg' },
    { name: 'Asia', image: '/asia.svg' },
    { name: 'Europe', image: '/europe.svg' },
    { name: 'North America', image: '/north-america.svg' },
    { name: 'Oceania', image: '/oceania.svg' },
    { name: 'South America', image: '/south-america.png' },
  ];
  return (
    <main className="flex min-h-screen justify-center p-24">
      <Link href="/">
        <div>Voltar</div>
      </Link>
      <div className="flex gap-10">
        {continents.map((continent) => (
          <div className="text-center ">
            <div
              key={continent.name}
              className="border border-gray-400 rounded-lg w-40 h-40 p-5 flex justify-center items-center hover:bg-gray-300 transition-all"
            >
              <Image
                src={continent.image}
                alt={continent.name}
                width={200}
                height={200}
              />
            </div>
            <div>{continent.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
