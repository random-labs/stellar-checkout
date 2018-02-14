import constants from '../constants';
import {CoinMarketCapClient} from '../services/coinmarketcap.client';
import css from '../assets/css/style.css';
import {createElementFromHTML} from '../utils/dom';
import elems from './elems';
import fonts from './fonts';
import {mainTemplate} from './template';
import {onValidateAmount, onValidatePrivateSeed, onValidatePublicKey, onValidateTotal} from './events';
import {setButtonState} from './buttons';

function create(options) {

	var targetElem = elems.targetElem.elem;
	if (!targetElem) {
		return;
	}

	targetElem.classList.add(elems.targetElem.cssClass);
	
	targetElem.appendChild(createElementFromHTML('div', mainTemplate()));

	var root = targetElem.querySelector(elems.root.selector);
	var header = targetElem.querySelector(elems.header.selector);
	var formPanel = targetElem.querySelector(elems.formPanel.selector);
	var goBackLink = targetElem.querySelector(elems.goBackLink.selector);
	var total = targetElem.querySelector(elems.total.selector);
	var amount = targetElem.querySelector(elems.amount.selector);
	var publicKey = targetElem.querySelector(elems.publicKey.selector);
	var submitButton = targetElem.querySelector(elems.submitButton.selector);
	
	elems.root.elem = root;
	elems.header.elem = header;
	elems.formPanel.elem = formPanel;
	elems.goBackLink.elem = goBackLink;
	elems.total.elem = total;
	elems.amount.elem = amount;
	elems.publicKey.elem = publicKey;
	elems.submitButton.elem = submitButton;

	constants.CMCCLIENT = new CoinMarketCapClient(elems.amount.elem, options); // todo: refactor this and the one in ./ui/events

	/* ---- */

	elems.total.elem.addEventListener('blur', onValidateTotal);
	elems.total.elem.addEventListener('input', onValidateTotal);

	elems.amount.elem.addEventListener('blur', onValidateAmount);
	elems.amount.elem.addEventListener('input', onValidateAmount);

	elems.publicKey.elem.addEventListener('blur', onValidatePublicKey);
	elems.publicKey.elem.addEventListener('input', onValidatePublicKey);

	constants.DTO.invoice.total = options.total;
	constants.DTO.invoice.currency = options.currency;
	constants.DTO.payment.amount = constants.CMCCLIENT.priceInLumens;
	constants.DTO.payment.from = elems.publicKey.elem.value;
	constants.DTO.payment.to = options.destinationKey;

	//todo: add a configuration check for options.total
	var hasValidTotal = false;
	var dtoTotal = constants.DTO.invoice.total;
	if (dtoTotal && dtoTotal.length > 0) {
		elems.total.elem.setAttribute('value', dtoTotal);
		elems.total.elem.setAttribute('disabled', 'disabled');
		var currencyLabel = elems.total.elem.parentNode.querySelector('.currency').innerHTML = constants.DTO.invoice.currency;
		hasValidTotal = true;
		elems.total.elem.dispatchEvent(new Event('input'));
	}

	if (hasValidTotal) {
		constants.CMCCLIENT.fetch();
	}

	setTimeout(function() {
		document.querySelector('.stellar_checkout_overlay').classList.add('loaded');;
		document.querySelector('.stellar_checkout_form').classList.add('loaded');;
	}, 1000);

	return root;
};

function createSubmitHandler(callBack) {
	var btn = elems.submitButton.elem;
	if (btn) {
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			setButtonState(this, constants.SUBMIT_BUTTON_STATE.IN_PROGRESS)
			callBack.call(this);
		});
		elems.submitButton.elem = btn;
	};
};

export default {
	create: create,
	createSubmitHandler: createSubmitHandler
};