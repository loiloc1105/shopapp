import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Dimensions
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CardItem from "../../components/shop/CardItem";
import * as cartAtions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

const { width, height } = Dimensions.get("window");

const CartScreen = (props) => {
  const productAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const tranformedCartItem = [];
    //khi dung object thi phai push items vao object
    for (let key in state.cart.items) {
      tranformedCartItem.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return tranformedCartItem.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  //   console.log(cartItems);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.totalMoney}>
        <Text style={styles.total}>
          Total:
          <Text style={styles.amount}> ${Math.round(productAmount.toFixed(2) *100 ) / 100 }</Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, productAmount)),
              dispatch(cartAtions.checkOut());
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CardItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            total={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartAtions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = () => {
  return {
    headerTitle: "Cart Screen"
  };
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    margin: width * 0.03
    //   borderWidth : 1
  },
  totalMoney: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: width * 0.03,
    padding: width * 0.03,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white"
  },
  total: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});
