import Home from './Components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Forms/Register';
import Login from './Forms/Login';
import Logout from './Forms/Logout';
import Songs from './Components/Songs';
import ForgotPassword from './Forms/ForgotPassword';
import { AuthContextProvider } from './Context/Authcontext';
import Error from './Components/Notfound';
import Protected from './Forms/Protected';
import Single from './Components/Single';
import NewSong from './Components/NewSong';
import Chats from './Chats/Chats';
import SocketContextProvider from './Context/SocketContext';


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <SocketContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/api'>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='logout' element={<Logout />} />
              </Route>
              <Route path='/songs'>
                <Route path='' element={<Protected Component={Songs} />} />
                <Route path=':id' element={<Protected Component={Single} />} />
                <Route path='new' element={<Protected Component={NewSong} />} />
              </Route>
              <Route path='/chats/:id' element={<Protected Component={Chats} />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </BrowserRouter>
        </SocketContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;