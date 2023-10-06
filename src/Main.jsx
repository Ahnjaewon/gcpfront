import React, {useEffect, useState} from 'react';
import {apiNoToken} from "./Api";

const Main = () => {

    useEffect(() => {
        getUser();
    },[]);

    const getUser = async () => {
        try {
            console.log('가져온다')
            const response = await apiNoToken("/api", "GET");
            console.log(response.data);
            setUserList(response.data);
        } catch (error) {
            console.error('Error', error);
        }
    }

    const [user, setUser] = useState({
        name : '',
        text : ''
    });

    const [userList, setUserList] = useState([]);
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value,
        });
        console.log(user)
    };

    const submit = async () => {
        try {

            const userData = {
                name : user.name,
                text : user.text
            }

            await apiNoToken("/api", "POST", userData);
            console.log('성공')

            setUser({
                name: "",
                text: "",
            });

            window.location.reload();
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">username</label>
                            <div className="mt-2">
                                <input id="name" name="name" type="text" value={user.name}
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                       onChange={onChangeHandler}/>
                            </div>
                        </div>
                        <div className="mt-5" />
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">text</label>
                            <div className="mt-2">
                                <input id="text" name="text" type="text" value={user.text}
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                       onChange={onChangeHandler}/>
                            </div>
                        </div>
                        <div className="mt-10" />
                        <div>
                            <button type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={submit}>
                                입력
                            </button>
                        </div>
                </div>
            </div>
            <div className="container mx-auto p-8">
                <h1 className="text-2xl font-semibold mb-4">회원 목록</h1>
                <div className="-mx-4">
                    <table className="min-w-full">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 bg-gray-200">Name</th>
                            <th className="px-4 py-2 bg-gray-200">Text</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userList.map((item) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{item.name}</td>
                                <td className="border px-4 py-2">{item.text}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Main;