class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :runtime, :poster, :plot, :released, :director, :awards
  has_one :cardstack
end
