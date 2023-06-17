import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Navbar } from './components/Navbar';
import { Contact } from './pages/Contact';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route exact path="/" element={<Home/>}></Route>
                        <Route exact path="/about" element={<About />}></Route>
                        <Route exact path="/contacts" element={<Contact />}></Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
