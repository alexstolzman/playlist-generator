import {useState, useEffect} from 'react'

import Button from 'react-bootstrap/Button';

export default function SignIn(){


  const CLIENT_ID = "288b33b4c8a34435b5fd6b7ac3a7eed1"
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

    useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

}, [])

const logout = () => {
  setToken("")
  window.localStorage.removeItem("token")
}

return(
     <div className="App">
      <header className="App-header">
      {!token ?
                   
                    <Button variant="outline-primary" onClick={logout} href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</Button>
                    : <Button variant="outline-primary" onClick={logout}>Logout</Button>}
                    
      </header>
    </div>
)


}