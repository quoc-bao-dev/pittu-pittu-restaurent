import { signal } from 'qyber';

const appLoadingSignal = signal(false);

export const startLoading = () => {
    appLoadingSignal.set(true);
};
export const stopLoading = () => {
    appLoadingSignal.set(false);
};

export default appLoadingSignal;
