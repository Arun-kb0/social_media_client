import React, { useEffect, useState } from 'react'

const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timerId = setTimeout(() => {
            console.log("set timeout")
            setDebouncedValue(value)
        }, delay);

        return () => {
            console.log("clear timeout")
            clearTimeout(timerId)
        }
    }, [value, delay])


    return debouncedValue
}

export default useDebounce