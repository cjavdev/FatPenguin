FatPenguin.Models.User = Backbone.Model.extend({
	parse: function (data) {		
		data.facts = new FatPenguin.Collections.Facts(data.facts);
		return data;
	},
});
