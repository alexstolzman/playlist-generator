import {useState} from 'react'

import axios from 'axios'

export default function Search(){
    const [searchKey, setSearchKey]=useState("")
    const [playlistId, setPlaylistId]=useState("")

    const getUserId=()=>{

    }

    const addToPlaylist=(tracks)=>{
        axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
            "uris": tracks
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            
        })
        .then((response)=>{
           // console.log(response)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    //Create playlist
    const createPlaylist=(artist)=>{
         axios.post(`https://api.spotify.com/v1/users/stolzmanalex/playlists`,{
                "name": `${artist.name}`,
                "description": `All music by ${artist.name}`,
                "public": true
      }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        })
        .then((response)=>{
                setPlaylistId(response.data.id)
            })
        .catch((err)=>{
            console.log(err)
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
                axios.get(`https://api.spotify.com/v1/albums/${element.id}/tracks`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then((response)=>{
                        const tracks=[]
                        response.data.items.forEach(element=>{
                            tracks.push(element.uri)
                        })
                        addToPlaylist(tracks)
                        console.log(tracks)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            });

        })
        .catch((err)=>{
            console.log(err)
        })
    }



    const searchArtists = async (e) => {
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
            createPlaylist(response.data.artists.items[0])
            getAlbumIds(response.data.artists.items[0].id)

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