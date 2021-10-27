import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GamePage from './pages/GamePage';
import ScorePage from './pages/ScorePage';
import StartPage from './pages/StartPage';

import './App.css';

function App() {
   return (
      <BrowserRouter>
         <Switch>
            <Route path='/' component={StartPage} exact />
            <Route path='/game' component={GamePage} />
            <Route path='/score' component={ScorePage} />
         </Switch>
      </BrowserRouter>
   );
}

export default App;
