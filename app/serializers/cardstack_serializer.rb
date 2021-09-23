class CardstackSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :swipesession
end
