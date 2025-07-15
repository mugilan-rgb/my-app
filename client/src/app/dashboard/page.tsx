'use client';
import { useEffect, useState } from "react";
import { apiCall } from "../context/apiservice";

type User = {
    _id: string;
    email: string;
    password: string;
};
type ApiResponse = {
    data: User[];
};

export default function Home() {
    const [data, setData] = useState<User[]>([]);

    const userData = async () => {
        try {
            const sendParam = {

            }
            const response = await apiCall("user", "GET", sendParam) as ApiResponse;
            setData(response.data);

            setData(response.data);
            console.log('Login response:', response);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    useEffect(() => {
        userData();
    }, []);

    return (
        <>
            <h2 className="text-2xl font-semibold mb-4 text-center">User Login Details</h2>

            <div className="flex justify-center p-4">
                <table className="table-auto border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 p-4 text-gray-700">Email</th>
                            <th className="border border-gray-400 p-4 text-gray-700">Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((val: User) => (
                            <tr key={val._id} className="hover:bg-gray-50">
                                <td className="border border-gray-400 p-4">{val.email}</td>
                                <td className="border border-gray-400 p-4">{val.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </>
    );
}
