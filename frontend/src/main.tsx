import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)} loading={null}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
