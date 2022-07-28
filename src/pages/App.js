import "../styles/App/App.css";
import Home from '../components/Home';
import NewMovie from '../components/NewMovie';
import EditMovie from '../components/EditMovie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from "../components/context/GlobalState";
import TopBar from "../components/TopBar";

function App() {
    return (
        <>
            <TopBar />
            <div className="wrapper">
                <GlobalProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/add" element={<NewMovie />} />
                            <Route path="/edit/:id" element={<EditMovie />} />
                        </Routes>
                    </BrowserRouter>
                </GlobalProvider>
            </div></>
    );
}

export default App;
