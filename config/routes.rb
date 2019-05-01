Rails.application.routes.draw do
  resources :categories
devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :items do
  	member do
  		patch :complete
  	end
  end
  root 'items#index'
end
