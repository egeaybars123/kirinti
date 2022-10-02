import React, {useState, useEffect} from 'react';
import './whatx.css';
import Web3 from "web3";
import tokenABI from "../../contracts/tokenABI.json";
import poolABI from "../../contracts/PoolABI.json";

const poolContract = "0x5555ef27212859e01155ab407046a74e76293cc8";

const WhatX = () => {

  useEffect(() => {
    // Update the document title using the browser API
    getBalance();
  });

  const [balanceUSDT, setBalanceUSDT] = useState("0");
  const [balanceUSDC, setBalanceUSDC] = useState("0");
  const [balanceWAVAX, setBalanceWAVAX] = useState("0");
  //const [balance, setBalance] = useState("0");
  
  let web3 = new Web3(Web3.givenProvider);
  
  const contractUSDT = new web3.eth.Contract(tokenABI, "0x791B0c848AD79549F950f69E6E4CF9e3C112a230");
  const contractUSDC = new web3.eth.Contract(tokenABI, "0x8c0f5Ade9cBdb19a49B06aDFB67b6702B459162B");
  const contractWAVAX = new web3.eth.Contract(tokenABI, "0xd00ae08403B9bbb9124bB305C09058E32C39A48c");

  const getBalance = async () => {
    const balanceUSDT = await contractUSDT.methods.balanceOf(poolContract).call();
    const balanceUSDC = await contractUSDC.methods.balanceOf(poolContract).call();
    const balanceWAVAX = await contractWAVAX.methods.balanceOf(poolContract).call();

    setBalanceUSDT(web3.utils.fromWei(balanceUSDT) * 10**12);
    setBalanceUSDC(web3.utils.fromWei(balanceUSDC) * 10**12);
    setBalanceWAVAX(web3.utils.fromWei(balanceWAVAX));
  }

  const approveUSDT = async () => {
    const accounts = await web3.eth.getAccounts();
    await contractUSDT.methods.approve(poolContract, 30000).send({from: accounts[0]});

    const contractPool = new web3.eth.Contract(poolABI, poolContract); 

    await contractPool.methods.depositTokens(30000, 2).send({from: accounts[0]});
  }

  const approveUSDC = async () => {
    const accounts = await web3.eth.getAccounts();
    await contractUSDC.methods.approve(poolContract, 5000).send({from: accounts[0]});

    const contractPool = new web3.eth.Contract(poolABI, poolContract); 

    await contractPool.methods.depositTokens(5000, 0).send({from: accounts[0]});
  }

  const approveWAVAX = async () => {
    const accounts = await web3.eth.getAccounts();
    await contractWAVAX.methods.approve(poolContract, 1000000000000000).send({from: accounts[0]});

    const contractPool = new web3.eth.Contract(poolABI, poolContract); 

    await contractPool.methods.depositTokens(1000000000000000, 1).send({from: accounts[0]});
  }


  return (
    <div className='LaunchingProjects-Container'>
      <div className='LaunchingProjects__Background__Wrapper'>
        <div className='LaunchingProjects'>
          <div className='LaunchpadProjects-Header'>
            <div className='ProjectsGrid'>
              <div className='LaunchpadProject'>
                <div className='LaunchpadProject-Head'>
                  <div className='LaunchpadProject-Head-Text'>
                   <h3 class="LaunchpadProject-Head-Text--Title">S.O.S Chain</h3>

                  </div>
                </div>
                <div className='LaunchpadProject-Body'>
                  <div className='LaunchpadProject-Body--Top'>
                    <div class="LaunchpadProject-Body--Top--Raised"> 
                      <p class="LaunchpadProject-Body--Top--Raised--Para">Toplanan Miktar</p>
                      <h4 class="LaunchpadProject-Body--Top--Raised--Price"><span>{balanceUSDT}</span> USDT</h4>
                      <h4 class="LaunchpadProject-Body--Top--Raised--Price"><span>{balanceUSDC}</span> USDC</h4>
                      <h4 class="LaunchpadProject-Body--Top--Raised--Price"><span>{balanceWAVAX}</span> WBTC.e</h4>
                    
                    </div>
                  </div>
                  <div className='StatsSection LaunchpadProject-Body--Info'>
                    <div className='Row'>
                    <span class="Row-Left"><p>Bağışçı</p></span>
                    <span class="Row-Line"></span>
                    <span><h3 className='font-weight'>3,069</h3></span>
                    </div>
                    <div className='Row'>
                    <span class="Row-Left"><p>Başlangıç<br/>  Tarihi</p></span>
                    <span class="Row-Line"></span>
                    <span><h3 className='font-weight'>08.21.2022</h3></span>

                    </div>

                  </div>
                  <div className='ProjectFooter LaunchpadProject-Body--LaunchInfo'>
                    <button id="search-button" onClick={approveWAVAX}>
                      <svg width="64px" height="64px" viewBox="0.004 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z" fill="#f7931a"/><path d="M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z" fill="#fff"/></svg>
                    </button>
                    <button id="search-button" onClick={approveUSDT}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" width="64" height="64"><path d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.24,2000,1000,2000,0,1552.38,0,1000,447.68,0,1000,0" fill="#53ae94"/><path d="M1123.42,866.76V718H1463.6V491.34H537.28V718H877.5V866.64C601,879.34,393.1,934.1,393.1,999.7s208,120.36,484.4,133.14v476.5h246V1132.8c276-12.74,483.48-67.46,483.48-133s-207.48-120.26-483.48-133m0,225.64v-0.12c-6.94.44-42.6,2.58-122,2.58-63.48,0-108.14-1.8-123.88-2.62v0.2C633.34,1081.66,451,1039.12,451,988.22S633.36,894.84,877.62,884V1050.1c16,1.1,61.76,3.8,124.92,3.8,75.86,0,114-3.16,121-3.8V884c243.8,10.86,425.72,53.44,425.72,104.16s-182,93.32-425.72,104.18" fill="#fff"/></svg>
                    </button>
                    <button id="search-button" onClick={approveUSDC}>
                    <svg width="64px" height="64px" data-name="86977684-12db-4850-8f30-233a7c267d11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"><path d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z" fill="#2775ca"/><path d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z" fill="#fff"/><path d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zM1229.17 295.83c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z" fill="#fff"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='ProjectsGrid'>
              <div className='LaunchpadProject'>
                <div className='LaunchpadProject-Head'>
                  <div className='LaunchpadProject-Head-Text'>
                   <h3 class="LaunchpadProject-Head-Text--Title">LÖSEV</h3>

                  </div>
                </div>
                <div className='LaunchpadProject-Body'>
                  <div className='LaunchpadProject-Body--Top'>
                    <div class="LaunchpadProject-Body--Top--Raised"> 
                      <p class="LaunchpadProject-Body--Top--Raised--Para">Toplanan Miktar</p>
                      <h4 class="LaunchpadProject-Body--Top--Raised--Price"><span>{balanceUSDT}</span> USDT</h4>
                      <h4 class="LaunchpadProject-Body--Top--Raised--Price"><span>{balanceUSDC}</span> USDC</h4>
                      <h4 class="LaunchpadProject-Body--Top--Raised--Price"><span>{balanceWAVAX}</span> WBTC.e</h4>
                    
                    </div>
                  </div>
                  
                  <div className='StatsSection LaunchpadProject-Body--Info'>
                    <div className='Row'>
                    <span class="Row-Left"><p>Bağışçı</p></span>
                    <span class="Row-Line"></span>
                    <span><h3 className='font-weight'>3,069</h3></span>
                    </div>
                    <div className='Row'>
                    <span class="Row-Left"><p>Başlangıç<br/>  Tarihi</p></span>
                    <span class="Row-Line"></span>
                    <span><h3 className='font-weight'>08.21.2022</h3></span>

                    </div>

                  </div>
                  <div className='ProjectFooter LaunchpadProject-Body--LaunchInfo'>
                    <button id="search-button" onClick={approveWAVAX}>
                      <svg width="64px" height="64px" viewBox="0.004 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z" fill="#f7931a"/><path d="M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z" fill="#fff"/></svg>
                    </button>
                    <button id="search-button" onClick={approveUSDT}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" width="64" height="64"><path d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.24,2000,1000,2000,0,1552.38,0,1000,447.68,0,1000,0" fill="#53ae94"/><path d="M1123.42,866.76V718H1463.6V491.34H537.28V718H877.5V866.64C601,879.34,393.1,934.1,393.1,999.7s208,120.36,484.4,133.14v476.5h246V1132.8c276-12.74,483.48-67.46,483.48-133s-207.48-120.26-483.48-133m0,225.64v-0.12c-6.94.44-42.6,2.58-122,2.58-63.48,0-108.14-1.8-123.88-2.62v0.2C633.34,1081.66,451,1039.12,451,988.22S633.36,894.84,877.62,884V1050.1c16,1.1,61.76,3.8,124.92,3.8,75.86,0,114-3.16,121-3.8V884c243.8,10.86,425.72,53.44,425.72,104.16s-182,93.32-425.72,104.18" fill="#fff"/></svg>
                    </button>
                    <button id="search-button" onClick={approveUSDC}>
                    <svg width="64px" height="64px" data-name="86977684-12db-4850-8f30-233a7c267d11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"><path d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z" fill="#2775ca"/><path d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z" fill="#fff"/><path d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zM1229.17 295.83c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z" fill="#fff"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='ProjectsGrid'>
              <div className='LaunchpadProject'>
                <div className='LaunchpadProject-Head'>
                  <div className='LaunchpadProject-Head-Text'>
                   <h3 class="LaunchpadProject-Head-Text--Title">TEMA Vakfı</h3>

                  </div>
                </div>
                <div className='LaunchpadProject-Body'>
                  <div className='LaunchpadProject-Body--Top'>
                    <div class="LaunchpadProject-Body--Top--Raised"> 
                      <p class="LaunchpadProject-Body--Top--Raised--Para">Toplanan Miktar</p>
                      <h4 class="LaunchpadProject-Body--Top--Raised--Price"><span>{balanceUSDT}</span> USDT</h4>
                      <h4 class="LaunchpadProject-Body--Top--Raised--Price"><span>{balanceUSDC}</span> USDC</h4>
                      <h4 class="LaunchpadProject-Body--Top--Raised--Price"><span>{balanceWAVAX}</span> WBTC.e</h4>
                    
                    </div>
                  </div>
                  
                  <div className='StatsSection LaunchpadProject-Body--Info'>
                    <div className='Row'>
                    <span class="Row-Left"><p>Bağışçı</p></span>
                    <span class="Row-Line"></span>
                    <span><h3 className='font-weight'>3,069</h3></span>
                    </div>
                    <div className='Row'>
                    <span class="Row-Left"><p>Başlangıç<br/>  Tarihi</p></span>
                    <span class="Row-Line"></span>
                    <span><h3 className='font-weight'>08.21.2022</h3></span>

                    </div>

                  </div>
                  <div className='ProjectFooter LaunchpadProject-Body--LaunchInfo'>
                    <button id="search-button" onClick={approveWAVAX}>
                      <svg width="64px" height="64px" viewBox="0.004 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z" fill="#f7931a"/><path d="M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z" fill="#fff"/></svg>
                    </button>
                    <button id="search-button" onClick={approveUSDT}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" width="64" height="64"><path d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.24,2000,1000,2000,0,1552.38,0,1000,447.68,0,1000,0" fill="#53ae94"/><path d="M1123.42,866.76V718H1463.6V491.34H537.28V718H877.5V866.64C601,879.34,393.1,934.1,393.1,999.7s208,120.36,484.4,133.14v476.5h246V1132.8c276-12.74,483.48-67.46,483.48-133s-207.48-120.26-483.48-133m0,225.64v-0.12c-6.94.44-42.6,2.58-122,2.58-63.48,0-108.14-1.8-123.88-2.62v0.2C633.34,1081.66,451,1039.12,451,988.22S633.36,894.84,877.62,884V1050.1c16,1.1,61.76,3.8,124.92,3.8,75.86,0,114-3.16,121-3.8V884c243.8,10.86,425.72,53.44,425.72,104.16s-182,93.32-425.72,104.18" fill="#fff"/></svg>
                    </button>
                    <button id="search-button" onClick={approveUSDC}>
                    <svg width="64px" height="64px" data-name="86977684-12db-4850-8f30-233a7c267d11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"><path d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z" fill="#2775ca"/><path d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z" fill="#fff"/><path d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zM1229.17 295.83c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z" fill="#fff"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatX