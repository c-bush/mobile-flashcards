import { getDecks, saveDeckTitle, removeAllDecks } from '../utils/asyncStorage';


export const ADD_DECK = 'ADD_DECK';
export const GET_ALL_DECKS = 'GET_ALL_DECKS';
export const DELETE_ALL_DECKS = 'DELETE_ALL_DECKS';

function getAllDecks(data) {
    return {
        type: GET_ALL_DECKS,
        decks: data
    };
}


export function handleGetAllDecks() {
    return (dispatch) => {
        getDecks()
            .then((data) => {
                dispatch(getAllDecks(data));
            });
    };
}


function addDeck(title) {
    return {
        type: ADD_DECK,
        title: title
    };
}

export function handleAddDeck(title) {
    return (dispatch) => {
        return saveDeckTitle(title)
            .then(() => {
                dispatch(addDeck(title));
            });
    };
}


function deleteAllDecks() {
    return {
        type: DELETE_ALL_DECKS
    };
}

export function handleDeleteAllDecks() {
    return (dispatch) => {
        return removeAllDecks()
            .then(() => {
                dispatch(deleteAllDecks());
            });
    };
}