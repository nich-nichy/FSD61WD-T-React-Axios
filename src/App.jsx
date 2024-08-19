import './App.css'
import Table from './components/Table';
import Model from './components/Model';
import UserProvider from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <UserProvider>
      <>
        <div className="poppins-medium m-5 mt-3">
          <h2 className='text-center p-2'>Crud</h2>
          <button type="button" className="btn btn-primary m-2 ms-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Add User
          </button>
          <Model />
          <Table />
        </div>
      </>
    </UserProvider >

  )
}

export default App
