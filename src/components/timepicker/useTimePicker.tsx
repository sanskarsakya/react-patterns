/**
 * Software Design Document
 * Imported Members
 * - {value, onChange}
 *
 * Exported Members
 * - expanded
 * - setExpanded
 * - referenceElement
 * - setReferenceElement
 * - popperElement
 * - setPopperElement
 * - handleHrClick
 * - handleMinClick
 * - handleSecClick
 * - handleAmPmClick
 * - handleInputChange
 * - state
 *
 *
 *
 * @param state
 * @param action
 * @returns
 */

import { useEffect, useReducer, useState } from "react";

const initialState = {
  defaultVal: "19:45:pm",
  hr: "",
  min: "",
  sec: "",
  modulation: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "setState":
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

export const useTimePicker = ({ value, onChange }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [expanded, setExpanded] = useState(false);
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);

  useEffect(() => {
    if (value) {
      let splitted = value.split(":");

      let parsedHr = parseInt(splitted[0], 10);
      let parsedMin = parseInt(splitted[1], 10);
      let parsedModulation = splitted[2];

      dispatch({ type: "setState", payload: { value: parsedHr, key: "hr" } });
      dispatch({ type: "setState", payload: { value: parsedMin, key: "min" } });
      dispatch({
        type: "setState",
        payload: { value: parsedModulation, key: "modulation" },
      });
    }
  }, []);

  useEffect(() => {
    if (state.min && state.modulation) {
      let formattedMin = ("0" + state.min).slice(-2);
      let formatted = `${state.hr}:${formattedMin}:${state.modulation}`;
      onChange && onChange(formatted);
      dispatch({
        type: "setState",
        payload: { value: formatted, key: "defaultVal" },
      });
    }
  }, [state.min, state.hr, state.modulation]);

  const handleHrClick = (num: any) => {
    console.log(num);
    dispatch({ type: "setState", payload: { value: num, key: "hr" } });
  };

  const handleMinClick = (num: any) => {
    console.log(num);
    dispatch({ type: "setState", payload: { value: num, key: "min" } });
  };
  const handleSecClick = (num: any) => {
    console.log(num);
    dispatch({ type: "setState", payload: { value: num, key: "sec" } });
  };

  const handleAmPmClick = (ampm: any) => {
    console.log(ampm);
    console.log(state);
    dispatch({ type: "setState", payload: { value: ampm, key: "modulation" } });
  };

  const handleInputChange = () => {
    dispatch({ type: "setState", payload: { value: "", key: "defaultVal" } });
  };

  return {
    expanded,
    setExpanded,
    referenceElement,
    setReferenceElement,
    popperElement,
    setPopperElement,
    handleHrClick,
    handleMinClick,
    handleSecClick,
    handleAmPmClick,
    handleInputChange,
    state,
  };
};
