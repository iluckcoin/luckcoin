class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :wallets

  after_create do
    # 每个新用户自动添加一个新钱包
    create_wallet
  end

  # 创建新钱包
  def create_wallet
    web3 = Ethereum::Wallet.new
    web3.new_wallet
    save_wallet(web3,'create')  
  end

  # 导入钱包
  def import_wallet(private_key)
    web3 = Ethereum::Wallet.new
    web3.import_wallet(private_key)
    save_wallet(web3,'import')
  end

  def save_wallet(web3,source)
    wallet = self.wallets.build(wallet_type: source,address: web3.address,balance: web3.balance,
      private_key: web3.private_key,public_key: web3.public_key,name: 'My Wallet')
    wallet.contract_balance = web3.balance_of_token(ENV['contract_address'])
    wallet.save!
    wallet
  end

end
