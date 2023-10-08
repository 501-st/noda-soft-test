import React from "react";
import { User } from "../App";

type UserInfoProps = {
    user: User;
}

export const UserInfo = ({user}: UserInfoProps) => {
    return (
        <div>
            <div className={'row-container'}>
                <div>
                    Username
                </div>
                <div>
                    Phone number
                </div>
            </div>
            <div className={'row-container'}>
                <div>
                    {user.name}
                </div>
                <div>
                    {user.phone}
                </div>
            </div>
        </div>
    );
}