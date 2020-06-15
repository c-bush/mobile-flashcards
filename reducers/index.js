import { ADD_CARD } from '../actions/cards';
import { ADD_DECK, GET_ALL_DECKS, DELETE_ALL_DECKS } from '../actions/decks';

export default function decks(state = {}, action) {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    cards: state[action.title].cards.concat([action.card])
                }
            };
        case ADD_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    cards: []
                }
            };
        case GET_ALL_DECKS:
            return {
                ...action.decks
            };
        case DELETE_ALL_DECKS:
            return {};
        default:
            return state;
    }
}