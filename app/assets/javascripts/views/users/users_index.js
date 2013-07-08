FatPenguin.Views.UsersIndex = Backbone.View.extend({
	initialize: function (options) {
		this.listenTo(this.collection, "all", this.render);
	},

  template: JST['users/index'],
	
	render: function () {
		console.log("render of index view");
		
		var renderedContent = this.template({
			users: this.collection
		});
		
		this.$el.html(renderedContent);
		return this;
	}
});
