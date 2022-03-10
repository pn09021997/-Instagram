import { React, useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { FaAngleDown } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import "./chat.css";

export default function Chat() {
    const [users, setUsers] = useState([]);
    const [changeData, setChangeData] = useState(true);
    const [loading, setLoading] = useState(true);
    useLayoutEffect(() => {
        const fetchData = async () => {
            const random = Math.floor(Math.random() * 10);
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );
            const result = response.json();
            result.then((res) => {
                setUsers(res[random]);
            });
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };
        fetchData();
    }, [changeData]);

    const handleChangeData = () => {
        setChangeData(!changeData);
    };
    if (loading === true) {
        return <LoadScreen />;
    } else {
        return (
            <div style={{ marginTop: "50px" }} className="canhle chat-cover">
                {" "}
                {/*  margin top 50px là để tạm thời nên t inlince css vô */}
                <div className="chat-user-account">
                    <div className="chat-user-account-choose">
                        <div className="chat-user-account-choose-cover-left">
                            <h5>{users.name}</h5>
                            <h5 className="chat-user-account-choose-cover-left-icon">
                                <FaAngleDown />
                            </h5>
                        </div>
                        <h5 className="chat-user-account-choose-right">
                            <HiPencilAlt />{" "}
                        </h5>
                    </div>
                    <div className="chat-user-account-chat"></div>
                </div>
                <div className="chat-chat-data"></div>
                <button onClick={handleChangeData}>Click change</button>
            </div>
        );
    }
}

function LoadScreen() {
    return (
        <div id="spinner" class="container">
            <div class="loading"></div>
        </div>
    );
}
