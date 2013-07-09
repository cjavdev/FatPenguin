object @user
attribute :id, :uid, :name, :email
child(:facts) do
	attribute :id, :content
end