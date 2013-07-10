collection @users
attribute :id, :uid, :name, :email, :latitude, :longitude, :altitude, :heading, :speed, :acuracy, :altitudeAcuracy, :address, :peerjs_id
child(:facts) do
	attribute :id, :content
end