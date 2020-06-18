import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const DECKS_KEY = 'Mobile-Flashcards:decks';
const NOTIFICATION_KEY = 'Mobile-Flashcards:notifications';

//gets all decks from AsyncStorage
export const getDecks = () => {
    return AsyncStorage.getItem(DECKS_KEY)
        .then((decks) => {
            const data = JSON.parse(decks);
            return data;
        });
};


//saves a new deck to AsyncStorage
export const saveDeckTitle = (title) => {
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





export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
    return {
        title: 'Take a quiz every day',
        body: "don't forget to take a quiz today",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    };
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);//tomorrows date
                            tomorrow.setHours(20);//8:XX pm
                            tomorrow.setMinutes(0);//X.00
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            );

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    });
            }
        });
}