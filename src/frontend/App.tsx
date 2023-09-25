import React from "react";
import Container from 'react-bootstrap/Container';
import RegistrationForm from "./components/RegistrationComponent";
import LoginForm from "./components/LoginComponent";
import ProfileComponent from "./components/ProfileComponent";
import { useState } from "react";


const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegistration(false);
    setShowProfile(false);
  };

  const handleRegistrationClick = () => {
    setShowLogin(false);
    setShowRegistration(true);
    setShowProfile(false);
  };

  const handleProfileClick = () => {
    setShowLogin(false);
    setShowRegistration(false);
    setShowProfile(true);
  };

  return (
    <Container>
      <h1>Workfully Sample App</h1>
      <p>Please choose section 1</p>
      <div>
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleRegistrationClick}>Registration</button>
        <button onClick={handleProfileClick}>Profile</button>
      </div>

      {showLogin && (
        <div>
          <LoginForm
            showRegistration={function (): void {
              handleRegistrationClick();
            }
            }
            showProfile={function (): void {
              handleProfileClick()
            }} />
        </div>
      )}

      {showRegistration && (
        <div>
          <RegistrationForm showLogin={function (): void {
            handleLoginClick();
          }} />
        </div>
      )}

      {showProfile && (
        <div>
          <ProfileComponent showLogin={function (): void {
            handleLoginClick();
          }} />
        </div>
      )}
    </Container>
  );

};

export default App;