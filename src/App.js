import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'; 
import Home from './Components/Home';
import Chooser from './Components/Chooser';
import CustomerLogin from './CustomerComponents/CustomerPages/CustomerLogin';
import CustomerSignup from './CustomerComponents/CustomerPages/CustomerSignup';
import CustomerAddOrder from './CustomerComponents/CustomerPages/CustomerAddOrder';
import CustomerMyOrders from './CustomerComponents/CustomerPages/CustomerMyOrders';
import CustomerMyOrdersDetails from './CustomerComponents/CustomerPages/CustomerMyOrderDetails';
import CustomerForgotPassword from './CustomerComponents/CustomerForgotPassword';
import SupplierLogin from './SupplierComponents/SupplierPages/SupplierLogin';
import SupplierSignup from './SupplierComponents/SupplierPages/SupplierSignup';
import SupplierMyOrders from './SupplierComponents/SupplierPages/SupplierMyOrders';
import SupplierMyOrdersDetails from './SupplierComponents/SupplierPages/SupplierMyOrderDetails';
import AdminLogin from './AdminComponents/AdminPages/AdminLogin';
import AdminSignup from './AdminComponents/AdminPages/AdminSignup';
import AdminCustomerOrders from './AdminComponents/AdminPages/AdminCustomerOrders';
import AdminCustomerOrdersDetails from './AdminComponents/AdminPages/AdminCustomerOrderDetails';
import AdminSuppliers from './AdminComponents/AdminPages/AdminSuppliers';
import AdminSupplierOrder  from './AdminComponents/AdminPages/AdminSupplierOrder';
import AdminSupplierMyOrdersView from './AdminComponents/AdminPages/AdminSupplierMyOrdersView';
import AdminAddStocks from './AdminComponents/AdminPages/AdminAddStocks';
import AdminStocksView from './AdminComponents/AdminPages/AdminStocks';
import AdminStockUpdate from './AdminComponents/AdminPages/AdminStocksUpdate';
import AdminPayments from './AdminComponents/AdminPages/AdminPayments';
import AdminAddPayment from './AdminComponents/AdminPages/AdminAddPayment';
import AdminPaymentUpdate from './AdminComponents/AdminPages/AdminPaymentsUpdate';

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [supplierAuth, setSupplierAuth] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  const [adminAuth, setAdminAuth] = useState(false);

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chooseuser' element={<Chooser/>}/>
        <Route path='/customerlogin' element={<CustomerLogin setIsAuth={setIsAuth}/>}/>
        <Route path='/customersignup' element={<CustomerSignup setIsAuth={setIsAuth}/>}/>
        <Route path='/customeraddorder' element={<CustomerAddOrder isAuth={isAuth}/>}/>
        <Route path='/customermyorders' element={<CustomerMyOrders isAuth={isAuth}/>}/>
        <Route path='/customermyorderdetails' element={<CustomerMyOrdersDetails isAuth={isAuth}/>}/>
        <Route path='/customerforgotpassword' element={<CustomerForgotPassword/>}/>
        <Route path='/supplierlogin' element={<SupplierLogin setSupplierAuth={setSupplierAuth} setSupplierId={setSupplierId}/>}/>
        <Route path='/suppliersignup' element={<SupplierSignup adminAuth={adminAuth}/>}/>
        <Route path='/suppliermyorders' element={<SupplierMyOrders supplierAuth={supplierAuth} supplierId={supplierId}/>}/>
        <Route path='/suppliermyorderdetails' element={<SupplierMyOrdersDetails supplierAuth={supplierAuth}/>}/>
        <Route path='/adminlogin' element={<AdminLogin setAdminAuth={setAdminAuth}/>}/>
        <Route path='/adminsignup' element={<AdminSignup adminAuth={adminAuth}/>}/>
        <Route path='/admincustomerorders' element={<AdminCustomerOrders adminAuth={adminAuth}/>}/>
        <Route path='/admincustomerorderdetails' element={<AdminCustomerOrdersDetails adminAuth={adminAuth}/>}/>
        <Route path='/adminsuppliers' element={<AdminSuppliers adminAuth={adminAuth}/>}/>
        <Route path='/adminsupplierorder' element={<AdminSupplierOrder adminAuth={adminAuth}/>}/>
        <Route path='/adminsuppliermyordersview' element={<AdminSupplierMyOrdersView adminAuth={adminAuth}/>}/>
        <Route path='/adminaddstocks' element={<AdminAddStocks adminAuth={adminAuth}/>}/>
        <Route path='/adminstocksview' element={<AdminStocksView adminAuth={adminAuth}/>}/>
        <Route path='/adminstockupdate' element={<AdminStockUpdate adminAuth={adminAuth}/>}/>
        <Route path='/adminpayments' element={<AdminPayments adminAuth={adminAuth}/>}/>
        <Route path='/adminaddpayments' element={<AdminAddPayment adminAuth={adminAuth}/>}/>
        <Route path='/adminpaymentupdate' element={<AdminPaymentUpdate adminAuth={adminAuth}/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
