import React, { createContext, useContext, useReducer } from 'react';

export const soundDataLayer = createContext();

export const SoundLayer = ({initialState, reducer, children}) => (
    // eslint-disable-next-line react-hooks/rules-of-hooks
    <soundDataLayer.Provider value={useReducer(reducer, initialState)}>
        {children}
    </soundDataLayer.Provider>
);

export const useSoundLayer = () => useContext(soundDataLayer);