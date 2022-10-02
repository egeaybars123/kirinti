import React,{useState} from 'react';
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import './nav.css';
import logo from '../../assets/logo.png';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connector/injected';
import { useEffect, } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';


const Menu =()=>(
  
  <>
  
  
  </>
)
 
  const Nav = () => {
   const {active,account,activate,deactivate} = useWeb3React();
   async function connect() {
     try{
       await activate(injected);
     }catch(ex){
       console.log(ex);
     }
    }

   async function disconnect() {
      try {
        deactivate()
      } catch (ex) {
        console.log(ex)
      }
    }

    const [background, setBackground] = useState("#fdfdfd");
    const setStyle =  (background) => {
      setBackground(background);
    }
  
   const[toggleMenu,setToggleMenu] = useState(false);

  return (
    <div className="kirinti_navbar">
       <div className='kirinti_navbar-links'>
         <div className="kirinti_navbar-links_logo">
             <img src={logo} alt="logo"/>
         </div>
         
       
         <div className="kirinti_navbar-links_container">
           <Menu/>
         </div>
       </div>
      
          <div className='kirinti_navbar-sign'>
            <button onClick={() => {
              if (account) return;
              connect();
              }}
             type="button">   
             {account? "Connected" : "Connect"}{" "}
             </button>
           </div>
           
       
       
       < div className='kirinti_navbar-menu'>
         {toggleMenu
         ? <RiCloseLine color="#fff" size={27} onClic={()=>setToggleMenu(false)}/>
         : <RiMenu3Line color="#fff" size={27} onClic={()=>setToggleMenu(true)}/>
         }
         {toggleMenu &&(
           <div className='kirinti_navbar-menu_container scale-up-center'> 
              <div className='kirinti_navbar-menu-container-links'> 
               <Menu/>
               <div className='kirinti_navbar-menu_container-links-sign'>
                 
                <button onClick={connect} type="button">Launch App</button>
               </div>
              </div> 
           </div>

          
         )}
           
       </div>
    </div>
  )}

export default Nav