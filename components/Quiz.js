import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { commonStyles, green } from '../style';


class Quiz extends Component {

    constructor(props) {
        super(props);

        this.state = {
            totalAnswered: 0,
            totalCorrect: 0,
            showAnswer: false
        };
    }
    handleStartOver = (e) => {
        this.setState(() => ({ totalAnswered: 0, totalCorrect: 0, showAnswer: false }));
    }
    handleCorrect = (e) => {
        const { totalAnswered, totalCorrect } = this.state;

        this.setState(() => ({ totalAnswered: totalAnswered + 1, totalCorrect: totalCorrect + 1, showAnswer: false }));
    }
    handleIncorrect = (e) => {
        const { totalAnswered } = this.state;

        this.setState(() => ({ totalAnswered: totalAnswered + 1, showAnswer: false }));
    }

    handleShowAnswer = (e) => {
        this.setState(() => ({ showAnswer: true }));
    }
    handleBackToDeck = (e) => {
        this.props.navigation.goBack(null);
    }

    render() {
        const { totalAnswered, totalCorrect, showAnswer } = this.state;
        const { title, cards } = this.props;

        const quizDone = totalAnswered === cards.length;

        if (quizDone) {
            return (
                <View style={styles.container}>
                    <Text style={styles.bigText}>Your done!</Text>
                    <Text style={styles.text}>{`${totalCorrect} correct of ${totalAnswered}`}</Text>
                    <TouchableOpacity
                        style={commonStyles.button}
                        onPress={this.handleBackToDeck}
                    >
                        <Text style={commonStyles.buttonText}>{`Back to '${title}'`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={commonStyles.button}
                        onPress={this.handleStartOver}
                    >
                        <Text style={commonStyles.buttonText}>Start Over</Text>
                    </TouchableOpacity>
                </View>
            );
        }


        this.props.navigation.setOptions({
            title: `Card ${totalAnswered + 1} of ${cards.length}: ${title}`
        });

        const { question, answer } = cards[totalAnswered];

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{question}</Text>
                {showAnswer
                    ?
                    <Text style={[styles.text, {color: green}]}>{answer}</Text>
                    :
                    <TouchableOpacity
                        style={commonStyles.button}
                        onPress={this.handleShowAnswer}
                    >
                        <Text style={commonStyles.buttonText}>Show Answer</Text>
                    </TouchableOpacity>
                }
                
                <Text style={styles.text}>Where you...</Text>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={this.handleCorrect}
                >
                    <Text style={commonStyles.buttonText}>Correct!</Text>
                </TouchableOpacity>
                <Text style={styles.text}>or</Text>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={this.handleIncorrect}
                >
                    <Text style={commonStyles.buttonText}>Incorrect</Text>
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


export default connect(mapStateToProps)(Quiz);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center'
    },
    bigText: {
        fontSize: 30,
        textAlign: 'center'
    }
})