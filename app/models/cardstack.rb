class Cardstack < ApplicationRecord
  has_many :movies
  belongs_to :swipesession
end
