FatPenguin.Views.UserForm = Backbone.View.extend({
	initialize: function (options) {
		this.listenTo(this.model, "change", this.render);
	},
	
	events: {
		"click #btnAddThing" 	  : "add_thing",
		"click .btnRemoveThing" : "remove_thing",
		"ajax:success form"     : "submit_success"
	},

  template: JST['users/form'],
	
	thingTemplate: JST['facts/form'],
	
	submit_success: function (resp, model) {
		FatPenguin.note("info", "Updated!");
		$("#myModal").modal('hide');
		$(".modal-backdrop").toggle("in,out");
		
		this.model.fetch();
	},
	
	render: function () {
		var renderedContent = this.template({
			user: this.model
		});
		
		this.$el.html(renderedContent);
		return this;
	},
	 
	add_thing: function (event) {
		event.preventDefault();
	  var seed = (new Date).getTime(); 
		var thingContent = this.thingTemplate({
			seed: seed
		});
		
		$("#things").append(thingContent);	
	},
	
	remove_thing: function (event) {
		event.preventDefault();
		var id = $(event.target).attr("data-id");
		
		var $thing_node = this.$el.find("#fact_" + $(event.target).attr("data-id"));
		$thing_node.find(".content_field")
		.attr("type", "hidden")
		.attr("name", "user[facts_attributes][" + id + "][_destroy]")
		.val("1");
		$("#fact_" + id + " .btnRemoveThing").remove();
	},
});
