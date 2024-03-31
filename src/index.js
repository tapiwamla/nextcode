import { React, LandingPage, EditorPage, ReactDOM, BrowserRouter, Routes, Route, Toaster } from './imports';
import './index.css'; 

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
          }} 
        />
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/editor/:roomId" element={<EditorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

ReactDOM.render(<Collabor8 />, document.getElementById('root'));
