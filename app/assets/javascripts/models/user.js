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

    // // Enable pusher logging - don't include this in production
    // Pusher.log = function(message) {
    //   if (window.console && window.console.log) {
    //     window.console.log(message);
    //   }
    // };

    var pusher = new Pusher('689695ee0bc2f7abe48c');
    var channel = pusher.subscribe('test_channel');
    channel.bind('message', function(data) {
			if(data.to_id == FatPenguin.current_user_id) {
				var msg = FatPenguin.users.get(data.from_id).escape("name") + ": ";
				
	      FatPenguin.note("info", msg + data.message);
			}
    });
		
		// FatPenguin.peer = new Peer(that.get("id"), {key: 'czky2dg9wofrms4i', debug: true});
// 	  
// 		FatPenguin.peer.on('open', function(id) {
// 			console.log("my peer id: " + id);
// 			//that.set({ peerjs_id: id });
// 	    //that.save();
// 	  });
// 		
// 		console.log("iterate users");
// 		FatPenguin.users.each(function(user) {
// 			if(user.get("id")!= FatPenguin.current_user_id) {
// 				console.log("attempting to connect to: " + user.get("name"));
// 				user.conn = FatPenguin.peer.connect(user.get("id"));
// 				console.log(user);
// 			}
// 			
// 			// if(user.get("peerjs_id") && user.get("peerjs_id") != that.peerjs_id) {
// // 				FatPenguin.peer.connect(user.get("peerjs_id"));
// // 			}
// 		});
// 		
// 	  FatPenguin.peer.on('connection', this.connect);
	  
	},
	
	// connect: function (c) {
//     conn = c;
// 				
//     conn.on('data', function(data) {
// 			console.log("getting message: " + data.message);
// 			console.log(data);
// 			//FatPenguin.users.get(data.from.id).set("peerjs_id", data.from.peerjs_id);
// 			FatPenguin.note("info", "Message: " + data.message);
//     });
// 		
//     conn.on('close', function(err) { 
// 			// alert(conn.peer + ' has left the chat.') 
// 		});
// 	},
// 	
// 	direct_message: function(user, message) {
// 		var that = this;
// 		console.log("sending direct message to: " + user.get("name"));
// 		console.log("message: " + message);
// 		if(user.conn) {
// 			console.log(user.conn);
// 			user.conn.send({ message: message });
// 		}
// 	},
	
	// broadcast_message: function(message) {
	// 	_.pluck(FatPenguin.peer.connections, "peerjs").forEach(function(p) {
	// 		p.send({
	// 			message: message
	// 		});
	// 	});
	// }
});
