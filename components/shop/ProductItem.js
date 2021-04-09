import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
  Button
} from "react-native";
import Colors from "../../constants/Colors";
const { width, height } = Dimensions.get("window");

const ProductItem = (props) => {
  let TouchCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.container}>
      <TouchCmp onPress={props.onViewDetails} useForeground>
        <View>
          <View style={styles.images}>
            <Image
              //   resizeMode="stretch"
              style={styles.imageURL}
              source={{ uri: props.image }}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.control}>
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={props.onViewDetails}
            />
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={props.onToCart}
            />
          </View>
        </View>
      </TouchCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.95,
    marginLeft: width * 0.025,
    marginBottom: width * 0.05,
    marginTop: width * 0.02,
    borderWidth: width * 0.002,
    borderColor: "#888",
    borderRadius: width * 0.03,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden"
  },
  images: {
    width: width * 0.948,
    height: width * 0.6,
    position: "relative"
    // borderWidth:1
  },
  imageURL: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: width * 0.03,
    borderTopLeftRadius: width * 0.03
    // borderWidth:1
  },
  content: {
    height: width * 0.15,
    alignItems: "center",
    padding: width * 0.01
  },
  title: {
    fontSize: 18,
    marginVertical: width * 0.01
  },
  price: {
    fontSize: 14,
    color: "#888"
  },
  control: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.1,
    marginBottom: width * 0.02,
    height: width * 0.1
  }
});

export default ProductItem;
