import { useGameData } from "./hooks/useGameData";
import Card from "./components/card/card";
import type { GameData } from "./interface/GameData";
import "./App.css";
import { useState } from "react";
import { CreateModal } from "./create-modal/create-modal";
import { CreateUserModal } from "./create-modal/login-modal";

export default function GameList() {
  const { data } = useGameData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleUserOpenModal = () => {
    setIsUserModalOpen(true);
  };
  const handleUserCloseModal = () => {
    setIsUserModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="app-background">
      <div className="container">
        <header className="header">
          <h1>Gamevault</h1>
          <button onClick={handleOpenModal} className="btn-secondary">
            New Game
          </button>
          <button onClick={handleUserOpenModal} className="btn-secondary">
            New User
          </button>
        </header>
        <main className="main-content">
          <div className="card-grid">
            {data?.map((gameData: GameData) => (
              <Card
                key={gameData.title}
                title={gameData.title}
                imageUrl={gameData.imageUrl}
                description={gameData.description}
                releaseDate={gameData.releaseDate}
                rating={gameData.rating}
              />
            ))}
          </div>
        </main>
        {isModalOpen && <CreateModal closeModal={handleCloseModal} />}
        {isUserModalOpen && (
          <CreateUserModal closeModal={handleUserCloseModal} />
        )}
      </div>
    </div>
  );
}
