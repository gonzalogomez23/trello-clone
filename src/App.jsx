
// Custom components
import ListWrapper from './components/ListWrapper'

function App() {

  return (
    <>
      <div className='flex flex-col bg-dark1-900 h-screen w-screen overflow-x-hidden'>
        <header className='p-4 border-b border-dark1-400'>
          <h1 className='text-4xl font-bold'>Trello Clone</h1>
        </header>
        <main className='flex-grow w-100 overflow-x-auto'>
          <ListWrapper />
        </main>
      </div>
    </>
  )
}

export default App
