import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path="/:query">
                    <App />
                </Route>
                <Route path="/" component={App} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
