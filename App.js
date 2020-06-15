import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import decks from './reducers';
import middleware from './middleware';
import AddDeck from './components/AddDeck';
import DeckList from './components/DeckList';



const store = createStore(decks, middleware);

export default function App() {
    return (
        <Provider store={store}>
            <View>
                <AddDeck />
                <DeckList />
            </View>
        </Provider>

  );
}

