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
		
		return json;
	},
	
	track: function () {
		console.log("tracking " + this.escape("name"));
		var that = this;
		function gotPos(pos) {
			console.log(pos.coords);
			//this.set();
			that.save(pos.coords, {
				success: function (model, resp) {
					console.log("save succeeded");
					console.log(model);
					console.log(resp);
				},
			});
		}
		function errPos(err) {
			console.log(err);
		}
		navigator.geolocation.getCurrentPosition(gotPos, errPos, {
			enableHighAccuracy: true,
			timeout: 10000000,
			maxaAge: 0
		});
	},
});
