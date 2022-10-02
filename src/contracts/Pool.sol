//SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IJoeRouter01.sol";

//Joe Router: 0xd7f655E3376cE2D7A2b08fF01Eb3B1023191A901
//Joe Factory: 0xF5c7d9733e5f53abCC1695820c4818C59B457C2C

/*

Chainlink Price Feeds Contract Addresses in Fuji Testnet

//USDC: 0x7898AcCC83587C3C55116c5230C17a6Cd9C71bad
//UNI: 0x7b219F57a8e9C7303204Af681e9fA69d17ef626f
//BTC: 	0x31CF013A08c6Ac228C94551d535d5BAfE19c602a

*/

interface IWrappedAvax {
    function withdraw(uint wad) external payable;
}

interface IERC20Extended {
    function decimals() external returns (uint256);
}

contract Pool is Ownable, KeeperCompatible {

    AggregatorV3Interface internal priceFeed;

    //Chainlink Price Feeds
    address[3] public priceFeeds = [
        0x7b219F57a8e9C7303204Af681e9fA69d17ef626f, // BTC/USD
        0x5498BB86BC934c8D34FDA08E81D444153d0D06aD, // AVAX/USD
        0x7898AcCC83587C3C55116c5230C17a6Cd9C71bad // USDT/USD
    ];

    address[3] public tokenAddresses = [
        0x8c0f5Ade9cBdb19a49B06aDFB67b6702B459162B, //USDC (will be used as WBTC for testing purposes) (FUJI)
        0xd00ae08403B9bbb9124bB305C09058E32C39A48c, //Wrapped AVAX (FUJI)
        0x791B0c848AD79549F950f69E6E4CF9e3C112a230 //USDT (FUJI)
    ];

    //Pre-determined addresses that will receive the donations equally
    address[] public donationList = [
        0xc3a3877197223e222F90E3248dEE2360cAB56D6C,
        0xffd0f6289B011C346Da10417B925Aa08a64Aa097,
        0x0010675ab6235F2499Db2eA009Fd1901C4FBB65b
    ];

    function depositTokens(uint amount, uint index) public {
        address tokenAddr = tokenAddresses[index];
        uint decimal = IERC20Extended(tokenAddr).decimals();
        int price = getLatestPrice(index);
        uint kirinti = uint(price) * (amount / 10 ** decimal);
        require(kirinti <= 10, "Sent value too high");

        IERC20(tokenAddresses[index]).transferFrom(msg.sender, address(this), amount);
    }

    function swapTokens(uint index, uint amountOutMin) public onlyOwner { 
        address tokenAddr = tokenAddresses[index];
        address JoeRouter = 0xd7f655E3376cE2D7A2b08fF01Eb3B1023191A901; 
        uint amountIn = IERC20(tokenAddr).balanceOf(address(this));
        require(IERC20(tokenAddr).approve(JoeRouter, amountIn), 'approve failed.');

        address[] memory path = new address[](2);
        path[0] = tokenAddr;
        path[1] = 0xd00ae08403B9bbb9124bB305C09058E32C39A48c; //Wrapped AVAX contract address
        IJoeRouter01(JoeRouter).swapExactTokensForAVAX(amountIn, amountOutMin, path, address(this), block.timestamp);
    }

    function convertWrappedAvax() external onlyOwner {
        address tokenAddr = tokenAddresses[1];
        uint wrappedBalance = IERC20(tokenAddr).balanceOf(address(this));
        IWrappedAvax(tokenAddr).withdraw(wrappedBalance);
    }

    function transferAvaxDonations() external onlyOwner {
        uint donation_count = donationList.length;
        uint AvaxDonationPerParticipants = address(this).balance / donation_count;

        for (uint i=0; i < donation_count; i++) {
           (bool sent, )=address(donationList[i]).call{value: AvaxDonationPerParticipants}("");
           require(sent, "AVAX not sent");
        }
    }

    function getLatestPrice(uint index) public view returns (int) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = AggregatorV3Interface(priceFeeds[index]).latestRoundData();
        return price;
    }
    
    //returns the value of the tokens in the contract
    //calls Chainlink Price Feeds for price retrieval
    function getTokenValue(uint index) public returns (uint) {
        address tokenAddr = tokenAddresses[index];
        uint decimal = IERC20Extended(tokenAddr).decimals();
        uint value = (uint(getLatestPrice(index)) * IERC20(tokenAddresses[index]).balanceOf(address(this)) / 10**decimal);
        return value;
    }

    function getDonationList() external view returns(address[] memory) {
        return donationList;
    }

    fallback() external payable {}
    receive() external payable {}
    
    
    function checkUpkeep(bytes calldata checkData) external view override returns (bool upkeepNeeded, bytes memory performData) {
        if (keccak256(checkData) == keccak256(hex'01')) {
            upkeepNeeded = IERC20(tokenAddresses[0]).balanceOf(address(this)) > 10000; // 0.1 USDC (BTC for testing purposes)
            performData = checkData; 
        }
        if (keccak256(checkData) == keccak256(hex'02')) {
            upkeepNeeded = IERC20(tokenAddresses[1]).balanceOf(address(this)) > 100000000000000000; //0.1 WrappedAVAX
            performData = checkData; 
        }
        if (keccak256(checkData) == keccak256(hex'03')) {
            upkeepNeeded = IERC20(tokenAddresses[2]).balanceOf(address(this)) > 20000000000000000000; //20 USDT
            performData = checkData; 
        }          
    }

     function performUpkeep(bytes calldata performData) external override {
        if(keccak256(performData) == keccak256(hex'01') && 
            (IERC20(tokenAddresses[0]).balanceOf(address(this)) > 10000))
            {
            swapTokens(0, 10000000);
        }

        if(keccak256(performData) == keccak256(hex'02') && 
            (IERC20(tokenAddresses[1]).balanceOf(address(this)) > 100000000000000000))
            {
            swapTokens(1, 10000000);
        }

        if(keccak256(performData) == keccak256(hex'02') && 
            (IERC20(tokenAddresses[2]).balanceOf(address(this)) > 20000000000000000000))
            {
            swapTokens(2, 10000000);
        }
    }
}