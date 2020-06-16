import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';



class DeckTitle extends Component {



    render() {
        const { title, cards } = this.props;
        const numCards = cards ? cards.length : 0;

        //console.log('render title: ', title);
        //console.log('render props: ', this.props);

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.numCards}>Cards: {numCards}</Text>
            </View>
        );
    }
}


function mapStateToProps(state, { title }) {
    //console.log('mapstate title: ', title);
    //console.log('mapstate state: ', state);
    return {
        ...state[title]
    };
}


export default connect(mapStateToProps)(DeckTitle);



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
    }

})