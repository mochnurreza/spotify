import React from 'react'
import { useDataLayerValue } from '../../provide/Provider'
import { useSoundLayer } from '../../provide/soundProvider';
import './songrow.css'

function SongRow({track}) {
    const [{}, dispatch] = useDataLayerValue();
    const [{playing, repeat}, soundDispatch] = useSoundLayer();

    const changTrack = (e, track) => {
        dispatch({
            type: "SET_TRACK",
            track: track,
        });

        let isPlaying = playing;
        soundDispatch({
            type: "SET_PLAYING",
            playing: false,
        });

        let audio = new Audio(track.preview_url);
        audio.loop = repeat;
        soundDispatch({
            type: "SET_AUDIO",
            audio: audio,
        });

        if(isPlaying) {
            soundDispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        }

        document.title = `${track.name} ${track.artists.map((artist) => artist.name).join(', ')}`
    };
    return (
        <div className="songrow" onClick={(e) => changTrack(e, track)}>
            <img className="songrow_album" src={track.album.images[0].url} alt=""/>
            <div className="songrow_info">
                <h1>{track.name}</h1>
                <p>
                    {track.artists.map((artist) => artist.name).join(", ")}
                </p>
                <p>
                    {track.album.name}
                </p>

            </div>
        </div>
    )
}

export default SongRow
