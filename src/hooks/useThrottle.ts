import {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import {User} from "../App";

const URL = "https://jsonplaceholder.typicode.com/users";

export const useThrottle = (interval: number, trigger: number) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const lastExecuted = useRef<number>(Date.now())

    const receiveRandomUser = useCallback(async () => {
        const id = Math.floor(Math.random() * (10 - 1)) + 1;

        const cachedUser = localStorage.getItem(String(id))

        if (cachedUser){
            setUser(JSON.parse(cachedUser));
            setError(null)
            return;
        }

        try {
            const user = (await axios.get(`${URL}/${id}`)).data;
            localStorage.setItem(String(id), JSON.stringify(user))
            setUser(user);
            setError(null)
        } catch (e: any) {
            if (e.message === 'Network Error'){
                setError('Network error. Please check your connection.')
            } else {
                setError('Sorry, something went wrong...')
            }
            setUser(null);
        }
    }, [])

    useEffect(() => {
        if (trigger) {
            if (Date.now() >= lastExecuted.current + interval) {
                lastExecuted.current = Date.now()
                receiveRandomUser()
            } else {
                const timerId = setTimeout(() => {
                    lastExecuted.current = Date.now()
                    receiveRandomUser()
                }, interval)

                return () => clearTimeout(timerId)
            }
        }
    }, [receiveRandomUser, interval, lastExecuted, trigger])

    return {user, error}
}