import { ADD_TO_CART, REMOVE_FROM_CART, CHECK_OUT } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      };

    case REMOVE_FROM_CART:
      const selectItem = state.items[action.pid];
      const quantityItem = selectItem.quantity;
      let updateItemCart;
      if (quantityItem > 1) {
        // need reduce 1 item from cart
        const updateItemCarts = new CartItem(
          quantityItem - 1, // props like model cart-item
          selectItem.productPrice, // props like model cart-item
          selectItem.productTitle, // props like model cart-item
          selectItem.sum - selectItem.productPrice // props like model cart-item
        );
        // update item by id product
        updateItemCart = { ...state.items, [action.pid]: updateItemCarts };
      } else {
        // need erase 1 product from cart
        updateItemCart = { ...state.items };
        // delete item by id product
        delete updateItemCart[action.pid];
      }
      return {
        ...state,
        items: updateItemCart,
        totalAmount: state.totalAmount - selectItem.productPrice
      };
    case CHECK_OUT:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state
      }
      const updateItem = {...state.items}
      const totalItem = state.items[action.pid].sum
      delete updateItem[action.pid]
      return{
        ...state,
        items: updateItem,
        totalAmount: state.totalAmount - totalItem
      }
  }
  return state;
};
