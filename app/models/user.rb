class User < ApplicationRecord
    has_secure_password
    has_many :votes
    has_many :swipesessions
    has_many :movies, through: :votes

    validates :username, presence: true
    validates :username, uniqueness: true
end
