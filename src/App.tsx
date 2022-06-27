import React from "react";
import { Header, Cards } from "./components";

function App() {
  return (
    <div className='app'>
      <Header></Header>
      <div className='app__main'>
        <div className='container'>
          <Cards></Cards>
        </div>
      </div>
    </div>
  );
}

export default App;
