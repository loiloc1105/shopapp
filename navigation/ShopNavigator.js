import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrdersScreen";

import UserProductScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import Colors from "../constants/Colors";

const defaultNavigations = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    CartScreen: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavigations
  }
);

const OrdersNavigator = createStackNavigator(
  {
    OrderScreen: OrderScreen
  },
  {
    navigationOptions: {
    drawerIcon: ({tintColor}) => (
      <Ionicons
        name={Platform.OS === "android" ? "md-list" : "ios-list"}
        size={23}
        color={tintColor}
      />
    )
  },
    defaultNavigationOptions: defaultNavigations
  }
);


const AdmimNavigator = createStackNavigator(
  {
    UserProducts: UserProductScreen,
    EditProducts: EditProductScreen
  },
  {
    navigationOptions: {
    drawerIcon: ({tintColor}) => (
      <Ionicons
        name={Platform.OS === "android" ? "md-create" : "ios-create"}
        size={23}
        color={tintColor}
      />
    )
  },
    defaultNavigationOptions: defaultNavigations
  }
);


const drawerNavigation = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin:AdmimNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(drawerNavigation);
