import "./User.css"
export default function User({user, isSelected} : { user: any; isSelected?: boolean }) {
    return (
        <>
            <div className={`card-user ${isSelected ? "active" : ""}`}>
                <div className="avatar"><img src={user.img} alt="+++"/></div>
                <div className="name">{user.name}</div>
            </div>
        </>
    )
}