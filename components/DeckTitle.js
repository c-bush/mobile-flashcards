import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';



class DeckTitle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bounceValue: new Animated.Value(1)
        };
    }

    render() {
        const { bounceValue } = this.state;
        const { title, cards, animate } = this.props;
        const numCards = cards ? cards.length : 0;

        if (animate) {
            Animated.sequence([
                Animated.timing(bounceValue, { duration: 200, toValue: 1.06 }),
                Animated.spring(bounceValue, { toValue: 1, friction: 3 })
            ]).start();
        }

        return (
            <View style={styles.container}>
                <Animated.Text style={[styles.title, { transform: [{ scale: bounceValue }] }]}>{title}</Animated.Text>
                <Text style={styles.numCards}>Cards: {numCards}</Text>
            </View>
        );
    }
}


function mapStateToProps(state, { title }) {
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