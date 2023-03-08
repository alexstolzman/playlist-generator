import {useState} from 'react'

import axios from 'axios'

export default function Search(){
    const [searchKey, setSearchKey]=useState("")

    const createPlaylist=(artist)=>{
         axios.post(`https://api.spotify.com//v1/users/stolzmanalex/playlists`, {
            headers: {
                Authorization: `BQA1-UHnS7A-Mh4WeNwT5ioEZIhhSjs5S8uA5wUT5XVJY2hvSAqMopa0BhlFdL-SmYfE7mnKiey8wfW5gxpkRiu7BNmAk9OD5NaaklWvuV0RWvDKM26U6q99CYNdAEh2yRMVIMxvPYjVX_YW0fcGjNVrIh0Y6HowkzfD-osF_vZJq3-XCq197VdfGQdEtHCtJZkZkZKifU1BJFI8F2Ylq_r8g1gDUJQ8Kr2XLzy9oZqGAGsW`,
                ContentType: 'application/json'
            },
             body: JSON.stringify({
                "name": "New Playlist",
                "description": "New playlist description",
                "public": true
      }),
        })
    }

    const getAlbumIds= (artistId)=>{
        axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=50`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response)=>{


            response.data.items.forEach(element => {
                ///Add tracks from every album to playlist
            });

        })
        .catch((err)=>{
            console.log(err)
        })
    }



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
        getAlbumIds(response.data.artists.items[0].id)

        createPlaylist("test")
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