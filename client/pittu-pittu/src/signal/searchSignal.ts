import { signal } from 'qyber';
import { Dish } from '../interface';
import { getSearchDish } from '../services/dishesService';
import { startLoading } from './appLoadingSignal';

interface SearchSignal {
    isShow: boolean;
    result: Dish[];
}
const searchSignal = signal<SearchSignal>({
    isShow: false,
    result: [],
});

export const showResult = () => {
    searchSignal.set((pre) => ({
        ...pre,
        isShow: true,
    }));
};
export const hideResult = () => {
    setTimeout(() => {
        searchSignal.set((pre) => ({
            ...pre,
            isShow: false,
        }));
    }, 200);
};

export const clearResult = () => {
    searchSignal.set((pre) => ({
        ...pre,
        result: [],
    }));
};

export const searchResult = async (keyword: string) => {
    const res = await getSearchDish(keyword);
    const result = res.data;
    searchSignal.set((pre) => ({
        ...pre,
        result,
    }));
};

export default searchSignal;
