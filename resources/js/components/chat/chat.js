import { React, useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { FaAngleDown } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import "./chat.css";

const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com`
})

export default function Chat() {

    const [user_name, setUserName] = useState('nguyenngoctoank10');
    const [loading, setLoading] = useState(true);
    // Use layout Effect này để load dữ liệu lần đầu 
    // Những lân sau đều dùng use Effect để call dữ liêu
    useLayoutEffect(() => {
        const fetchdata = async () => {
            await fetch("https://raw.githubusercontent.com/vinaghost/user-agent/main/user-agent.json")
                .then((res) => res.json())
            setLoading(false);
        }
        fetchdata();

    }, [])

    if (loading === true) {
        return <LoadScreen />
    }
    else {
        return (

            <div style={{ marginTop: "50px" }} className="canhle chat-cover">
                {/*  margin top 50px là để tạm thời nên t inlince css vô */}
                <div className="chat-user-account">
                    <div className="chat-user-account-choose">
                        <div className="chat-user-account-choose-cover-left">
                            <h5>{user_name}</h5>
                            <h5 className="chat-user-account-choose-cover-left-icon">
                                <FaAngleDown />
                            </h5>
                        </div>
                        <h5 className="chat-user-account-choose-right">
                            <HiPencilAlt />
                        </h5>
                    </div>
                    <div className="chat-user-account-chat">
                        <Chat_User_Account_Screen />
                    </div>
                </div>
                <div className="chat-chat-data">

                </div>
            </div>
        );
    }




}


function LoadScreen() {
    return (
        <div id="loadscreen">
            <div className="loading"></div>
        </div>
    );
}

function Chat_User_Account_Screen() {


    const [chat_friend, setChat_Friend] = useState([]);
    const [loading, setLoading] = useState(true);
    const ref_start = useRef(0);
    // useLayoutEffect(() => {
    //     setLoading(true);

    //     const calldata = async () => await api.get('/photos',{
    //         params: {
    //             _limit:7,
    //             _start:start
    //         }
    //     })
    //         .then((res) => {
    //             // console.log([...chat_friend,...res.data])
    //             setChat_Friend((prev)=> [...prev,...res.data] );                
    //             setLoading(false);
    //         })
    //     calldata();
    //     console.log("use Layout Effect");
    // }, [start])

    useEffect(() => {
        console.log("use Effect lần đầu để gọi dữ liệu start = 0 :v");
        const calldata = async () => await api.get('/photos', {
            params: {
                _limit: 7,
                _start: 0
            }
        })
            .then((res) => {
                setChat_Friend((prev) => [...prev, ...res.data]);
                setLoading(false);
            })
        calldata();
    }, []) // Call data lần đầu 

    const hanldeListScroll = ((el) => {
        const e = el.target;
        if (e.scrollHeight - e.scrollTop === e.clientHeight) {
            ref_start.current += 7;
            callbackk(ref_start.current);
        }
    })

    const callbackk = useCallback((start_value) => {
        const calldata = async () => await api.get('/photos', {
            params: {
                _limit: 7,
                _start: start_value
            }
        })
            .then((res) => {
                setChat_Friend((prev) => [...prev, ...res.data]);
            })
        calldata();
    }, [])


    if (loading) {
        return <LoadScreen />
    } else {
        return (
            <ul onScroll={hanldeListScroll} style={{ margin: '0', padding: '0.5rem', height: '465px', overflowY: 'scroll' }}>
                {chat_friend.map((el) => {
                    return <li style={{ height: '72px', display: 'flex', listStyle: 'none' }} key={el.id}>
                        <img style={{ width: '56px', height: '56px', borderRadius: '50%' }} src={el.thumbnailUrl} />
                        <div style={{ margin: '0px 16px', padding: '12px 0', width: '100%' }} className="cover-chat-friend-name">
                            <p style={{ fontSize: '16px', lineHeight: '10px' }} className="name-chat"> {el.albumId} </p>
                            <div style={{ display: 'flex', fontSize: '14px', lineHeight: '18px', color: 'gray' }} className="last-chat" >
                                <span style={{ display: 'block', width: '80%' }}>{text_truncate(el.title)} </span>
                                <span style={{ display: 'block', width: '17%', margin: '0 3%' }} > 1 tuần </span>
                            </div>
                        </div>
                    </li>
                })}
            </ul>


        );
    }

}

function text_truncate(str, length, ending) {
    if (length == null) {
        length = 30;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
}
