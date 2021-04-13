import { Avatar } from '@material-ui/core'
import { ArrowDropDown, PinDrop, Search } from '@material-ui/icons'
import React from 'react'
import { useDataLayerValue } from '../../provide/Provider'
import './header.css'

function Header() {
    const [{user}] = useDataLayerValue()
    return (
        <div className="header">
            <div className="header_left">
                <Search/>
                <input type="text" placeholder="Search for Artists, Songs, or Podcasts"/>
            </div>
            <div className="header_right">
                <Avatar alt={user?.display_name} src={user?.images[0].url} />
                <h4>{user?.display_name}</h4>
                <ArrowDropDown />
            </div>
            
        </div>
    )
}

export default Header
