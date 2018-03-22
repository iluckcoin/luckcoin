class Users::WalletsController < Users::BaseController
  protect_from_forgery except: :create

  def index
    respond_to do |format|
      format.html do
      end
      format.json do      
      	render json: current_user.wallets
      end
    end
  end

  def create
  	render json: current_user.create_wallet
  end

  def show
    @wallet = Wallet.find(params[:id])
    web3 = Ethereum::Wallet.new
    web3.address = @wallet.address
    @wallet.update_attributes(balance: web3.balance)    
    respond_to do |format|
      format.html {}
      format.json { render json: @wallet }
    end
  end

  def update
    wallet = Wallet.find(params[:id])
    web3 = Ethereum::Wallet.new
    web3.private_key = wallet.private_key
    web3.address = wallet.address
    @result = web3.transfer_eth(params[:to_address],params[:value],params[:gas_limit],params[:gas_price])
    @success = @result.start_with?('0x')
    if @success
      # 成功
      wallet.update_attributes(balance: web3.balance)
    end

    respond_to do |format|
      format.html {}
      format.js {}
    end
  end


  def transfer
    @wallet = Wallet.find(params[:id])
    render_blank
  end

  def import
    private_key = params[:private_key]
    if current_user.wallets.exists?(private_key: private_key)
      return render json: Globals.do_response(false,1,'钱包已存在')
    end
    wallet = current_user.import_wallet(params[:private_key])
    return render json: Globals.do_response(true,0,'',{wallet: wallet})
  end

  def new
    @token = Token.new
    render_blank
  end


end