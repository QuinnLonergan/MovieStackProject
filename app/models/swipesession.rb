class Swipesession < ApplicationRecord
  has_one :cardstack
  belongs_to :user
end
