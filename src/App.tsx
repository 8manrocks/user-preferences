import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import LoginModal from "./components/LoginModal";
import { Constants } from "./utils/constants";
import API from "./utils/httpClient";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("red");
  useEffect(() => {
    API.get(Constants.LOGGEDIN_ENDPOINT)
      .then((r) => setIsLoggedIn(true))
      .catch((e) => setIsLoggedIn(false));
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      API.get(Constants.PREFS_ENDPOINT)
        .then(({ data }) => {
          setPrimaryColor(data.primaryColor);
        })
        .catch((e) => alert(e));
    }
  }, [isLoggedIn]);
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
  }, [primaryColor]);
  const signout = async () => {
    await API.get(Constants.LOGOUT_ENDPOINT);
    setIsLoggedIn(false);
  };
  const savePrefs = async () => {
    try {
      await API.put(Constants.PREFS_ENDPOINT, { primaryColor });
    } catch (e: any) {
      alert(e.error);
    }
  };
  return (
    <div className="App">
      {!isLoggedIn && <LoginModal onLoginSuccess={() => setIsLoggedIn(true)} />}
      <Header onColorChange={setPrimaryColor} />
      {isLoggedIn && (
        <>
          <button onClick={() => signout()}>Sign out</button>
          <button onClick={() => savePrefs()}>Save Preferences</button>
        </>
      )}
    </div>
  );
};

export default App;
