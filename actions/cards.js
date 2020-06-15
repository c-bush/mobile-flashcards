import { addCardToDeck } from '../utils/asyncStorage';


export const ADD_CARD = 'ADD_CARD';


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
                dispatch(addCard());
            });
    };
}

