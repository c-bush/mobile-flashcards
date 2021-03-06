import * as React from 'react';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { setLocalNotification } from './utils/asyncStorage';
import { green, black, gray } from './style';
import decks from './reducers';
import middleware from './middleware';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import DeckList from './components/DeckList';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';



const styles = StyleSheet.create({
    tabStyle: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? 'white' : green,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
    }
});

function FlashCardStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}

const RouteConfigs = {
    DeckList: {
        name: "DeckList",
        component: DeckList,
        options: { tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'Deck List' }
    },
    AddDeck: {
        name: "AddDeck",
        component: AddDeck,
        options: { tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Deck' }
    }
};

const TabNavigatorConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === "ios" ? 'purple' : black,
        inactiveTintColor: gray,
        style: styles.tabStyle
    }
};

const Tab = createBottomTabNavigator();

const TabNav = () => (
    <Tab.Navigator {...TabNavigatorConfig}>
        <Tab.Screen {...RouteConfigs['DeckList']} />
        <Tab.Screen {...RouteConfigs['AddDeck']} />
    </Tab.Navigator>
);

const StackNavigatorConfig = {
    headerMode: "screen"
};
const StackConfig = {
    TabNav: {
        name: "Home",
        component: TabNav,
        options: { headerShown: false }
    },
    Deck: {
        name: "Deck",
        component: Deck,
        options: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: green
            },
            title: 'Deck'
        }
    },
    AddCard: {
        name: "AddCard",
        component: AddCard,
        options: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: green
            },
            title: 'AddCard'
        }
    },
    Quiz: {
        name: "Quiz",
        component: Quiz,
        options: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: green
            },
            title: 'Quiz'
        }
    }
}
const Stack = createStackNavigator();
const MainNav = () => (
    <Stack.Navigator {...StackNavigatorConfig}>
        <Stack.Screen {...StackConfig['TabNav']} />
        <Stack.Screen {...StackConfig['Deck']} />
        <Stack.Screen {...StackConfig['AddCard']} />
        <Stack.Screen {...StackConfig['Quiz']} />
    </Stack.Navigator>
);


export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification();
    }

    render() {
        const store = createStore(decks, middleware);
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <FlashCardStatusBar backgroundColor={green} barStyle='light-content' />
                    <NavigationContainer >
                        <MainNav />
                    </NavigationContainer>
                </View>
            </Provider>

        );
    }
}


