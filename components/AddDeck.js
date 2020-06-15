import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { handleAddDeck } from '../actions/decks';


class AddDeck extends Component {


    constructor(props) {
        super(props);

        //makes it an instance of state
        //outside might be static
        //and we can do more initializing in this function
        this.state = {
            title: ''
        };
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

        this.setState(() => ({ title: '' }));
    }


    render() {
        return (
            <View>
                <Text>What is the title of the new Deck?</Text>
                <TextInput
                    onChangeText={this.handleChange}
                    value={this.state.title}
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