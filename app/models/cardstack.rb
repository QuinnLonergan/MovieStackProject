class Cardstack < ApplicationRecord
  belongs_to :user
  has_many :movies, dependent: :destroy
  has_many :votes, through: :movies, dependent: :destroy

  validates :name, presence: true
  validates :name, uniqueness: true
end
