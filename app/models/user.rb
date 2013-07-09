class User < ActiveRecord::Base
  attr_accessible :provider, :uid, :name, :email, :facts_attributes
  validates_presence_of :name
  has_many :facts
  accepts_nested_attributes_for :facts, :reject_if => proc { |f| f['content'].blank? }
  
  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      if auth['info']
         user.name = auth['info']['name'] || ""
         user.email = auth['info']['email'] || ""
      end
    end
  end
end
