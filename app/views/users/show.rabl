object @user
attribute :id, :uid, :name, :email, :latitude, :longitude, :altitude, :heading, :speed, :acuracy, :altitudeAcuracy, :address
child(:facts) do
	attribute :id, :content
end