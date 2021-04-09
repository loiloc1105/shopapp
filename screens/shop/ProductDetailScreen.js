import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = (props) => {
  const idProduct = props.navigation.getParam("idProduct");
  const selectId = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === idProduct)
  );

  return (
    <View>
      <Text>{selectId.title}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData) =>{
  return{
    headerTitle: navData.navigation.getParam('titleProduct')
  }
}

const styles = StyleSheet.create({});

export default ProductDetailScreen;
