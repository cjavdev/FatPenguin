FatPenguin.Models.User = Backbone.Model.extend({
	parse: function (data) {	
		data.facts = new FatPenguin.Collections.Facts(data.facts);
		
		return data;
	},

	toJSON: function () {
		var json = Backbone.Model.prototype.toJSON.call(this);
		
		if(this.facts) {
			json.user.facts_attributes = this.facts.toJSON();
		}
		if(this.peerjs_id) {
			json.user.peerjs_id = this.peerjs_id;
		}
		
		return json;
	},
	
	track: function () {
		var that = this;
		function gotPos(pos) {
			that.save(pos.coords, {
				success: function (model, resp) {
					
				},
			});
		}
		
		function errPos(err) {}
		
		navigator.geolocation.getCurrentPosition(gotPos, errPos, {
			enableHighAccuracy: true,
			timeout: 10000000,
			maxaAge: 0
		});
	},
	
	join_chat: function() {
		var that = this;
		
		FatPenguin.peer = new Peer({key: 'czky2dg9wofrms4i', debug: true});
	  
		FatPenguin.peer.on('open', function(id) {
			console.log("my peer id: " + id);
			that.set({ peerjs_id: id });
	    that.save();
	  });
		
	  FatPenguin.peer.on('connection', this.connect);
	  
		FatPenguin.users.each(function(user) {
			console.log("attempting to connect to: " + user.get("name"));
			
			if(user.get("peerjs_id") && user.get("peerjs_id") != that.peerjs_id) {
				FatPenguin.peer.connect(user.get("peerjs_id"));
			}
		});
	},
	
	connect: function (c) {
    conn = c;
				
    conn.on('data', function(data){
			FatPenguin.note("info", "Message: " + data.message);
    });
		
    conn.on('close', function(err) { 
			alert(conn.peer + ' has left the chat.') 
		});
	},
	
	get_message: function (data) {
		console.log("got message");
		console.log(data);
	},
	
	direct_message: function(peerjs_id, message) {
		FatPenguin.peer.connections[peerjs_id].peerjs.send({
			message: message 
		});
	},
	
	broadcast_message: function(message) {
		_.pluck(FatPenguin.peer.connections, "peerjs").forEach(function(p) {
			p.send({
				message: message
			});
		});
	}
});
