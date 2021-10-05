class CardstackSerializer < ActiveModel::Serializer
  attributes :id, :name
  # has_one :user
  has_many :movies
end
