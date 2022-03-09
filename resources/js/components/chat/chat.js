import React from 'react';
import ReactDOM from 'react-dom';
import { FaAngleDown } from 'react-icons/fa';
import { HiPencilAlt } from 'react-icons/hi';
import './chat.css';


export default function Chat() {
    return (
        <div style={{ marginTop: '50px' }} className="canhle chat-cover"> {/*  margin top 50px là để tạm thời nên t inlince css vô */}
            <div className='chat-user-account'>
                <div className='chat-user-account-choose'>
                    <div className='chat-user-account-choose-cover-left'><h5>nguyenviettoank10</h5>
                        <h5 className='chat-user-account-choose-cover-left-icon'  ><FaAngleDown /></h5>
                    </div>
                    <h5 className='chat-user-account-choose-right' ><HiPencilAlt /> </h5>
                </div>
                <div className='chat-user-account-chat'>
                </div>
            </div>
            <div className='chat-chat-data'>

            </div>
        </div>
    );
}

