import React,{ useState,useEffect } from "react";
import { Link } from 'react-router-dom' 
import { useContext } from 'react';
import {AuthContext} from './../../context/AuthContext';
import AllOrder from "./AllOrder";
import CookOrder from "./CookOrder";
import ReadyOrder from "./ReadyOrder";
import Users from "./Users";
import Crypto from "../Crypto";
import AddProduct from "./AddProduct";
import Swal from 'sweetalert2';
import { client } from './waiterClient'; 
import BlockOrder from "./BlockOrder";

const componentMap = {
    showComponent1: () => <AllOrder />,
    showComponent2: () => <CookOrder />,
    showComponent3: () => <ReadyOrder />,
    showComponent4: () => <Users />,
    showComponent5: () => <Crypto />,
    showComponent6: () => <AddProduct />,
    showComponent7: () => <BlockOrder />,
    
};

const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState({});
  const [activeComponent, setActiveComponent] = useState(null);

  const handleComponentChange = (componentKey) => {
    setActiveComponent(componentKey);
  };

  useEffect(() => {
  if(user.role == "waiter"){
    client.onmessage = function(e) {
      if (typeof e.data === 'string') {
        setMessage(e.data);
        Swal.fire(message);
      }
    };
  }
  else{
  }
    return () => {
      client.onmessage = null;
    };

  }, [message]);
  



return(
   <>
     <>
  {/* Page Wrapper */}
  <div id="wrapper">
    {/* Sidebar */}
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">
           Табло за управление
        </div>
      </a>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Роля-{user.role}</span>
        </a>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">Interface</div>

      
      {/* Nav Item - Utilities Collapse Menu */}
      <li className="nav-item">
      {user && (
                  <>
                   {user.role == "waiter" && (
                    <>
      <li className="nav-item">
        <Link className="nav-link" onClick={() => handleComponentChange('AllOrder')}>
          <i className="fas fa-fw fa-table" />
          <span>Нови поръчки</span>
        </Link>
      </li>
        <li className="nav-item">
        <Link className="nav-link" onClick={() => handleComponentChange('ReadyOrder')}>
         <i className="bi bi-list-ul" />
         <span>Готови поръчки</span>
       </Link>
     </li>
     <li className="nav-item">
        <Link className="nav-link" onClick={() => handleComponentChange('BlockOrder')}>
         <i className="bi bi-list-ul" />
         <span>Блокирани поръчки</span>
       </Link>
     </li>
     <li className="nav-item">
         <Link className="nav-link" onClick={() => handleComponentChange('Users')}>
          <i className="bi bi-person-circle" />
          <span>Потребители</span>
        </Link>
      </li>
      <li className="nav-item">
         <Link className="nav-link" onClick={() => handleComponentChange('Crypto')}>
          <i className="bi bi-plus-square" />
          <span>Qr код</span>
        </Link>
      </li>
      <li className="nav-item">
         <Link className="nav-link" onClick={() => handleComponentChange('AddProduct')}>
          <i className="bi bi-journal-text" />
          <span>Продукти</span>
        </Link>
      </li>
     </>
        )}
        {user.role == "admin"  && (
      <li className="nav-item">
         <Link className="nav-link" onClick={() =>  handleComponentChange('CookOrder')}>
          <i className="bi bi-person-circle" />
          <span>Нови поръчки</span>
        </Link>
      </li>
        )}
         </>
             )}
     
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
     
     
     
    </ul>
    {/* End of Sidebar */}
    {/* Content Wrapper */}
    <div id="content-wrapper" className="d-flex flex-column">
      {/* Main Content */}
      <div id="content">
        {/* Topbar */}
        <hr className="sidebar-divider my-0" />
        {/* End of Topbar */}
        {/* Begin Page Content */}
        <div className="container-fluid">
          {/* Page Heading */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
           
           
           
              
          </div>
          {/* Content Row */}
          <div className="row">
            {/* Earnings (Monthly) Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Earnings (Monthly)
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        $40,000
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Earnings (Monthly) Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Earnings (Annual)
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        $215,000
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Earnings (Monthly) Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                        Tasks
                      </div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                            50%
                          </div>
                        </div>
                        <div className="col">
                          <div className="progress progress-sm mr-2">
                            <div
                              className="progress-bar bg-info"
                              role="progressbar"
                              style={{ width: "50%" }}
                              aria-valuenow={50}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pending Requests Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Pending Requests
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        18
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-comments fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

       
          {activeComponent === 'AllOrder' && <AllOrder />}
          {activeComponent === 'ReadyOrder' && <ReadyOrder />}
          {activeComponent === 'CookOrder' && <CookOrder />}
          {activeComponent === 'Users' && <Users />}
          {activeComponent === 'Crypto' && <Crypto />}
          {activeComponent === 'AddProduct' && <AddProduct />}
          {activeComponent === 'BlockOrder' && <BlockOrder />}

        



        </div>
      </div>
      {/* End of Main Content */}
    
    </div>
    {/* End of Content Wrapper */}
  </div>
  {/* End of Page Wrapper */}
  {/* Scroll to Top Button*/}
  
</>

    
        </>
);
};
export default DashBoard;