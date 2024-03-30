import { MessageLevel, hideMessage, hideSpecificMessage, showError, showInfo } from 'reducers/bottomMessage';
import { store } from 'reducers/store';

export const hideBottomMessage = () => {
    store.dispatch(hideMessage())

}

export const showBottomMessage = (message: string, level: MessageLevel) => {
    if (level === 'error') {
        store.dispatch(showError(message))
    } else {
        store.dispatch(showInfo(message))
    }
}

function error(message: string) {
    showBottomMessage(message, 'error')
}
function info(message: string) {
    showBottomMessage(message, 'info')
}

/**
 * Hides message after a while.
 * Doesn't work with chrome debugger open
 */
function tempInfo(message: string) {
    store.dispatch(showInfo(message))
    setTimeout(() => {
        store.dispatch(hideSpecificMessage(message))
    }, 5000)


}

export const bottomMessageUtil = {
    error: error,
    tempInfo: tempInfo,
    info: info
}