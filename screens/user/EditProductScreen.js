import React, { useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Platform,
  ScrollView,
  View,
  Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import * as productAction from "../../store/actions/products";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updateValue = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updateValid = {
      ...state.inputValid,
      [action.input]: action.isValid
    };
    let updateFormValid = true;
    for (const key in updateValid) {
      updateFormValid = updateFormValid && updateValid[key];
    }
    return {
      formValid: updateFormValid,
      inputValues: updateValue,
      inputValid: updateValid
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("productId");
  // console.log(productId);
  const editProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editProduct ? editProduct.title : "",
      imageUrl: editProduct ? editProduct.imageUrl : "",
      description: editProduct ? editProduct.description : "",
      price: ""
    },
    inputValid: {
      title: editProduct ? true : false,
      imageUrl: editProduct ? true : false,
      description: editProduct ? true : false,
      price: editProduct ? true : false
    },
    formValid: editProduct ? true : false
  });

  // const [title, setTitle] = useState(editProduct ? editProduct.title : "");
  // const [validTitle, setValidTitle] = useState(false);
  // const [imageUrl, setImageUrl] = useState(
  //   editProduct ? editProduct.imageUrl : ""
  // );
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState(
  //   editProduct ? editProduct.description : ""
  // );

  const submitHandler = useCallback(() => {
    console.log("Submiting!");
    if (!formState.formValid) {
      Alert.alert("Errors", "Please check errors in the form.", [
        { text: "Okay" }
      ]);
      return;
    }
    if (editProduct) {
      dispatch(
        productAction.updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productAction.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      ); // dung toFixed nen phai +price
    }
    props.navigation.goBack();
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const editChangeHandler = (Identified, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      // setValidTitle(false);
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: Identified
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={editChangeHandler.bind(this, "title")}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onEndEditing={() => console.log("onEndEditing")}
            onSubmitEditing={() => console.log("onSubmitEditing")}
          />
          {!formState.inputValues.title && <Text>Please enter a valid Title </Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={editChangeHandler.bind(this, "imageUrl")}
          />
        </View>
        {editProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={editChangeHandler.bind(this, "price")}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={editChangeHandler.bind(this, "description")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderBottomColor: "#CCC"
  }
});

export default EditProductScreen;
