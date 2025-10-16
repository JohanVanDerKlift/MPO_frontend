import {create} from "zustand/react";
import {State, Actions} from "../../types/Types";

const initialState: State = {
    pageNumber: 1,
    pageSize: 25,
    pageCount: 1,
    searchTerm: '',
    searchValue: '',
    orderBy: 'docNum'
}

export const useParamsStore = create<State & Actions>()((set) => ({
    ...initialState,

    setParams: (newParams: Partial<State>) => {
        set((state) => {
            if (newParams.pageNumber) {
                return {...state, pageNumber: newParams.pageNumber}
            } else {
                return {...state, ...newParams, pageNumber: 1}
            }
        })
    },
    reset: () => set(initialState),

    setSearchValue: (value: string) => {
        set({searchValue: value})
    }
}))