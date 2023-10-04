import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProductListing from './routes/ProductListing';
import { CART, CHECKOUT, HOME, LOGIN, PROFILE, THANK_YOU, } from './constants/links';
import Catogeries from './routes/Catogeries';
import ProductPage from './routes/ProductPage';
import Cart from './routes/Cart';
import Profile from './routes/Profile';
import { useSelector } from 'react-redux';
import { IReduxState } from './constants/interfaces';
import Loader from './components/Loader';
import Checkout from './routes/Checkout';
import ThankYou from './routes/ThankYou';
import ResponsiveNavBar from './components/NavigationBar';
function App() {
  const isLoading = useSelector((state: IReduxState) => state.Loader)
  const isUnAuthorized = useSelector((state: IReduxState) => state.UserId) === 0;
  if (isUnAuthorized) {
    return <Navigate to={LOGIN.to} />
  }
  return (
    <>
      <ResponsiveNavBar />
      <Loader />
      <Routes>
        <Route path={PROFILE.to} element={<Profile />} />
        <Route path={CHECKOUT.to} element={<Checkout />} />
        <Route path={CART.to} element={<Cart />} />
        <Route path={HOME.to} element={<Catogeries />} />
        <Route path={THANK_YOU.to} element={<ThankYou />} />
        <Route path={`${HOME.to}/:category`} element={<ProductListing />} />
        <Route path={`${HOME.to}/:category/:productId`} element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
