import React, { useEffect, useState } from 'react';
import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';

export default function Sidebar() {
  const { data: session, status } = useSession()
  const spotifyApi = useSpotify()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  console.log(playlistId)

  useEffect(() => {
    if(spotifyApi.getAccessToken()) {
        spotifyApi.getUserPlaylists().then(data => {
            setPlaylists(data.body.items)
        })
    }

    else {
        setPlaylists([{name: 'sexo'}])
    }
    
  }, [session, spotifyApi])

  return (
    <div className='text-gray-500 p-5 text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] border-r 
    border-gray-900 overflow-y-scroll h-screen scrollbar-hide hidden md:inline-flex'>
        <div className='space-y-4'>
            <button className='sidebar_btn' onClick={() => signOut()}>
                <p>Logout</p>
            </button>
            <button className='sidebar_btn'>
                <HomeIcon className='sidebar_btn_icon' />
                <p>Home</p>
            </button>
            <button className='sidebar_btn'>
                <SearchIcon className='sidebar_btn_icon' />
                <p>Search</p>
            </button>
            <button className='sidebar_btn'>
                <LibraryIcon className='sidebar_btn_icon' />
                <p>Your Library</p>
            </button>

            <hr className='borde-t-[0.1px] border-gray-900' />

            <button className='sidebar_btn'>
                <PlusCircleIcon className='sidebar_btn_icon' />
                <p>Create Playlist</p>
            </button>
            <button className='sidebar_btn'>
                <HeartIcon className='sidebar_btn_icon' />
                <p>Liked Songs</p>
            </button>
            <button className='sidebar_btn'>
                <RssIcon className='sidebar_btn_icon' />
                <p>Your episodes</p>
            </button>

            <hr className='borde-t-[0.1px] border-gray-900' />

            {playlists.map(playlist => (
                <p key={playlist.id} className='sidebar_playlist' onClick={() => setPlaylistId(playlist.id)}>{playlist.name}</p>
            ))}
        </div>
    </div>
  );
}
