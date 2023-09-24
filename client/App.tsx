import React from "react";
import LoginForm from "./LoginForm";

const App: React.FC = () => {
  return (
    <div>
      <h1>Workfully Sample App</h1>
      <p>You can register here</p>
      <LoginForm />
    </div>
  );
};

export default App;