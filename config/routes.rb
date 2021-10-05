Rails.application.routes.draw do
  resources :cardstacks
  resources :votes
  resources :movies
  resources :users
  # resources :users
  # Routing logic: fallback requests for React Router.
  delete "/resetvotes/:id", to: "votes#destroy_user_votes"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
