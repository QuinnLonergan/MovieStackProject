Rails.application.routes.draw do
  resources :votes
  resources :movies
  resources :cardstacks
  resources :swipesessions
  resources :users
  # resources :users
  # Routing logic: fallback requests for React Router.
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
