import itemUtils from 'swyft-epsilon-online/utils/item-utils';

export default {
	errorCodes: [
		{ code:"DATABASE_ERROR+CREDIT_CARD_NOT_CHARGED", message:"We're having issues with our server at the moment. Please try again. Your credit card has not been charged." },
		{ code:"CREDIT_CARD_DECLINED", message:"Your credit card was declined. Check your details and try again. Contact us if you need help."}
	],
	processErrorCode: function(code) {
		for(var i = 0; i < this.errorCodes.length; i++) {
			if(code === this.errorCodes[i].code) {
				return this.errorCodes[i].message;
			}
		}
	}
}