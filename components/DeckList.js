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
            <View style={{ flex: 1 }}>
                {Object.keys(decks).length > 0
                    ?
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <FlatList style={{ width: '100%'}}
                            data={Object.keys(decks)}
                            renderItem={({ item }) => <View style={styles.deckContainer}><DeckTitle title={item} /></View>}
                            keyExtractor={item => item}
                        />
                        <TouchableOpacity
                            style={styles.clearBtn}
                            onPress={this.handleSubmit}
                        >
                            <Text >Clear All Decks</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.noDecks}>
                        <Text style={styles.noDecksText} > there are no decks</Text>
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
    deckContainer: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 3,
        //padding: 10,
        width: '100%'
    },
    clearBtn: {
        backgroundColor: 'purple',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDecks: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDecksText: {
        fontSize: 35,
        textAlign: 'center'
    }
})