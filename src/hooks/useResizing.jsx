import { useReducer, useRef, useCallback } from "react";

const initialState = {
  isResizing: false,
  sidebarWidth: 20,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START_RESIZE":
      return { ...state, isResizing: true };
    case "STOP_RESIZE":
      return { ...state, isResizing: false };
    case "RESIZE":
      return { ...state, sidebarWidth: Math.max(100 * action.payload, 20) };
    default:
      return state;
  }
};

const useResizing = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isResizing, sidebarWidth } = state;

  const sidebarRef = useRef(null);

  const mouseDownHandler = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: "START_RESIZE" });
  }, []);

  const mouseUpHandler = useCallback(() => {
    dispatch({ type: "STOP_RESIZE" });
  }, []);

  const mouseMoveHandler = useCallback(
    (e) => {
      if (isResizing) {
        const newSidebarWidth =
          (e.clientX - sidebarRef.current.getBoundingClientRect().left) / window.innerWidth;
        dispatch({ type: "RESIZE", payload: newSidebarWidth });
      }
    },
    [isResizing]
  );

  const textbarWidth = 100 - sidebarWidth;

  return {
    sidebarWidth,
    textbarWidth,
    sidebarRef,
    mouseDownHandler,
    mouseUpHandler,
    mouseMoveHandler,
  };
};

export {useResizing};