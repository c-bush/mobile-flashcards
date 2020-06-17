import { addCardToDeck, removeAllCards } from '../utils/asyncStorage';


export const ADD_CARD = 'ADD_CARD';
export const CLEAR_CARDS = 'CLEAR_CARDS';

function addCard(title, card) {
    return {
        type: ADD_CARD,
        title: title,
        card: card
    };
}

export function handleAddCard(title, card) {
    return (dispatch) => {
        addCardToDeck(title, card)
            .then(() => {
                dispatch(addCard(title, card));
            });
    };
}

function clearCards(title) {
    return {
        type: CLEAR_CARDS,
        title: title
    };
}

export function handleClearCards(title) {
    return (dispatch) => {
        removeAllCards(title)
            .then(() => {
                dispatch(clearCards(title));
            });
    };
}
