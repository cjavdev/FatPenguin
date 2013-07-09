class AddCoordsToUser < ActiveRecord::Migration
  def change
    add_column :users, :latitude, :float
    add_column :users, :longitude, :float
    add_column :users, :altitude, :float
    add_column :users, :accuracy, :float
    add_column :users, :altitudeAccuracy, :float
    add_column :users, :heading, :float
    add_column :users, :speed, :float
  end
end
