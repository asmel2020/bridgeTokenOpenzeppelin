// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract BrigeToken is Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");
    bytes32 public constant REGISTRE_ROLE = keccak256("REGISTRE_ROLE");

    struct TokensInfo {
        address Originaltoken;
        address Wrappertoken;
        bool isOriginalTokenAddress;
    }

    mapping(uint256 => TokensInfo) public tokensInfo;

    event Brige(
        address indexed to,
        address indexed tokenAddres,
        bool indexed typeBrige,
        uint256 amount,
        uint256 chainID
    );

    constructor(address _address) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, _address);
        _grantRole(TRANSFER_ROLE,_address);
        _grantRole(REGISTRE_ROLE, msg.sender);
    }

    /**
     * @dev verifica que las address no sean la direccion 0
     *
     */
    modifier verifyAddress(address _Otoken, address _Wtoken) {
        require(_Otoken != address(0), "no puedes ser la direccion 0");
        require(_Wtoken != address(0), "no puedes ser la direccion 0");
        _;
    }

    /**
     * @dev validador de parametros
     *
     */
    modifier verify(uint256 _idToken, uint256 _amount) {
        require(_idToken >= 1, "el ID no puede ser inferior a 1");
        require(_amount >= 1, "el amount no puede ser inferior a 1");
        _;
    }

    /**
     * @dev verifica que el firmante tenga balance y allowance ERC20 suficiente
     *
     */
    modifier tokenERC20(address _token, uint256 _amount) {
        require(
            IERC20(_token).allowance(msg.sender, address(this)) >= 1,
            "allowance insuficiente"
        );
        require(
            IERC20(_token).balanceOf(msg.sender) >= _amount,
            "balance insuficiente"
        );
        _;
    }

    /**
     * @dev registran el token en el puente
     *
     */
    function registerToken(
        uint256 _idToken,
        address _Otoken,
        address _Wtoken,
        bool _access
    )
        external
        onlyRole(REGISTRE_ROLE)
        verifyAddress(_Otoken, _Wtoken)
        whenNotPaused
    {
        tokensInfo[_idToken] = TokensInfo(_Otoken, _Wtoken, _access);
    }

    function transferToken(address _token,address _to , uint _amount) external onlyRole(TRANSFER_ROLE){
        ERC20(_token).transfer(_to, _amount);
    }

    /**
     * @dev Inicia el brige entre blockchain
     *
     * Requirements:
     *
     * - El id del registro del token ``_idToken`` para brigdear y el monto a transferir ``_amount``.
     */
    function brige(uint256 _idToken, uint256 _amount)
        external
        verify(_idToken, _amount)
        whenNotPaused
        returns (bool)
    {
        TokensInfo memory _tokensInfo = tokensInfo[_idToken];

        if (_tokensInfo.isOriginalTokenAddress) {
            brigeOriginalToken(
                _tokensInfo.Originaltoken,
                _tokensInfo.Wrappertoken,
                _amount
            );
            return true;
        } else {
            brigeWrapperToken(
                _tokensInfo.Wrappertoken,
                _tokensInfo.Originaltoken,
                _amount
            );
            return true;
        }
    }

    /**
     * @dev Intercambia los tokens de la blockchaind original a la blockchain secundaria
     *
     * Requirements:
     *
     * - Address token de origen ``_Otoken``,address token destino ``_Wtoken``
     *   y el monto a transferir ``_amount`` (solo puede ser llamada dentro de otra funcion)
     * - se necesita de ceder allowance al contrato del token a transferir
     */
    function brigeOriginalToken(
        address _Otoken,
        address _Wtoken,
        uint256 _amount
    ) internal tokenERC20(_Otoken, _amount) verifyAddress(_Otoken, _Wtoken) {
        IERC20(_Otoken).transferFrom(msg.sender, address(this), _amount);
        emit Brige(msg.sender, _Wtoken, true, _amount, block.chainid);
    }

    /**
     * @dev Intercambia los tokens de la blockchaind original a la blockchain secundaria
     *
     * Requirements:
     *
     * - Address token destino ``_Wtoken``, address token de origen ``_Otoken``,
     *   y el monto a transferir ``_amount`` (solo puede ser llamada dentro de otra funcion)
     *
     * - se necesita de ceder allowance al contrato del token a transferir
     */
    function brigeWrapperToken(
        address _Wtoken,
        address _Otoken,
        uint256 _amount
    ) internal tokenERC20(_Wtoken, _amount) verifyAddress(_Otoken, _Wtoken) {
        IERC20(_Wtoken).transferFrom(msg.sender, address(this), _amount);
        ERC20Burnable(_Wtoken).burn(_amount);
        emit Brige(msg.sender, _Otoken, false, _amount, block.chainid);
    }

    /**
     * @dev consultar las addres original y la wrapper mediante el Id de registro del token
     *
     * - ``_idToken``
     */
    function getRegisterToken(uint256 _idToken)
        external
        view
        returns (TokensInfo memory)
    {
        return tokensInfo[_idToken];
    }

    /**
     * @dev altera el registro del contato midiante el id de registro del token
     *
     */
    function setRegisterTokenWrape(
        uint256 _idToken,
        address _Otoken,
        address _Wtoken
    ) external onlyRole(REGISTRE_ROLE) whenNotPaused {
        require(_idToken >= 1, "el ID no puede ser inferior a 1");
        TokensInfo storage _tokensInfo = tokensInfo[_idToken];
        _tokensInfo.Originaltoken = _Otoken;
        _tokensInfo.Wrappertoken = _Wtoken;
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }
}
