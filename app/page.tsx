import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-black bg-home-img bg-cover bg-center">
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounder-xl bg-black/70 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
          <h1 className="text-4xl font bold">Ken's Computer <br/>Repair Shop</h1>
          <address>
            777 Gateway Lane <br/>
            Kanpur, KS 77777  
          </address>
          <p>Daily 9am to 5pm</p>
          <Link href="tel:7777777777" className="hover:underline"></Link>
        </div>
      </main>
    </div>
    );
}
