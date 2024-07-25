import { User } from "../../types/main";
import "./styles.css";

interface ActiveUsersProps {
  users: User[];
}
const ActiveUsers = ({ users }: ActiveUsersProps) => (
  <section className="active-users">
    <h2 className="active-users__title">Active Users</h2>
    <ul className="active-users__list">
      {users.map((user) => (
        <li key={user.id} className="active-users__item">
          <span className="active-users__item-name">
            {user.name}
            {user.scrum && (
              <em className="active-users__item-scrum">
                Scrum master
              </em>
            )}
          </span>
          <div className="active-users__item-status"></div>
        </li>
      ))}
    </ul>
  </section>
);

export default ActiveUsers;
