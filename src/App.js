///* in this project we are going to use a json serverto create a mock apiendpoint to serve this data on the backend */

//import icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Main from './components/Main';
import BackToTop from './components/BackToTop';

function App() {
  return  (
  <>
  <Header />
  <SideBar />
  <Main/>
  <BackToTop/>
  </>
  )
}

export default App;
