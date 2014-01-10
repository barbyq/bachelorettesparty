exports.get_lang = function(req){
	if (req.session.lang === 'es') {
		return false;
	}
	return true;
};