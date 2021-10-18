class Movie < ApplicationRecord
  has_many :votes, dependent: :destroy
  has_many :users, through: :votes
  belongs_to :cardstack
end
