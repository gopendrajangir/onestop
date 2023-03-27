import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';

import Toasts from 'components/Toasts';

import HomePage from 'pages/Home';
import SearchPage from 'pages/Search';
import ProductPage from 'pages/Product';
import LoginPage from 'pages/LoginPage';
import PageNotFound from 'pages/PageNotFound';

import { ProductsContextProvider } from 'context/productsContext';
import { ProductContextProvider } from 'context/productContext';

import AuthenticatedRoutes from 'routes/AuthenticatedRoutes';
import Footer from 'components/Footer';

function App() {
  return (
    <div className="text-slate-800">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <NavigationBar className="relative z-30" />
                <div className="h-[calc(100vh-7rem)] relative overflow-y-auto bg-white">
                  <div className="min-h-full flex flex-col">
                    <Routes>
                      <Route path="" element={<HomePage />} />
                      <Route path="login/*" element={<LoginPage />} />
                      <Route
                        path="search"
                        element={
                          <ProductsContextProvider>
                            <SearchPage />
                          </ProductsContextProvider>
                        }
                      />
                      <Route
                        path="product/:id"
                        element={
                          <ProductContextProvider>
                            <ProductPage />
                          </ProductContextProvider>
                        }
                      />
                      <Route path="auth/*" element={<AuthenticatedRoutes />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </div>
                  <Footer />
                </div>
                <Toasts />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
