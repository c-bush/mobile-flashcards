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


        return (
            <View>
                {Object.keys(decks).length > 0
                    ?
                    <View>
                        <FlatList
                            data={Object.keys(decks)}
                            renderItem={({ item }) => <View style={styles.deckContainer}><DeckTitle title={item} /></View>}
                            keyExtractor={item => item}
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



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    deckContainer: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 3,
        padding: 10,
    }

})