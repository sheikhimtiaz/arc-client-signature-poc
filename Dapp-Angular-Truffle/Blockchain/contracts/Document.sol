// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;

/**
 * @title Document
 * @dev Store & retrieve value in a variable
 */
contract Document {

    string docHash;

    function set(string memory _docHash) public {
        docHash = _docHash;
    }

    function get() public view returns (string memory) {
        return docHash;
    }
}