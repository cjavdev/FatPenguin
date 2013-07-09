FatPenguin.Routers.Users = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},
	
	routes: {
		"" : "index",
		"_=_" : "index"
	},
	
	index: function () {
		var that = this;
		var indexView = new FatPenguin.Views.UsersIndex({
			collection: FatPenguin.users
		});
	
		that._swapView(indexView);
	},
	
	_swapView: function (view) {
		if(this._currentView) {
			this._currentView.remove();
		}
		this._currentView = view;
		this.$rootEl.html(this._currentView.render().$el);
	}
});
