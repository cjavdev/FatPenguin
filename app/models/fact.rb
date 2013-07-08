class Fact < ActiveRecord::Base
  attr_accessible :content, :user_id
  validates :content, :user_id, :presence => true
  belongs_to :user
end
