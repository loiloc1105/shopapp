import React from "react";
import { StyleSheet, Text, View, Platform, FlatList } from "react-native";
import OrderItem from "../../components/shop/OrderItem";
import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen = () => {
  const orderItem = useSelector((state) => state.orders.orders);
  // console.log(orderItem);
  
  return (
    <FlatList
      data={orderItem}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          items={itemData.item.items}
          totalAmount={itemData.item.totalAmount} // use model totalAmount
          date={itemData.item.readableDate} // use model readableDate
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Order Screen",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default OrdersScreen;

const styles = StyleSheet.create({});
