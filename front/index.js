// module
import React from "react";
import ReactDom from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import {hot} from 'react-hot-loader/root';
import rootReducer from "./src/redux/index";
import {CookiesProvider} from "react-cookie";


// component
import App from "./src/App";

// Saga
import createSagaMiddleware from "redux-saga";
import rootSaga from "./src/saga/rootSaga";

// Logger
import logger from "redux-logger";

const Hot = hot(App);
const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleWare)));
sagaMiddleWare.run(rootSaga);
ReactDom.render(
        <Provider store={store}>
            <Router>
                <CookiesProvider>
                    <Hot/>
                </CookiesProvider>
            </Router>
        </Provider>
    , document.querySelector('.root'));