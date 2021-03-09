import { Home, LibraryMusic, Search } from '@material-ui/icons'
import React from 'react'
import SidebarOption from './SidebarOption'
import './sidebar.css'
import { useDataLayerValue } from '../../provide/Provider'

function Sidebar() {
    const [{playlists}, dispatch] = useDataLayerValue()
    return (
        <div className="sidebar">
            <img src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg" alt="logo"/>
        <SidebarOption title="Home" icon={Home}/>
        <SidebarOption title="Search" icon={Search}/>
        <SidebarOption title="Your Library" icon={LibraryMusic}/>
        <br/>
        <strong className="sidebar_title">PLAYLIST</strong>
        <hr/>
        {playlists?.items?.map((playlist) => (
            <SidebarOption title={playlist.name}/>
        ))}
        
            
        </div>
    )
}

export default Sidebar
