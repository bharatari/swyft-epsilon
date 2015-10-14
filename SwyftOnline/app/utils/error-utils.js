/* jslint unused: false */
import itemUtils from 'swyft-epsilon-online/utils/item-utils';

export default {
	errorCodes: [
		{ code:"DATABASE_ERROR+CREDIT_CARD_NOT_CHARGED", message:"We're having issues with our server at the moment. Please try again. Your credit card has not been charged." },
		{ code:"CREDIT_CARD_DECLINED", message:"Your credit card was declined. Check your details and try again. Contact us if you need help."},
		{ code:"DUPLICATE_USER", message:"That email seems to be already in use. Make sure your email is spelled correctly. If you forgot your password and are trying to gain access to your account, use the Forgot Password link on the login page."}
	],
	processErrorCode: function(code) {
		for(var i = 0; i < this.errorCodes.length; i++) {
			if(code === this.errorCodes[i].code) {
				return this.errorCodes[i].message;
			}
		}
		return false;
	}
};