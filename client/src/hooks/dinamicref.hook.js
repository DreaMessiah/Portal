import React, { useRef } from 'react';

export default function useDynamicRefs(){
    const refs = useRef([]);

    const AddRef = () => {
        const newRef = useRef()
        refs.current.push(newRef)
    }

    return { refs, AddRef }
}