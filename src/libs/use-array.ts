import { useState } from 'react';

const useArray = <T>(initialList: T[]) => {
    const [list, set] = useState(initialList);
    return [
        list,
        {
            set,
            empty: () => set([]),
            replace: (list: T[]) => set(list),
            push: (item: T) => set(l => [...l, item]),
            removeAt: (index: number) => set(l => [...l.slice(0, index), ...l.slice(index + 1)]),
            filter: (filterFn: (value: T, index: number, array: T[]) => value is T) => set(l => l.filter(filterFn)),
            map: (mapFn: (value: T, index: number, array: T[]) => T) => set(l => [...l].map(mapFn)),
            sort: (sortFn: ((a: T, b: T) => number)) => set(l => [...l].sort(sortFn)),
            reverse: () => set(l => [...l].reverse()),
        }
    ] as const;
}

export default useArray;