import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalGroup from "./modal-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteBtn({
  mess,
  handleDelete,
}: {
  mess: string;
  handleDelete: () => void;
}) {
  return (
    <ModalGroup
      btn={
        <span>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      }
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Delete Confirmation</h2>
        <p className="mb-6 text-red-600">{mess}</p>
      </div>
      <div className="mt-3 border-t-2 border-hover p-3 flex flex-row justify-center items-center">
        <button
          className="inline-block w-1/2 p-3 rounded-md bg-red-600 cursor-pointer hover:bg-hover duration-200"
          onClick={async () => {
            await handleDelete();
            window.location.reload();
          }}
        >
          Delete
        </button>
      </div>
    </ModalGroup>
  );
}
