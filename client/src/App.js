import './App.css';

import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Dumy1 from './Dumy1'
import Dumy2 from './Dumy2'



function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
           <Route path="/dumy1" element={<Dumy1/>}/>
          <Route path="/dumy2" element={<Dumy2/>}/>
        </Routes>
      </Router>
      
     

      </header>
    </div>
  );
}
// Using db.json as a server for mockData .To run server use command :npx json-server --watch db.json

export default App;






