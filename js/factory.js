	var articles = [];	
	var newsletters = [];	
	var dashboarddetails = [];
	var userlogindetails = [];	
	var getNewsletters = function(){
		var def = $.Deferred();
		if(newsletters.length == 0){
			
					   $.ajax({
						url : 'json/newsletter.json',
						type : 'GET',
						dataType : 'json',
						error : function(e) {
							print("REST/newsletter - Fetch newsletter failed");
						},
						success : function(data) {
							print("newsletters - loaded");
							newsletters = data;
							def.resolve(newsletters);
						}
					});
		}			
		else{
			 def.resolve(newsletters);
			}
		return def.promise();	
			
	}
	
	var getArticles = function(){
		var def = $.Deferred();
		if(articles.length == 0){
			
					   $.ajax({
						url : 'json/article.json',
						type : 'GET',
						dataType : 'json',
						error : function(e) {
							print("REST/article - Fetch article failed");
						},
						success : function(data) {
							print("articles - loaded");
							articles = data;
							def.resolve(articles);
						}
					});
		}			
		else{
			 def.resolve(articles);
			}
		return def.promise();	
			
	}

	var getDashboardDetsils = function(){
		var def = $.Deferred();
		if(dashboarddetails.length == 0){
			$.ajax({
						url : 'json/dashboard.json',
						type : 'GET',
						dataType : 'json',
						error : function(e) {
							print("REST/dashboard - Fetch dashboard failed");
						},
						success : function(data) {
							print("dashboard details - loaded");
							dashboarddetails.push(data);
							def.resolve(dashboarddetails);
						}
					});
					
		}else{
			 def.resolve(dashboarddetails);
			}
		return def.promise();	
	}
	
	var getUserLoginDetails = function(){
		var def = $.Deferred();
		if(userlogindetails.length == 0){
			$.ajax({
						url : 'json/userlogin.json',
						type : 'GET',
						dataType : 'json',
						error : function(e) {
							print("REST/userlogin - Fetch userlogin failed");
						},
						success : function(data) {
							print("user login details - loaded");
							userlogindetails.push(data);
							def.resolve(userlogindetails);
						}
					});
		}else{
			 def.resolve(userlogindetails);
			}
		return def.promise();			
	}

