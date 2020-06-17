import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { commonStyles } from '../style';

import { handleAddCard } from '../actions/cards';


class AddCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: '',
            answer: ''
        };
    }

    handleQuestionChange = (e) => {
        const question = e;

        this.setState(() => ({ question }));
    }
    handleAnswerChange = (e) => {
        const answer = e;

        this.setState(() => ({ answer }));
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { question, answer } = this.state;
        const { dispatch, title } = this.props;

        dispatch(handleAddCard(title, { question, answer }));

        this.setState(() => ({ question: '', answer: '' }));
    }

    render() {
        const { title } = this.props;

        this.props.navigation.setOptions({
            title: title + ': Add Card'
        });

        const buttonDisabled = this.state.question.length === 0 || this.state.answer.length === 0;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>The Question:</Text>
                <TextInput
                    style={styles.textbox}
                    onChangeText={this.handleQuestionChange}
                    value={this.state.question}
                />
                <Text style={styles.text}>The Answer:</Text>
                <TextInput
                    style={styles.textbox}
                    onChangeText={this.handleAnswerChange}
                    value={this.state.answer}
                />
                <TouchableOpacity
                    disabled={buttonDisabled}
                    style={buttonDisabled ? commonStyles.disabledButton : commonStyles.button}
                    onPress={this.handleSubmit}
                >
                    <Text style={commonStyles.buttonText}>Submit Card</Text>
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


export default connect(mapStateToProps)(AddCard);



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
    textbox: {
        borderColor: 'black',
        borderWidth: 3,
        padding: 5,
        width: '80%',
        fontSize: 20
    }
})