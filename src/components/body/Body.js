import { Favorite, MoreHoriz, PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons';
import React from 'react'
import Header from '../header/Header';
import { useDataLayerValue }  from '../../provide/Provider';
import SongRow from '../songRow/SongRow'
import './body.css'
import { useSoundLayer } from '../../provide/soundProvider';

function Body({spotify}) {
    const [{current_playlist, track, tracks}] = useDataLayerValue();
    const [{playing, volume}, soundDispatch] = useSoundLayer();
    
    const startPlaying = () => {
        soundDispatch({
            type: "SET_PLAYING",
            playing: true,
        });
        soundDispatch({
            type: "SET_VOLUME",
            volume: volume / 100,
        });
    };

    const stopPlaying = () => {
        soundDispatch({
            type: "SET_PLAYING",
            playing: false,
        });
    };
    return (
        <div className="body">
            <Header spotify={spotify}/>
            <div className="body_info">
                <img src={current_playlist? current_playlist?.images[0].url : 'https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png'} alt=""/>
                <div className="body_infotext">
                    <strong> PLAYLIST </strong>
                    <h2>{current_playlist?.name}</h2>
                    <p>{current_playlist?.description}</p>
                </div>
            </div>

            <div className="body_songs">
                <div className="body_icons">
                    {playing ? 
                    <PauseCircleFilled 
                    onClick={track ? stopPlaying : null}
                    className="body_shuffle"/> : 
                    <PlayCircleFilled 
                    className="body_shuffle" 
                    onClick={track ? startPlaying : null} 
                    fontSize="large" />}
                    <Favorite fontSize="large" />
                    <MoreHoriz />
                </div>
                {tracks?.items.map((track) => (
                <SongRow track={track.track} key={track.track.id }/>
                ))}
            </div>
        </div>
    );
};

export default Body
