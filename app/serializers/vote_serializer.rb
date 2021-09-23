class VoteSerializer < ActiveModel::Serializer
  attributes :id, :liked
  has_one :movie
  has_one :user
end
