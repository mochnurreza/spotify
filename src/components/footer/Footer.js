import { Grid, Slider } from '@material-ui/core'
import { PauseCircleFilledOutlined,  PlayCircleFilledOutlined, PlaylistPlay, Repeat, Shuffle, SkipNext, SkipPrevious, VolumeDown } from '@material-ui/icons'
import React from 'react'
import { useDataLayerValue } from '../../provide/Provider';
import { useSoundLayer } from '../../provide/soundProvider';
import './footer.css'

function Footer() {
    const [{track, tracks}, dispatch] = useDataLayerValue();
    const [{audio, playing, repeat, volume, shuffle}, soundDispatch] = useSoundLayer();

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

    const setRepeat = () => {
        if (!repeat && shuffle) {
            setShuffle();
        }
        soundDispatch({
            type: "SET_REPEAT",
            repeat: !repeat,
        });
    };

    const setShuffle = () => {
        if (!shuffle && repeat) {
            setRepeat();
        }
        soundDispatch({
            type: "SET_SHUFFLE",
            shuffle: !shuffle,
        });
    };

    const handleChange = (event, value) => {
        soundDispatch({
            type: "SET_VOLUME",
            volume: value / 100
        });
    };

    if (audio) {
        audio.onended = () => {
            if (shuffle) {
                while(true) {
                    let randomTrackNumber = Math.floor((Math.random() * tracks.items.length));
                    let randomTrack = tracks.items[randomTrackNumber].track;
                    if (track !== randomTrack) {
                        dispatch({
                            type: "SET_TRACK",
                            track: randomTrack
                        });

                        let isPlaying = playing;
                        soundDispatch({
                            type: "SET_PLAYING",
                            playing: false,
                        });

                        let audio = new Audio(randomTrack.preview_url);
                        audio.loop = repeat;
                        soundDispatch({
                            type: "SET_AUDIO",
                            audio: audio,
                        });

                        if (isPlaying) {
                            soundDispatch({
                                type: "SET_PLAYING",
                                playing: true,
                            });
                        }

                        document.title = `${randomTrack.name} ${randomTrack.artists.map((artist) => artist.name).join(', ')}`
                        break
                    }
                }
            }
            if (!repeat && !shuffle) {
                soundDispatch({
                    type: "SET_PLAYING",
                    playing: false,
                });
            }
        }
    }

    return (
        <div className="footer">
            <div className="footer_left">
                <img className="footer_albumlogo" src={track ? track.album.images[0].url : ''} alt=""/>
                <div className="footer_songinfo">
                    <h4>{track ? track.name : 'no song selected'}</h4>
                    <p>{track ? track.artists.map((artist) => artist.name).join(', ') : null}</p>
                </div>
            </div>
            <div className="footer_center">
                <Shuffle onClick={track ? setShuffle : null} className={shuffle ? "footer_green" : "footer_icon"}/>
                <SkipPrevious className="footer_icon"/>
                {playing ? 
                <PauseCircleFilledOutlined 
                onClick={track ? stopPlaying : null} 
                fontSize="large" 
                className="footer_icon"/> :
                <PlayCircleFilledOutlined onClick={track ? startPlaying : null}
                fontSize="large"
                className="footer_icon" />}
                <SkipNext className="footer_icon"/>
                <Repeat onClick={ track ? setRepeat : null} className={repeat ? "footer_green" : "footer_icon"}/>
            </div>
            <div className="footer_right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlay/>
                    </Grid>
                    <Grid item>
                        <VolumeDown/>
                    </Grid>
                    <Grid item xs>
                        <Slider 
                        aria-labelledby="continuous-slider"
                        onChange={handleChange}
                        valueLabelDisplay="off"
                        min={0}
                        max={100}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
