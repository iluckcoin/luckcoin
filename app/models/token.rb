class Token < ActiveRecord::Base
  validates_uniqueness_of :contract_address, scope: :wallet_id
  belongs_to    :wallet
end
