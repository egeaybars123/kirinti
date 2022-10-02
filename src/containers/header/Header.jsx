import React from 'react'
import './header.css'
import token from '../../assets/token.png';


const Header = () => {
  return (
    <div className='kirinti_header section_padding' id="home">
       <div className='kirinti_header-content'>
         <h1 className='gradient_text'>Kırıntı sayesinde cüzdanlarınızda kalan "kırıntıları" süpürüyoruz.</h1>
         <p>Bugünün 'kırıntı'ları yarının projelerini inşa edecek! Cüzdanınızda bulunan, küçük miktarda ve kullanılmayan tokenlerinizi AVAX'a dönüştürmek ister misiniz?  "kırıntı" sayesinde bu tokenlardan kurtulmanın yanında çeşitli projelere ve kurumlara bağış yapabilirsiniz.</p>
       </div>
     <div className='kirinti_header-image'>
       <img src={token} alt="token"/>
     </div>
    </div> 
  ) 
}

export default Header