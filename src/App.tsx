import { Home } from "./components/Home";
import React from "react";

function App(): JSX.Element {
  return (
    <div className="App w-screen h-screen mx-auto bg-green-100 md:bg-red-100 lg:bg-blue-100 flex justify-center">
      <Home />
    </div>
  );
}

export default App;
