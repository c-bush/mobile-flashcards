import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { commonStyles } from '../style';

import DeckTitle from './DeckTitle';






class Deck extends Component {



    render() {
        const { title } = this.props;

        this.props.navigation.setOptions({
            title: title
        });

        return (
            <View style={styles.container}>
                <DeckTitle title={title} />
                <TouchableOpacity style={commonStyles.button}><Text style={commonStyles.buttonText}>Add Card</Text></TouchableOpacity>
                <TouchableOpacity style={commonStyles.button}><Text style={commonStyles.buttonText}>Start</Text></TouchableOpacity>
            </View>
        );
    }
}


function mapStateToProps(state, { route }) {
    const { title } = route.params;
    return {
        ...state[title]
    };
}


export default connect(mapStateToProps)(Deck);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 35,
        textAlign: 'center'
    },
    numCards: {
        fontSize: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        flex: 1
    }
})