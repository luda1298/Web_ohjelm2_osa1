import {
  GET_ATHLETES,
  ADD_ATHLETE,
  UPDATE_ATHLETE,
  DELETE_ATHLETE,
} from "./types";

export default function AppReducer(state, action) {
  switch (action.type) {
    case GET_ATHLETES:
      return {
        ...state,
        athletes: action.payload,
      };

    case ADD_ATHLETE:
      return {
        ...state,
        athletes: [...state.athletes, action.payload],
      };

    case UPDATE_ATHLETE:
      return {
        ...state,
        athletes: state.athletes.map((athlete) =>
          athlete.id === action.payload.id ? action.payload : athlete,
        ),
      };

    case DELETE_ATHLETE:
      return {
        ...state,
        athletes: state.athletes.filter(
          (athlete) => athlete.id !== action.payload,
        ),
      };

    default:
      return state;
  }
}
