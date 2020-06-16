import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import decks from './reducers';
import middleware from './middleware';
import AddDeck from './components/AddDeck';
import DeckList from './components/DeckList';



const styles = StyleSheet.create({
    tabStyle: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? 'white' : 'purple',
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
    }
})

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
}

const TabNavigatorConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === "ios" ? 'purple' : 'white',
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
}
const StackConfig = {
    TabNav: {
        name: "Home",
        component: TabNav,
        options: { headerShown: false }
    },
}
const Stack = createStackNavigator();
const MainNav = () => (
    <Stack.Navigator {...StackNavigatorConfig}>
        <Stack.Screen {...StackConfig['TabNav']} />
    </Stack.Navigator>
)

const store = createStore(decks, middleware);

export default function App() {
    return (
        <Provider store={store}>
            <View>
                <NavigationContainer >
                    <MainNav />
                </NavigationContainer>
            </View>
        </Provider>

  );
}

