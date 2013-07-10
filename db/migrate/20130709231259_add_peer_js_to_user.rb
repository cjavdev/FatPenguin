class AddPeerJsToUser < ActiveRecord::Migration
  def change
    add_column :users, :peerjs_id, :string
  end
end
