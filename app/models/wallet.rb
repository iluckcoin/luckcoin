class Wallet < ActiveRecord::Base

  belongs_to  	:user
  has_many		  :tokens

  def as_json(options = {})
    super.merge(tokens: tokens)
  end

end
