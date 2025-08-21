import { useEffect, useState } from "react";
import type { UserData } from "../interface/UserData";
import { useUserDataMutate } from "../hooks/useUserData";

interface InputProps {
  label: string;
  value: string;
  updateValue(value: unknown): void;
  type: string;
}

interface ModalProps {
  closeModal(): void;
}

const Input = ({ label, value, updateValue, type }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      />
    </>
  );
};

export function CreateUserModal({ closeModal }: ModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");
  const { isSuccess, isPending, mutate } = useUserDataMutate();

  const submit = () => {
    const userData: UserData = {
      name,
      email,
      password,
      roles,
    };
    mutate(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    } else {
      console.log("User creation failed");
    }
  }, [isSuccess, closeModal]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <div className="modal-header">
          <h2>Create a new User.</h2>
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
            <Input
              label="Name"
              value={name}
              updateValue={setName}
              type="text"
            />
            <Input
              label="Email"
              value={email}
              updateValue={setEmail}
              type="email"
            />
            <Input
              label="Password"
              value={password}
              updateValue={setPassword}
              type="password"
            />
            <Input
              type="text"
              label="Role"
              value={roles}
              updateValue={setRoles}
            />
          </form>
        </div>
        <button onClick={submit} className="btn-secondary">
          {isPending ? "creating..." : "Create User"}
        </button>
      </div>
    </div>
  );
}
