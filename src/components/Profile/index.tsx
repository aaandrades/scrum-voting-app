import { useState } from "react";
import { buildAvatar, getRandomColor, getRandomName } from "../../utils";
import "./styles.css";

interface ProfileProps {
  user: string;
}

const Profile = ({ user }: ProfileProps) => {
  const [color, setColor] = useState<string>(() => getRandomColor());
  const [description, setDescription] = useState<string>(() => getRandomName());

  const handleClick = () => {
    setDescription(getRandomName());
    setColor(getRandomColor());
  };

  return (
    <div className="profile-container">
      <picture
        className="profile-container__image"
        style={{ backgroundColor: color }}
      >
        {buildAvatar(user)}
        <button
          className="profile-container__generate-btn"
          title="Generate avatar"
          type="button"
          onClick={handleClick}
        >
          ⟳
        </button>
      </picture>

      <span className="profile-container__title">
        <strong>{user}</strong>
      </span>
      <span className="profile-container__description">{description}</span>
    </div>
  );
};

export default Profile;
