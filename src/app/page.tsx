import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-col items-center gap-20'>
        <h1>LyriFusion</h1>
        <div className='flex flex-col items-center gap-4'>
          <input type="text" placeholder="Name your project" />
          <div className='flex-row space-x-4'>
            <button>Generate Project</button>
            <menu>Select Genre</menu>
          </div>
        </div>
      </div >
    </main >
  )
}
