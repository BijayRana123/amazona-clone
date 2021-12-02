
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

function App() {
  return ( 
    <BrowserRouter >
          <div className="grid-container">
                      <header className="row">
                          <div>
                              <Link className="brand" to="/">amazona</Link>
                          </div>
                          <div>
                              <Link to="/cart">Cart</Link>
                              <Link to="/signin">Sign In</Link>
                          </div>
                      </header>

                      <main>
                        <Routes>
                          <Route path='/product/:id' element={<ProductScreen />} />
                          <Route path ='/' element={<HomeScreen />} />
                        </Routes>
                         
                      </main>

                      <footer className="row center">
                            All Rights reserved.
                      </footer>
          </div>
    </BrowserRouter>
  );
}

export default App;
