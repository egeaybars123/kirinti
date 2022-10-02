import React from 'react'
import './header.css'
import token from '../../assets/token.png';


const Header = () => {
  return (
    <div className='kirinti_header section_padding' id="home">
       <div className='kirinti_header-content'>
         <h1 className='gradient_text'>Kırıntı sayesinde cüzdanlarınızda kalan "kırıntıları" süpürüyoruz.</h1>
         <p>Avalanche C-Chain üzerinde yaklaşık olarak 3.5M adres bulunmakta ve bir çok cüzdanda küçük miktarlarda işe yaramaz tokenler bulunmakta "KIRINTI" sayesinde bu tokenlardan kurtulmanın yanında bağış atabileceksiniz.</p>
       </div>
     <div className='kirinti_header-image'>
       <img src={token} alt="token"/>
     </div>
    </div> 
  ) 
}

export default Header