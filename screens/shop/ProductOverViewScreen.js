import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductOverViewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          title={itemData.item.title}
          onViewDetails={() => {
            props.navigation.navigate("ProductDetails"),{
              idProduct : itemData.item.id,
              titleProduct: itemData.item.title
            }
          }}
          onToCart={() => {}}
        />
      )}
    />
  );
};

ProductOverViewScreen.navigationOptions = {
  headerTitle: "All Products"
};

const styles = StyleSheet.create({});

export default ProductOverViewScreen;
