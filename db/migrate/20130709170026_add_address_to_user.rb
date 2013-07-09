class AddAddressToUser < ActiveRecord::Migration
  def change
    add_column :users, :address, :string
  end
end
