//import logo from './logo.svg';
import './App.css';
import TollEntry from './components/TollEntry';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import TollList from './components/TollList';

function App() {
  return (
    <div>
      <h4>Toll Management Application</h4>
      <hr className='line'/>
      <Router>
        <Switch>
          <Route exact path='/' component={TollEntry}/>
          <Route exact path='/tollList' component={TollList} />
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
