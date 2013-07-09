FatPenguin.Routers.Users = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},
	
	routes: {
		"" : "index"
	},
	
	index: function () {
		console.log("index action users router");
		var that = this;
		FatPenguin.users.fetch().then(function() {
			var indexView = new FatPenguin.Views.UsersIndex({
				collection: FatPenguin.users
			});
		
			that._swapView(indexView);
		});
	},
	
	_swapView: function (view) {
		if(this._currentView) {
			this._currentView.remove();
		}
		this._currentView = view;
		this.$rootEl.html(this._currentView.render().$el);
	}
});
