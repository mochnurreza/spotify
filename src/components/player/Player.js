import React from 'react'
import Body from '../body/Body'
import Footer from '../footer/Footer'
import Sidebar from './Sidebar'
import './player.css'


function Player({spotify}) {
    return (
        <div className="player">
            <div className="player_body">
                <Sidebar spotify={spotify}/>
                <Body spotify={spotify}/>
            </div>
                <Footer spotify={spotify}/>
        </div>
    )
}

export default Player
