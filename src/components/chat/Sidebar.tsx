import ListUser from "./ListUser.tsx";
import "./Sidebar.css"
import avatarImg from '../../assets/woman_7185906.png'
import {createRoomAPI, sendJoinRoom} from "../../services/roomService.ts";
import {type SubmitEvent, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {logoutAPI} from "../../services/authService.ts";
import {useAppDispatch} from "../../store/store.ts";
import {addConnectUser} from "../../store/slices/chatSlice.ts";
import {sendCheckUserExist} from "../../services/chatService.ts";

export default function Sidebar() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [roomName, setRoomName] = useState('');
    const [roomError, setRoomError] = useState('');
    let navigate = useNavigate();
    const joinDialogRef = useRef<HTMLDialogElement>(null);
    const [joinRoomName, setJoinRoomName] = useState('');
    const dispatch = useAppDispatch();
    const addUserDialogRef = useRef<HTMLDialogElement>(null);
    const [addUsername, setAddUsername] = useState('');
    const [addUserError, setAddUserError] = useState('');
    const [isChecking, setIsChecking] = useState(false);

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
    function openJoinRoom() {
        setJoinRoomName('');
        joinDialogRef.current?.showModal();
    }
    function handleJoinRoom(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            sendJoinRoom(joinRoomName);
            joinDialogRef.current?.close();
        } catch (error) {
            window.alert('Tham gia phòng thất bại.');
        }
    }
    function openAddUser() {
        setAddUsername('');
        setAddUserError('');
        addUserDialogRef.current?.showModal();
    }

    function handleAddUsername(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const targetUser = addUsername.trim();
        const myUsername = localStorage.getItem("username");
        if (!targetUser) return;
        if (targetUser === myUsername) {
            setAddUserError("Bạn không thể tự kết bạn với chính mình!");
            return;
        }
        setIsChecking(true);
        setAddUserError('');
        sendCheckUserExist(targetUser, (isExist) => {
            setIsChecking(false);
            if (isExist) {
                dispatch(addConnectUser(targetUser));
                addUserDialogRef.current?.close();
            } else {
                setAddUserError(`Tài khoản "${targetUser}" không tồn tại!`);
            }
        });
    }
    function handleLogout() {
        logoutAPI();
        navigate('/login');
    }

    const currentMyUsername = localStorage.getItem("username") || "Người dùng";

    return (
        <>
            <div className="list-contact">
                <div className="sidebar-header">
                    <div className="user-profile">
                        <img src={avatarImg} alt="Avatar" className="my-avatar" />
                        <span className="my-name">{currentMyUsername}</span>
                    </div>
                    <div className="header-actions">
                        <button type="button" className="action-btn add_group" title="Tạo nhóm mới" onClick={openCreateRoom}>
                            <i className="fa-solid fa-users"></i>
                        </button>
                        <button type="button" className="action-btn" title="Tham gia phòng" onClick={openJoinRoom}>
                            <i className="fa-solid fa-door-open"></i>
                        </button>
                        <button className="action-btn" title="Thêm người dùng" onClick={openAddUser}>
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
            <dialog ref={joinDialogRef} className="create-room-dialog" aria-labelledby="join-room-title">
                <form onSubmit={handleJoinRoom}>
                    <h2 id="join-room-title">Tham gia phòng chat</h2>
                    <label htmlFor="join-room-name">Tên phòng</label>
                    <input id="join-room-name" placeholder="Tên phòng sẽ tham gia" value={joinRoomName} onChange={e => setJoinRoomName(e.target.value)} required/>
                    <div className="create-room-actions">
                        <button type="button" className="cancel-create-room" onClick={() => joinDialogRef.current?.close()}>Hủy</button>
                        <button type="submit" className="create-room-submit">Tham gia</button>
                    </div>
                </form>
            </dialog>
            <dialog ref={addUserDialogRef} className="create-room-dialog" aria-labelledby="add-user-title">
                <form onSubmit={handleAddUsername}>
                    <h2 id="add-user-title">Nhắn tin với người dùng</h2>
                    <label htmlFor="add-user-name">Username bạn bè</label>
                    <input id="add-user-name" placeholder="Nhập username muốn bắt đầu chat" value={addUsername} onChange={e => {
                        setAddUsername(e.target.value);
                        setAddUserError('');
                    }} required/>
                    {addUserError && (
                        <p className="create-room-error" role="alert">{addUserError}</p>
                    )}
                    <div className="create-room-actions">
                        <button type="button" className="cancel-create-room" onClick={() => addUserDialogRef.current?.close()}>Hủy</button>
                        <button type="submit" className="create-room-submit" disabled={isChecking}>{isChecking ? "Đang kiểm tra..." : "Bắt đầu chat"}</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}