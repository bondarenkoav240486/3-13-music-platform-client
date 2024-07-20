// import React from 'react';
import React, { useState } from 'react';

import { ITrack } from "../types/track";
// import { Card, Grid, IconButton } from "@material-ui/core";
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useActions";

import axios from "axios";

import { useTypedSelector } from "../hooks/useTypedSelector";

import { Card, Grid, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core";




interface TrackItemProps {
    track: ITrack;
    // active?: boolean;
}

// const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
    const router = useRouter()
    const { playTrack, pauseTrack, setActiveTrack } = useActions()

    const { active, pause } = useTypedSelector(state => state.player);

    const [open, setOpen] = useState(false); // Додаємо стейт для модального вікна




    // const play = async (e) => {
    //     e.stopPropagation()
    //     setActiveTrack(track)
    //     playTrack()
    //     try {
    //         const response = await axios.post('http://localhost:5000/tracks/listen/' + track._id)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    const play = async (e) => {
        e.stopPropagation();
        if (track._id === active?._id) {

            if (pause) {
                playTrack();
            } else {
                pauseTrack();
            }
        } else {
            setActiveTrack(track);
            // playTrack();
            console.log(1)

            try {
                await axios.post(process.env.NEXT_PUBLIC_API_URL + 'tracks/listen/' + track._id);
            } catch (e) {
                console.log(e);
            }
            playTrack();
            console.log(12)
            console.log(pause)


        }
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setOpen(true); // Відкриваємо модальне вікно
    };

    const deleteTrack = async (e) => {
        e.stopPropagation()
        try {
            const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL + 'tracks/' + track._id)
            setOpen(false); // Закриваємо модальне вікно

            // window.location.reload();
        } catch (e) {
            console.log(e)
        }
    }

    const handleClose = (e) => {
        e.stopPropagation();

        setOpen(false); // Закриваємо модальне вікно без видалення
    };

    return (
        <Card className={`${styles.track} TrackItem`} onClick={() => router.push('/tracks/' + track._id)}>
            {/* <IconButton onClick={play}>
                {!active
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton> */}

            <IconButton onClick={play} >
                {active?._id === track._id && !pause
                    // {active?._id === track._id 
                    ? <Pause />
                    : <PlayArrow />
                }
            </IconButton>




            <img
                // width={'4.5 rem'}
                // height={'4.5 rem'}
                src={process.env.NEXT_PUBLIC_API_URL + track.picture}
            />
            {/* <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}> */}
            <Grid container direction="column" style={{ margin: '0 1.25rem' }}>
                <div>{track.name}</div>
                {/* <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div> */}
                <div style={{ fontSize: '0.75rem' }}>{track.artist}</div>
            </Grid>
            {/* {active && <div>02:42 / 03:22</div>} */}
            <IconButton
                // onClick={e => e.stopPropagation()}
                // onClick={deleteTrack}
                // handleDeleteClick
                onClick={handleDeleteClick}

                style={{ marginLeft: 'auto' }}
            >
                <Delete />
            </IconButton>




            {/* Модальне вікно підтвердження */}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Підтвердження видалення</DialogTitle>
                <DialogContent>
                    <div>Ви дійсно хочете видалити цю пісню? ( У будь якому разі у Вас не вийде, бо це може робити тільки адміністратор :) )</div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Скасувати
                    </Button>
                    <Button onClick={deleteTrack} color="secondary">
                        Видалити
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>


    );
};

export default TrackItem;
