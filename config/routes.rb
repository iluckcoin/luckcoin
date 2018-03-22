Rails.application.routes.draw do

  devise_for :users
  root 'home#index'
  resources :home

  namespace :users do
  	root 'home#index'
    resources :tokens , only: [:transfer] , on: :member
  	resources :users
  	resources :wallets do
  	  collection do
        post  :import
      end

      member do
        get   :transfer
      end
      resources :tokens do
        member do
          get :transfer
        end
      end
    end
  end
  
end
