(function(){
	var m = model.Session;
	var methods = m.methods;
	var eMethods = m.entityMethods;
	var events = m.events;

	eMethods.endSession = function endSession () {
		this.end = new Date();
		this.save();
		return this;
	};
	
	eMethods.send = function(force, to){
		if(force === true || (this.start && this.end)){
			return true;
			// return require('utils').sendResponse(this, to);
		}
		
		return false;
	};
	eMethods.send.scope = 'public';
	
	eMethods.getReport = function(){
		return require('utils').getReport(this);
	};
	eMethods.getReport.scope = 'public';

	methods.createNew = function createNew (user) {
		if(!user){
			user = sessionStorage.name;
		}
		
		var s = new ds.Session({
			user: user,
			start: new Date()
		});
		s.save();
		return s;
	};

	events.remove = function(){
		this.responses.remove();
	};

	events.restrict = function(){
		var current = currentSession();

		switch(true){
			case current.belongsTo('teacher'):
				return this.all();
			case current.belongsTo('student'):
			case sessionStorage.hasOwnProperty('SESS_ID'):
				return this.query('ID == :1', sessionStorage.SESS_ID);
		}

		return this.createEntityCollection();
	};
})();