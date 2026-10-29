import "./User.css"
export default function User({user} : { user: any }) {
    return (
        <>
            <div className="card-user">
                <div className="avatar"><img src={user.img} alt="+++"/></div>
                <div className="name">{user.name}</div>
            </div>
        </>
    )
}