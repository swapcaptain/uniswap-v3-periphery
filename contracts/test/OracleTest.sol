// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import '../libraries/OracleLibrary.sol';

contract OracleTest {
    uint256 public temp;

    function consult(
        address factory,
        address baseToken,
        address quoteToken,
        uint24 fee,
        uint256 baseAmount,
        uint32 period
    ) public view returns (uint256 quoteAmount) {
        quoteAmount = OracleLibrary.consult(factory, baseToken, quoteToken, fee, baseAmount, period);
    }

    // For gas snapshot test
    function getGasCostOfConsult(
        address factory,
        address baseToken,
        address quoteToken,
        uint24 fee,
        uint256 baseAmount,
        uint32 period
    ) public view returns (uint256) {
        uint256 gasBefore = gasleft();
        OracleLibrary.consult(factory, baseToken, quoteToken, fee, baseAmount, period);
        return gasBefore - gasleft();
    }
}