import { useReducer, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Textbar from "./components/Textbar";


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
      return { ...state, sidebarWidth: Math.max(100 * action.payload, 20)};
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isResizing, sidebarWidth } = state;

  const sidebarRef = useRef(null);

  const mouseDownHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "START_RESIZE" });
  };

  const mouseUpHandler = () => {
    dispatch({ type: "STOP_RESIZE" });
  };

  const mouseMoveHandler = (e) => {
    if (isResizing) {
      const newSidebarWidth = (e.clientX - sidebarRef.current.getBoundingClientRect().left) / window.innerWidth;
      dispatch({ type: "RESIZE", payload: newSidebarWidth });
    }
  };

  const textbarWidth = 100 - sidebarWidth;
  console.log(sidebarWidth, textbarWidth);

  return (
    <div
      className="flex h-full"
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
    >
      <div 
        ref={sidebarRef} 
        style={{ flex: `${sidebarWidth} 1 auto`, maxWidth: `${sidebarWidth * 100}%` }} 
      >
        <Sidebar />
      </div>

      <div
        className="w-1 cursor-col-resize bg-slate-900 hover:bg-slate-700"
        onMouseDown={mouseDownHandler}
      ></div>

      <div style={{ flex: `${textbarWidth} 1 auto`, maxWidth: `${textbarWidth * 100}%` }}>
       <Textbar />
      </div>
    </div>
  );
};

export default App;