import { StyleSheet } from 'react-native';


export const green = '#228b22';
export const black = '#000000';
export const gray = '#a9a9a9';

export const commonStyles = StyleSheet.create({
    button: {
        backgroundColor: green,
        margin: 5,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: black
    }
});
