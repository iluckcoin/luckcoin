class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :prepare_load



  private

  def prepare_load
  	unless user_signed_in?
  		sign_in :user,User.first
  	end
  end

end
