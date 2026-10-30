import { useReducer } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import AthleteContext from "./AthleteContext";
import AppReducer from "./AppReducer";

import {
  GET_ATHLETES,
  ADD_ATHLETE,
  UPDATE_ATHLETE,
  DELETE_ATHLETE,
} from "./types";

const API_URL = "http://localhost:3000/api/athletes";

const GlobalState = ({ children }) => {
  const initialState = {
    athletes: [],
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  // GET all athletes
  const getAthletes = async () => {
    const response = await axios.get(API_URL);

    dispatch({
      type: GET_ATHLETES,
      payload: response.data.athletes,
    });

    return response.data;
  };

  // GET one athlete
  const getAthlete = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);

    return response.data.athlete;
  };

  // POST new athlete
  const addAthlete = async (newAthlete) => {
    await axios.post(API_URL, newAthlete);

    // Refresh because the server generates the athlete ID
    await getAthletes();
  };

  // PUT updated athlete
  const updateAthlete = async (id, updatedAthlete) => {
    await axios.put(`${API_URL}/${id}`, updatedAthlete);

    await getAthletes();
  };

  // DELETE athlete
  const deleteAthlete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);

    dispatch({
      type: DELETE_ATHLETE,
      payload: id,
    });
  };

  return (
    <AthleteContext.Provider
      value={{
        athletes: state.athletes,
        getAthletes,
        getAthlete,
        addAthlete,
        updateAthlete,
        deleteAthlete,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};

GlobalState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalState;
