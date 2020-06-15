import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Platform, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';

//import getDecks from '../utils/asyncStorage';
import { handleGetAllDecks, handleDeleteAllDecks } from '../actions/decks';

import DeckTitle from './DeckTitle';


class DeckList extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(handleGetAllDecks());

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(handleDeleteAllDecks());
    }


    render() {
        console.log('decklist props: ', this.props);
        const { decks } = this.props;


        console.log('Object.keys: ', Object.keys(decks));
        const maybe = Object.keys(decks).map((deckKey) => { { key: deckKey } });
        console.log('Formated?: ', maybe);

        

        return (
            <View>
                {Object.keys(decks).length > 0
                    ?
                    <View>
                        <FlatList
                            data={Object.keys(decks)}
                            renderItem={({ item }) => <DeckTitle title={item}/>}
                        />
                        <TouchableOpacity

                            onPress={this.handleSubmit}
                        >
                            <Text >Clear All Decks</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <Text>there are no decks</Text>
                    </View>

                }

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: state
    };
}

export default connect(mapStateToProps)(DeckList);