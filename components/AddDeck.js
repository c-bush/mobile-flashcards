import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
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

        this.setState(() => ({ title: '' }));


        dispatch(handleAddDeck(title))
            .then(this.props.navigation.push(
                'Deck',
                { title: title }
            ));

    }


    render() {
        const buttonDisabled = this.state.title.length === 0;
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.titleText}>What is the title of the new Deck?</Text>
                <TextInput
                    style={styles.textbox}
                    onChangeText={this.handleChange}
                    value={this.state.title}
                />

                <TouchableOpacity
                    style={buttonDisabled ? commonStyles.disabledButton : commonStyles.button}
                    onPress={this.handleSubmit}
                    disabled={buttonDisabled}
                >
                    <Text style={commonStyles.buttonText}>Create Deck</Text>
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