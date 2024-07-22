import { User } from "../../types/main";
import "./styles.css";

interface ActiveUsersProps {
  users: User[];
}
const ActiveUsers = ({ users }: ActiveUsersProps) => (
  <section className="active-users-container">
    <h2 className="active-users-container__title">Active Users</h2>
    <ul className="active-users-container__list">
      {users.map((user) => (
        <li key={user.id} className="active-users-container__item">
          <span className="active-users-container__item-name">
            {user.name}
            {user.scrum && (
              <em className="active-users-container__item-scrum">
                Scrum master
              </em>
            )}
          </span>
          <div className="active-users-container__item-status"></div>
        </li>
      ))}
    </ul>
  </section>
);

export default ActiveUsers;
