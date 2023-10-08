// Мы ожидаем, что Вы исправите синтаксические ошибки, сделаете перехват возможных исключений и улучшите читаемость кода.
// А так же, напишите кастомный хук useThrottle и используете его там где это нужно.
// Желательно использование React.memo и React.useCallback там где это имеет смысл.
// Будет большим плюсом, если Вы сможете закэшировать получение случайного пользователя.
// Укажите правильные типы.
// По возможности пришлите Ваш вариант в https://codesandbox.io

import React, {useCallback, useState} from "react";
import { Button } from "./componets/Button";
import { UserInfo } from "./componets/UserInfo";
import {useThrottle} from "./hooks/useThrottle";

type Company = {
    bs: string;
    catchPhrase: string;
    name: string;
};

type Address = {
    city: string;
    geo: {
        lat: string;
        lng: string;
    }
    street: string;
    suite: string;
    zipcode: string;
}

export type User = {
    id: number;
    email: string;
    name: string;
    phone: string;
    username: string;
    website: string;
    company: Company;
    address: Address;
};

export const App = () => {
    const [trigger, setTrigger] = useState<number>(0)

    const {user, error} = useThrottle(1000, trigger)

    const handleButtonClick = useCallback(() => {
        setTrigger(trigger + 1)
    }, [trigger]);

    return (
        <div>
            <header>Get a random user</header>
            <Button onClick={handleButtonClick}/>
            {!!trigger && user && <UserInfo user={user}/>}
            {!!trigger && error && <div> {error} </div>}
        </div>
    );
}