import { useEffect, useState } from "react";
import { useGameDataMutate } from "../hooks/useGameDataMutate";
import type { GameData } from "../interface/GameData";
import "./modal.css";

interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: unknown): void;
}
interface ModalProps {
  closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={(event) => updateValue(event.target.value)}
      />
    </>
  );
};

export function CreateModal({ closeModal }: ModalProps) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImage] = useState("");
  const { mutate, isSuccess, isPending } = useGameDataMutate();

  const submit = () => {
    const gameData: GameData = {
      title,
      rating,
      releaseDate,
      description,
      imageUrl,
    };
    mutate(gameData);
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);
  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <div className="modal-header">
          <h2>Add New Game to the Vault</h2>
          <button onClick={closeModal} className="modal-close-btn">
            X
          </button>
        </div>
        <div className="modal-content">
          <form
            className="input-container"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <Input label="Title" value={title} updateValue={setTitle} />
            <Input label="Rating" value={rating} updateValue={setRating} />
            <Input
              label="Release Date"
              value={releaseDate}
              updateValue={setReleaseDate}
            />
            <Input
              label="Description"
              value={description}
              updateValue={setDescription}
            />
            <Input label="Image URL" value={imageUrl} updateValue={setImage} />
          </form>
        </div>
        <button onClick={submit} className="btn-secondary">
          {isPending ? "Adding..." : "Add Game"}
        </button>
      </div>
    </div>
  );
}
