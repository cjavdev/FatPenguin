FatPenguin.Models.User = Backbone.Model.extend({
	parse: function (data) {
		var facts = new FatPenguin.Collections.Facts(data.facts);
		console.log(facts);
		return data;
	},
});
