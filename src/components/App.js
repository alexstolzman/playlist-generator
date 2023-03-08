import logo from '../logo.svg';
import '../App.css';
import './SignIn'
import SignIn from './SignIn';
import Search from './Search';

function App() {
  return (
    <div className="App">
    <Search/>
      <SignIn/>
    </div>
  );
}

export default App;
