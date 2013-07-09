FatPenguin.Views.UserForm = Backbone.View.extend({
	initialize: function (options) {
		this.listenTo(this.model, "all", this.render);
	},
	
	events: {
		"click #btnAddThing" 	  : "add_thing",
		"click .btnRemoveThing" : "remove_thing",
		"click #btnGo"				  : "submit"
	},

  template: JST['users/form'],
	
	thingTemplate: JST['facts/form'],
	
	render: function () {
		console.log("render of index view");
		
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
		$("#fact_" + $(event.target).attr("data-id")).remove();
	},
	
	submit: function (event) {
		event.preventDefault();
		var that = this;
		
		var data = $("#userForm").serializeJSON();
		console.log(data);
		this.model.save(data, {
			success: function (model, resp) {
				FatPenguin.note("info", "Updated!");
				$("#myModal").modal('hide');
				$(".modal-backdrop").toggle("in,out");
			},
			
			error: function (model, resp) {
				that.$el.prepend(resp.responseText);
				$("#myModal").modal('hide');
				$(".modal-backdrop").toggle("in,out");
			},
		});
	},
});
