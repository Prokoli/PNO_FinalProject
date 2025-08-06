import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import Account from './pages/Account.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import Explore from './pages/Explore.jsx'
import FullThread from './pages/FullThread.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Signup from './pages/Signup.jsx'
import ErrorPage from './pages/404Page.jsx'
import Layout from './pages/Layout.jsx'
import './index.css'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      <Route element={<Layout />}>
        <Route path='/' element={<App />} />
        <Route path='/account' element={<Account />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/explore' element={<Explore />} />

        <Route path='/thread/:id' element={<FullThread />} />
        <Route path='/thread/:id/edit-post' element={<EditPost />} />

        <Route path='/profile/:username' element={<Profile />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='*' element={<ErrorPage />} />

    </Routes>
  </BrowserRouter>,
)
