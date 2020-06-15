import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { handleAddDeck } from '../actions/decks';


class AddDeck extends Component {

    state = {
        title: ''
    }

    handleChange = (e) => {
        const title = e;

        this.setState(() => ({ title }));
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const { title } = this.state;
        const { dispatch } = this.props;

        dispatch(handleAddDeck(title));

        console.log('before', this.state);
        this.setState(() => ({ title: 'panda' }));
        console.log('after', this.state);
    }


    render() {
        return (
            <View>
                <Text>What is the title of the new Deck?</Text>
                <TextInput
                    onChangeText={this.handleChange}
                    value={this.state.text}
                />

                <TouchableOpacity

                    onPress={this.handleSubmit}
                >
                    <Text >SUBMIT</Text>
                </TouchableOpacity>
            </View>

        );
    }
}



export default connect()(AddDeck);