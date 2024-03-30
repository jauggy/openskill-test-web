import { setIsBusy } from 'src/reducers/shared';
import { store } from 'src/reducers/store';

export const dispatchIsBusy = (state: boolean) => {
    store.dispatch(setIsBusy(state))

}