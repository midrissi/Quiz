(function(){
	var m = model.Exam;
	var methods = m.methods;
	var eMethods = m.entityMethods;
	var events = m.events;

	eMethods.start = function start (user) {
		var s = new ds.Session.createNew(user);
		
		s.exam = this;
		s.save();
		
		return s;
	};

	events.remove = function(){
		this.questions.remove();
		this.sessions.remove();
	};
})();