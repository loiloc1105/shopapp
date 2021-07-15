import { ADD_ORDER } from "../actions/orders";
import Orders from "../../models/orders";
const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Orders(
        new Date().toString(), // ra 1 chuoi so dung Date().valueOf()
        action.orderData.items,
        action.orderData.amount,
        new Date()
      )
      return{
          ...state,
          orders: state.orders.concat(newOrder) //concat dung de noi chuoi trong array
      }
  }
  return state;
};
