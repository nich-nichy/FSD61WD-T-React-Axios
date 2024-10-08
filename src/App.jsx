import './App.css'
import Table from './components/Table';
import UserProvider from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    // App Component followed by context provider
    <UserProvider>
      <>
        <div className="poppins-medium m-5 mt-3">
          <h2 className='text-center p-2'>Crud</h2>
          <Table />
        </div>
      </>
    </UserProvider >

  )
}

export default App
