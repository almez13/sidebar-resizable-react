import { useReducer, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Textbar from "./components/Textbar";

/*
const App = () => {
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const initialX = useRef(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    initialX.current = e.clientX;
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newSidebarWidth = sidebarWidth + (e.clientX - initialX.current);
      setSidebarWidth(newSidebarWidth);
      initialX.current = e.clientX;
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove]);

  return (
    <div className="flex h-full">
      <div style={{ flexBasis: `${sidebarWidth}px` }} ref={sidebarRef}>
        <Sidebar onsidebarWidth={sidebarWidth} />
      </div>

      <div
        className="w-1 cursor-col-resize bg-slate-900 hover:bg-slate-700"
        onMouseDown={handleMouseDown}
      ></div>

      <Textbar />
    </div>
  );
};

*/

/*
const App = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [initialX, setInitialX] = useState(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    setInitialX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const offset = e.clientX - initialX;
      const newSidebarWidth = Math.max(100, sidebarWidth + offset);
      setSidebarWidth(newSidebarWidth);
      setInitialX(e.clientX);
    }
  };

  return (
    <div
      className="flex h-full"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div style={{ flexBasis: `${sidebarWidth}px` }}>
        <Sidebar onsidebarWidth={sidebarWidth} />
      </div>

      <div
        className="w-1 cursor-col-resize bg-slate-900 hover:bg-slate-700"
        onMouseDown={handleMouseDown}
      ></div>

      <Textbar />
    </div>
  );
};
*/


const initialState = {
  isResizing: false,
  sidebarWidth: 300,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START_RESIZE":
      return { ...state, isResizing: true };
    case "STOP_RESIZE":
      return { ...state, isResizing: false };
    case "RESIZE":
      return { ...state, sidebarWidth: Math.max(100, action.payload) };
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
      const newSidebarWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
      dispatch({ type: "RESIZE", payload: newSidebarWidth });
    }
  };

  return (
    <div
      className="flex h-full"
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
    >
      <div style={{ flexBasis: `${sidebarWidth}px` }} ref={sidebarRef}>
        <Sidebar onsidebarWidth={sidebarWidth}/>
      </div>

      <div
        className="w-1 cursor-col-resize bg-slate-900 hover:bg-slate-700"
        onMouseDown={mouseDownHandler}
      ></div>

      <Textbar />
    </div>
  );
};

export default App;