import './App.css'
import LoginButton from './components/auth0/LoginButton'
import LogoutButton from './components/auth0/LogoutButton'
import Profile from './components/auth0/Profile'

function App() {
  return (
    <>
      <LoginButton />
      <Profile />
      <LogoutButton />
    </>
  )
}

export default App
