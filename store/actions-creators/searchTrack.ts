import {Dispatch} from "react";
import {TrackAction, TrackActionTypes} from "../../types/track";
import axios from "axios";

export const fetchSearchTracks = (searchTerm) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            // const response = await axios.get('http://localhost:5000/tracks')
            const response = await axios.get(`http://localhost:5000/tracks/search?query=${searchTerm}`)
            console.log(response.data)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка при загрузке треков'})
        }
    }
}
