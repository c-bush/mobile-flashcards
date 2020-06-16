import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { commonStyles } from '../style';
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
            <View style={styles.mainContainer}>
                <Text style={styles.titleText}>What is the title of the new Deck?</Text>
                <TextInput
                    style={styles.textbox}
                    onChangeText={this.handleChange}
                    value={this.state.title}
                />

                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={this.handleSubmit}
                >
                    <Text style={commonStyles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>

        );
    }
}



export default connect()(AddDeck);




const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 35,
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