import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';



class DeckTitle extends Component {



    render() {
        const { title, cards } = this.props;
        const numCards = cards ? cards.length : 0;


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