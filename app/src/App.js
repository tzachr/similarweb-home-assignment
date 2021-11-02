import {useEffect } from "react";
import {socket} from "./services/socket";
import _ from "lodash";
import "./App.css";
import Layout from "./components/Layout/Layout";

function App() {
  useEffect(() => {
    socket.emit("init-client");
  }, []);

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
