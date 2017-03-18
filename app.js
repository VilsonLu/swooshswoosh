(function() {

	var app = angular.module('swoosh', []);


	app.controller('commentController', ['$http', '$scope', function($http, $scope){
			this.category = 'Complaints'
			this.selectedTab = 'Check-in';
			
			var controller = this;
			controller.comments = [];
			controller.selectedComment = {};


			var view = this;
			view.comments = [];

			this.selectTab = function(subcategory){
				this.selectedTab = subcategory;

				$http(
					{
						url: 'http://swoosh-airvolution.azurewebsites.net/api/comment/GetCommentsByCategory',
						method: "GET",
						params: {category:this.category, subcategory: this.selectedTab},
						headers: 
						{
							'Accept': 'application/json'
						}
					}).then(function(response){
						controller.comments = response.data;
						controller.selectedComment = response.data[0];
				});

			};

			this.selectComment = function(comment){
				this.selectedComment = comment;
			}

			this.isEmpty = function(){

				if(this.selectedComment)
					return true;
				return false;
			};

			

			this.isSelectedComment = function(comment){
				var flag = this.selectedComment.Id === comment.Id;
				return flag;
			};

			this.isSelectedCategory = function(comment, category){
				return this.selectedComment.SubCategory === category;
			}

			this.removeComment = function(comment){

				var x = 0;
				for(x=0; x < this.comments.length; x++ ){
					if(this.comments[x].Id == comment.Id){
						break;
					}
			
				}
				this.comments.splice(x,1);
				this.selectedComment = this.comments[0];
			}


			$http(
				{
					url: 'http://swoosh-airvolution.azurewebsites.net/api/comment/GetCommentsByCategory',
					method: "GET",
					params: {category:this.category, subcategory: this.selectedTab},
					headers: 
					{
						'Accept': 'application/json'
					}
				}).then(function(response){
					controller.comments = response.data;
					controller.selectedComment = response.data[0];
			});
		

			



			
	}]);



})();