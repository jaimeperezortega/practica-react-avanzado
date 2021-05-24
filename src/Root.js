import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './components/app';
import {Provider} from 'react-redux';
import {store} from './index';

const Root = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
      </React.StrictMode>
    )
}

export default Root
