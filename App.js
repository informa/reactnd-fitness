import React from "react";
import { View, Platform, StatusBar } from "react-native";
import "react-native-gesture-handler";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import EntryDetail from "./components/EntryDetail";

const UdaciStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const RouteConfigs = {
  History: {
    name: "History",
    component: History,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      ),
      title: "History",
    },
  },
  AddEntry: {
    component: AddEntry,
    name: "Add Entry",
    options: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      ),
      title: "Add Entry",
    },
  },
};

const Tab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      navigationOptions={{
        header: null,
      }}
      tabBarOptions={{
        activeTintColor: Platform.OS === "ios" ? purple : white,
        style: {
          height: Platform.OS === "ios" ? 100 : 56,
          backgroundColor: Platform.OS === "ios" ? white : purple,
          shadowColor: "rgba(0, 0, 0, 0.24)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      }}
    >
      <Tab.Screen {...RouteConfigs["History"]} />
      <Tab.Screen {...RouteConfigs["AddEntry"]} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    const store = createStore(reducer);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Tabs} />
              <Stack.Screen name="Entry Detail" component={EntryDetail} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
