class CardstackSerializer < ActiveModel::Serializer
  attributes :id, :name
  # has_one :user
  has_many :movies
  belongs_to :user
end
