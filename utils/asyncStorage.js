import { AsyncStorage } from 'react-native';


const DECKS_KEY = 'Mobile-Flashcards:decks';

//gets all decks from AsyncStorage
export const getDecks = () => {
    return AsyncStorage.getItem(DECKS_KEY)
        .then((decks) => {
            console.log('getDecks():', decks);
            const data = JSON.parse(decks);
            return data;
        })
        //.then((data) => {
        //    console.log('getDecks():', data);
        //    //if (data === undefined || data === null) {
        //    //    return {panda:''};
        //    //}
        //    return (data);
        //});
}

//TODO: is this needed?
//gets a single deck from AsyncStorage
export async function getDeck(deckId) {
    return (getDecks()[deckId]);
}


//saves a new deck to AsyncStorage
export const saveDeckTitle = (title) => {
    return getDecks()
        .then((data) => {
            console.log('saveDeckTitle() incoming data:', data);
            console.log('saveDeckTitle() incoming title:', title);
            const decks = {
                ...data,
                [title]: {
                    title: title,
                    cards: []
                }
            };
            console.log('saveDeckTitle() saving...:', decks);
            AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
        });
};

//removes all decks from asyncstorage
export const removeAllDecks = () => {
    return AsyncStorage.setItem(DECKS_KEY, JSON.stringify({}));
};

export const addCardToDeck = (title, card) => {
    return getDecks()
        .then((data) => {
            const decks = {
                ...data,
                [title]: {
                    title: title,
                    cards: data[title].cards ? data[title].cards.concat(card) : [card]
                }
            };
            AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
        });
};

export const removeAllCards = (title) => {
    return getDecks()
        .then((data) => {
            const decks = {
                ...data,
                [title]: {
                    title: title,
                    cards: []
                }
            };
            AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
        });
};
