import {useState} from 'react'

import axios from 'axios'

export default function Search(){
    const [searchKey, setSearchKey]=useState("")

    const getUserId=()=>{

    }

    const addToPlaylist=(tracks)=>{
        axios.post("https://api.spotify.com/v1/playlists/{playlist_id}/tracks",
        {
            "tracks": {tracks}
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            
        })
        .then((response)=>{

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
            getAlbumIds(response.data.artists.items[0].id)

            createPlaylist(response.data.artists.items[0])
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