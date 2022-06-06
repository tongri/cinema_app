import React from 'react'
import {Provider} from 'react-redux'
import {App} from './components/App'
import ReactDOM from 'react-dom/client'
import store from './_redux/store'
import 'bootstrap/dist/css/bootstrap.min.css';

const RootRender = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<RootRender />);
