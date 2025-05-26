import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";

export default function NoPermission() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
      <FontAwesomeIcon
        icon={faShieldAlt}
        size="4x"
        className="text-red-500 mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">403 - Access Denied</h1>
      <p className="text-gray-600">
        You do not have permission to access this page. Please check your access
        rights or contact with ADMIN.
      </p>
    </div>
  );
}
