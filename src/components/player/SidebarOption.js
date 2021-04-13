import React from 'react'
import { useDataLayerValue } from '../../provide/Provider'
import './sidebarOption.css'

function SidebarOption({spotify, title, id, Icon}) {
    const [{}, dispatch] = useDataLayerValue();

    const changePlaylist = (id, e) => {
        dispatch({
            type: "SET_CURRENT_PLAYLIST",
            id: id,
        });

        spotify.getPlaylistTracks(id).then((response) => {
            dispatch({
                type: "SET_TRACKS",
                tracks: response,
            })
        });
    };
    return (
        <div className="sidebaroption">
            {Icon && <Icon className="sidebaroption_icon"/>}
            {Icon ? <h4>{title}</h4> : <p onClick={(e) => changePlaylist(id, e)}>{title}</p>}
        </div>
    )
}

export default SidebarOption
