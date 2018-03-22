class Users::BaseController < ApplicationController
  layout :my_layout
  
  def disable_layout
  	render layout: false
  end

  def render_blank
  	render layout: 'users/blank'
  end

  protected

  def my_layout
    'users/application'
  end

end