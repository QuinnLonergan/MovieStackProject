class SwipesessionSerializer < ActiveModel::Serializer
  attributes :id, :joined
  has_one :user
end
