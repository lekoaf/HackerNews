$(document).ready(function(){

	var table = $(".stories").stupidtable({
	    // Sort functions here
	});

	table.bind('aftertablesort', function (event, data) {
	    // data.column - the index of the column sorted after a click
	    // data.direction - the sorting direction (either asc or desc)

	    var th = $(this).find("th h4");
	    th.find(".arrow").remove();
	    var arrow = data.direction === "asc" ? "↑" : "↓";
	    th.eq(data.column).append('<span class="arrow">' + arrow +'</span>');
	});

	function getStories(){
		var ajaxOptions = {
	        processData: false,
	        dataType: 'json',
	        contentType: 'application/json',
	        success : getItemSuccess,
	        error : getItemError,
	        type: 'GET',
	    };

	    $.ajax('https://hacker-news.firebaseio.com/v0/topstories.json', ajaxOptions);

	    function getItemSuccess(data, msg, jqxhr){
	    	storyData(data);
	    }

	    function getItemError(jqxhr, status, error){
	    	console.log("error");
	    	console.log(jqxhr);
	    	console.log(status);
	    	console.log(error);
	    }
	}

	function storyData(data){

		$.each(data, function (key, val){
			var ajaxOptions = {
		        processData: false,
		        dataType: 'json',
		        contentType: 'application/json',
		        success : getItemSuccess,
		        error : getItemError,
		        type: 'GET',
		    };

		    $.ajax('https://hacker-news.firebaseio.com/v0/item/'+val+'.json', ajaxOptions);

		    function getItemSuccess(data, msg, jqxhr){
		    	if (data.type == 'story'){

		    		var str = "";
		    		if (data.score > 200){
		    			str += '<tr><td><b>'+data.score+'</b></td>';
		    		}
		    		else{
		    			str += '<tr><td>'+data.score+'</td>';
		    		}
		    		str += '<td><a href="'+data.url+'" target="_blank">'+data.title+'</a> <br/> <small>by: '+data.by+' @ '+Date(data.time)+'<small></td>';
		    		if (data.kids != undefined){
		    			var dkl = data.kids.length;
		    			str += '<td><button class="btn btn-primary" data-sort-value="'+dkl+'"data-story-id="'+data.id+'">Comments ('+dkl+') >></button></td></tr>';
		    		}
		    		else{
		    			str += '<td><button class="btn btn-primary" data-sort-value="0" data-story-id="'+data.id+'">Comments (0) >></button></td></tr>';
		    		}

		    		$(".stories tbody").append(str);
		    	}
		    	console.log(data);
		    }

		    function getItemError(jqxhr, status, error){
		    	console.log("error");
		    	console.log(jqxhr);
		    	console.log(status);
		    	console.log(error);
		    }
		});
		
	}

	getStories();
	// function outerFn(){

	// 	var comments = 0;

	// 	function countComments(stories){
			
	// 		$.each(stories, function (key, val){
	// 			var ajaxOptions = {
	// 		        processData: false,
	// 		        dataType: 'json',
	// 		        contentType: 'application/json',
	// 		        success : getItemSuccess,
	// 		        error : getItemError,
	// 		        type: 'GET',
	// 		    };

	// 		    $.ajax('https://hacker-news.firebaseio.com/v0/item/'+val+'.json', ajaxOptions);

	// 		    function getItemSuccess(data, msg, jqxhr){
	// 		    	console.log(data);	
	// 		    	if (data.kids != undefined){
	// 		    		comments += data.kids.length;
	// 		    		$(".c").html(comments);
	// 		    		countComments(data.kids);
	// 		    	}
	// 		    	else{
	// 		    		comments++;
	// 		    		$(".c").html(comments);
	// 		    	}
	// 		    }

	// 		    function getItemError(jqxhr, status, error){
	// 		    	console.log("error");
	// 		    	console.log(jqxhr);
	// 		    	console.log(status);
	// 		    	console.log(error);
	// 		    }
	// 		});
	// 	}

	// 	function getStories(){
	// 		var ajaxOptions = {
	// 	        processData: false,
	// 	        dataType: 'json',
	// 	        contentType: 'application/json',
	// 	        success : getItemSuccess,
	// 	        error : getItemError,
	// 	        type: 'GET',
	// 	    };

	// 	    $.ajax('https://hacker-news.firebaseio.com/v0/topstories.json', ajaxOptions);

	// 	    function getItemSuccess(data, msg, jqxhr){
	// 	    	countComments(data, 0);
	// 	    }

	// 	    function getItemError(jqxhr, status, error){
	// 	    	console.log("error");
	// 	    	console.log(jqxhr);
	// 	    	console.log(status);
	// 	    	console.log(error);
	// 	    }
	// 	}

	// 	getStories();
	// }
	
	//outerFn();
	//setInterval(function(){
		//outerFn();
	//}, 60000);

});