import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import { Toaster } from 'react-hot-toast';

/**
 * Renders the main application component.
 * @returns {JSX.Element} The rendered application component.
 */
function Collabor8() {
    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88'
                            }
                        }
                    }} >
                </Toaster>
            </div>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/editor/:roomId" element={<EditorPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Collabor8;