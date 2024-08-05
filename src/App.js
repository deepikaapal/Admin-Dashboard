///* in this project we are going to use a json serverto create a mock apiendpoint to serve this data on the backend */

//import icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
// import navList from './data/navItem';
import Main from './components/Main';

function App() {
  return  (<>
  <Header />
  <SideBar />
  <Main/>
  </>);
}

export default App;
