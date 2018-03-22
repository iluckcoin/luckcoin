module Ethereum

  class Wallet
    attr_accessor :web3
    attr_accessor :api
    attr_accessor :address
    attr_accessor :private_key
    attr_accessor :public_key
    attr_accessor :wallet


    def initialize
      @web3 = Web3::Eth::Rpc.new host: 'ropsten.infura.io', 
                            port: 443,  
                            connect_options: {
                              open_timeout: 20,
                              read_timeout: 140,
                              use_ssl: true
                            }

    end

    def address=(addr)
      @address = addr
    end

    def private_key=(private_key)
      @private_key = private_key
      @api ||= Web3::Eth::Etherscan.new @private_key
      @api.connect_options[:url] = 'https://ropsten.etherscan.io/api'
    end

    def balance
      @web3.eth.getBalance @address
    end

    def new_wallet
      set_wallet(Eth::Key.new)
      # key.private_hex
      # key.public_hex
      # key.address # EIP55 checksummed address
    end

    def import_wallet(private_key)
      set_wallet(Eth::Key.new priv: private_key)
    end

    def transfer_eth(to_address,value,gas_limit,gas_price)
      begin
        key = Eth::Key.new priv: @private_key
        puts args = { 
          from: @address,
          to: to_address,
          value: value.to_i,
          data: "",
          nonce: nonce,
          # gas_limit: gas_limit,#2_000_000,
          # gas_price: gas_price,#20,
          gas_limit: gas_limit.to_i,
          gas_price: gas_price.to_i,
        }
        tx = Eth::Tx.new(args)
        tx.sign key
        @api.proxy_eth_sendRawTransaction({hex:tx.hex})
      rescue => err
        err.message
      end
    end

    def balance_of_token(contract_address)
      abi = @api.contract_getabi(address: contract_address)
      my_contract_instance = @web3.eth.load_contract(@api, contract_address)
      my_contract_instance.balanceOf(@address)
    end

    private

    def set_wallet(key)
      @wallet             = key
      @address            = @wallet.address
      @public_key         = @wallet.public_key
      self.private_key    = @wallet.private_hex
      # @private_key  = @wallet.private_hex
      # @public_key   = @wallet.public_hex
      # @api ||= Web3::Eth::Etherscan.new @private_key
      # @api.connect_options[:url] = 'https://ropsten.etherscan.io/api'
    end

    def nonce      
      o = @api.proxy_eth_getTransactionCount(@address)
      o.to_i(16)
    end
  end

end
