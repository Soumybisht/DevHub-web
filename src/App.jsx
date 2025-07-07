import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Reqeusts from './components/Reqeusts';
import Chat from './components/Chat';

function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element={<Profile/>} />  
            <Route path='/feed' element={<Feed/>} />  
            <Route path='/connections' element={<Connections/>} />  
            <Route path='/requests' element={<Reqeusts/>} />   
            <Route path="/chat/:targetUserId" element={<Chat/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
