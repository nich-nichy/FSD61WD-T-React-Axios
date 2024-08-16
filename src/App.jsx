import './App.css'
import UserProvider from './context/Context';

function App() {
  return (
    <UserProvider>
      <>
        <h1>Hello world</h1>
      </>
    </UserProvider>

  )
}

export default App
