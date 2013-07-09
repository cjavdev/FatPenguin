FatPenguin.Models.User = Backbone.Model.extend({
	parse: function (data) {	
		console.log("parsing");
		console.log(data);	
		data.facts = new FatPenguin.Collections.Facts(data.facts);
		return data;
	},

	toJSON: function () {
		var json = Backbone.Model.prototype.toJSON.call(this);
		if(this.facts) {
			json.user.facts_attributes = this.facts.toJSON();
		}
		
		return json;
	}
});
