import { Stack, alert, defaultModules } from '@pnotify/core'
import '@pnotify/core/dist/PNotify.css'
import * as Confirm from '@pnotify/confirm'
import * as PNotifyMobile from '@pnotify/mobile'
import '@pnotify/confirm/dist/PNotifyConfirm.css'

defaultModules.set([PNotifyMobile, Confirm], {})

var defaultStack = new Stack({
	dir1: 'down',
	dir2: 'left',
	firstpos1: 25,
	firstpos2: 25,
	spacing1: 36,
	spacing2: 36,
	push: 'bottom',
	maxOpen: 4,
	maxStrategy: 'close', //wait
	context: document.body,
	modal: false, //ish
})

export function notifyUser(title, text, className) {
	alert({
		title,
		text,
		stack: defaultStack,
		addClass: `custom-notify ${className || ''}`,
		icon: true,
		closerHover: false,
		sticker: false,
		stickerHover: false,
		styling: '',
	})
}

export function notifyUserError(title, text) {
	alert({
		title,
		text,
		stack: defaultStack,
		addClass: 'custom-notify error',
		icon: false,
		closerHover: false,
		sticker: false,
		stickerHover: false,
		styling: '',
	})
}