import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import ShopNavigation from "./navigations/ShopNavigation";
import { StyleSheet, Text, View } from "react-native";

const rootReduccers = combineReducers({
  products: productsReducer
});

const store = createStore(rootReduccers);

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigation />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
