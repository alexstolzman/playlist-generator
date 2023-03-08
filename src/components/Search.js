import {useState} from 'react'

import axios from 'axios'

export default function Search(){
    const [searchKey, setSearchKey]=useState("")

    const searchArtists = async (e) => {
    //e.preventDefault()
    axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })
    .then((response)=>{
        console.log(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })

}
    

    const makePlaylist=()=>{
       const result=searchArtists()
    }

    return(
        <div>
            <h1>Search Bar</h1>
            <input type="text" onChange={e => setSearchKey(e.target.value) } placeholder="search"/>
            <button onClick={()=>{makePlaylist()}}>Make Playlist</button>
        </div>
    )
}