import ListUser from "./ListUser.tsx";
import "./Sidebar.css"
import avatarImg from '../../assets/woman_7185906.png'
import {createRoomAPI} from "../../services/roomService.ts";
import {type SubmitEvent, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {logoutAPI} from "../../services/authService.ts";

export default function Sidebar() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [roomName, setRoomName] = useState('');
    const [roomError, setRoomError] = useState('');
    let navigate = useNavigate();

    function openCreateRoom() {
        setRoomName('');
        setRoomError('');
        dialogRef.current?.showModal();
    }
function handleCreateRoom(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
        createRoomAPI(roomName);
        dialogRef.current?.close();
    } catch (error) {
        window.alert(error instanceof Error ? error.message : 'Tạo phòng thất bại.');
    }
}

    function handleLogout() {
        logoutAPI();
        navigate('/login');
    }

    return (
        <>
            <div className="list-contact">
                <div className="sidebar-header">
                    <div className="user-profile">
                        <img src={avatarImg} alt="Avatar" className="my-avatar" />
                        <span className="my-name">Thân Văn Danh</span>
                    </div>
                    <div className="header-actions">
                        <button type="button" className="action-btn add_group" title="Tạo nhóm mới" onClick={openCreateRoom}>
                            <i className="fa-solid fa-users"></i>
                        </button>
                        <button className="action-btn" title="Thêm người dùng">
                            <i className="fa-solid fa-user-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="search-contact">
                    <form action="/search" method="get">
                        <input type="text" className="search-input" placeholder=""/>
                        <button className="search" type="submit"><i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
                <ListUser />
                <div className="sidebar-logout">
                    <button className="btnLogout" onClick={handleLogout} >Đăng xuất</button>
                </div>
            </div>
            <dialog ref={dialogRef} className={"create-room-dialog"} aria-labelledby="create-room-title">
                <form onSubmit={handleCreateRoom}>
                    <h2 id="create-room-title">Tạo nhóm mới</h2>
                    <label htmlFor="create-room-name">Tên phòng</label>
                    <input id="create-room-name" placeholder="Nhaapj tên phòng" value={roomName} onChange={e => {setRoomName(e.target.value); setRoomError('')}} required/>
                    {roomError && (
                        <p className="create-room-error" role="alert">{roomError}</p>
                    )}
                    <div className="create-room-actions">
                        <button type="button" className="cancel-create-room" onClick={() => dialogRef.current?.close()}>Hủy</button>
                        <button type="submit" className="create-room-submit">Tạo nhóm</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}