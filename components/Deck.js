import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { commonStyles } from '../style';

import DeckTitle from './DeckTitle';
import { handleClearCards } from '../actions/cards';



class Deck extends Component {



    handleClearCards = (e) => {
        e.preventDefault();

        this.props.dispatch(handleClearCards(this.props.title));
    }

    render() {
        const { title, cards } = this.props;


        this.props.navigation.setOptions({
            title: title
        });

        const noCards = !cards || cards.length === 0;


        return (
            <View style={styles.container}>
                <DeckTitle title={title} animate={true}/>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => {
                        this.props.navigation.push(
                            'AddCard',
                            { title: title }
                        );
                    }}
                >
                    <Text style={commonStyles.buttonText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={noCards}
                    style={noCards ? commonStyles.disabledButton : commonStyles.button}
                    onPress={() => {
                        this.props.navigation.push(
                            'Quiz',
                            { title: title }
                        );
                    }}
                >
                    <Text style={commonStyles.buttonText}>Start a Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={noCards}
                    style={noCards ? commonStyles.disabledButton : commonStyles.button}
                    onPress={this.handleClearCards}
                >
                    <Text style={commonStyles.buttonText}>Clear All Cards</Text>
                </TouchableOpacity>
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
    }
})