import { User } from "../../../../../shared/types/user";
import "./UserPreview.scss";

type UserPreviewProps = {
  user: User;
  bcgColor?: string;
};

export const UserPreview = ({ user, bcgColor }: UserPreviewProps) => {
  return (
    <li className="user-preview" style={{ backgroundColor: bcgColor }}>
      <div className="user-info">
        <p>
          <strong>Id:</strong> {user.id}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p className="user-email">
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Roles:</strong> {user.roles.join(",")}
        </p>
      </div>
    </li>
  );
};
