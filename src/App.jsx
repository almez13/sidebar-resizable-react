import { useResizing } from "./hooks/useResizing";
import Sidebar from "./components/Sidebar";
import Textbar from "./components/Textbar";


const App = () => {
  const {
    sidebarWidth,
    textbarWidth,
    sidebarRef,
    mouseDownHandler,
    mouseUpHandler,
    mouseMoveHandler,
  } = useResizing();

  return (
    <div className="flex h-full" onMouseMove={mouseMoveHandler} onMouseUp={mouseUpHandler}>
      <div ref={sidebarRef} style={{ flex: `${sidebarWidth} 1 auto`, maxWidth: `${sidebarWidth * 100}%` }}>
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