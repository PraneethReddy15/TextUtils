import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import Alert from './components/Alert';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  }
  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} key={new Date()} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route path='/about' element={<About mode={mode} />} />
            <Route path='*' element={<TextForm showAlert={showAlert} heading="Try TextUtils - Your Ultimate Text Processing Companion" mode={mode} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

// {<Router>
//         <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} key={new Date()} />
//         <Alert alert={alert} />
//         <div className="container my-3">
//           <Routes>
//             {/* /users --> Component 1
//         /users/home --> Component 2 */}
//             <Route path='/' element={<About />}>
//               <About mode={mode} />
//             </Route>
//             <Route path="/">
//               <TextForm showAlert={showAlert} heading="Try TextUtils - word counter, character counter, remove extra spaces" mode={mode} />
//             </Route>
//           </Routes>
//         </div>
//       </Router>}