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
                    title: title
                }
            };
            AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
        });
}


export async function addCardToDeck(title, card) {
    getDecks()
        .then((data) => {
            const decks = {
                ...data,
                [title]: {
                    title: title,
                    cards: {
                        ...data[title].cards,
                        card
                    }
                }
            };
            AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
        });
}