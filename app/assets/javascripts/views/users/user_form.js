FatPenguin.Views.UserForm = Backbone.View.extend({
	initialize: function (options) {
		this.listenTo(this.model, "change", this.render);
	},
	
	events: {
		"click #btnAddThing" 	  : "add_thing",
		"click .btnRemoveThing" : "remove_thing",
		// "click #btnGo"				  : "submit",
		"ajax:success form"     : "submit_success"
	},

  template: JST['users/form'],
	
	thingTemplate: JST['facts/form'],
	
	submit_success: function (resp, model) {
		console.log("submit success, model:");
		console.log(model);
		this.model.set(model, { parse: true });
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
		var $thing_node = $("#fact_" + $(event.target).attr("data-id"));
		$thing_node.find(".thing_ctl").attr("type", "hidden").val("_destroy");
		$("#fact_" + $(event.target).attr("data-id") + " .btnRemoveThing").remove();
	},
	
	submit: function (event) {
		event.preventDefault();
		var that = this;
		
		var data = $("#userForm").serializeJSON();
		console.log("getting user form");		
		console.log(data);
		this.model.save(data, {
			success: function (model, resp) {
				//this.model.set(model);
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
		// $.ajax({
// 			url: "/users/" + this.model.get("id"),
// 			type: "PUT",
// 			data: data,
// 			success: function (model, resp) {
// 				this.model.set(model);
// 				FatPenguin.note("info", "Updated!");
// 				$("#myModal").modal('hide');
// 				$(".modal-backdrop").toggle("in,out");
// 			},
// 			
// 			error: function (model, resp) {
// 				that.$el.prepend(resp.responseText);
// 				$("#myModal").modal('hide');
// 				$(".modal-backdrop").toggle("in,out");
// 			},
// 		});
	},
});
