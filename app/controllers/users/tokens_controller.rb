class Users::TokensController < Users::BaseController

  def new
    @wallet = Wallet.find(params[:wallet_id])
    @token = Token.new
    @token.contract_address = '0x6c4b131f88ba4e4354e49eb65f3f9ccd8b27ef21'
    @token.token_symbol = 'GNB'
    render_blank
  end

  def create
    wallet = Wallet.find(params[:wallet_id])
    @token = wallet.tokens.build(token_param)
    web3 = Ethereum::Wallet.new
    @success = false
    if wallet.tokens.exists?(contract_address: @token.contract_address)
      return @message = '同样的合约地址已存在'
    end
    web3.private_key  = wallet.private_key
    web3.address      = wallet.address
    balance = web3.balance_of_token(@token.contract_address,@token.token_symbol,@token.precision)
    @token.balance = balance
    @success = @token.save
  end

  private

  def token_param
    params.require(:token).permit(:contract_address,:token_symbol,:precision)
  end

end