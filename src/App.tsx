import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header/Header';
import Game1Page from './pages/Game1Page/Game1Page';
import Game2Page from './pages/Game2Page/Game2Page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/1' element={<Game1Page/>}/>
          <Route path='/2' element={<Game2Page/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;