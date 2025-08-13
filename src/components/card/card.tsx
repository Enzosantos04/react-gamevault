import "./card.css";

interface CardProps {
  //via props we will pass the game data
  title: string;
  imageUrl: string;
  description: string;
  releaseDate: string;
  rating: number;
}

export default function Card({
  title,
  imageUrl,
  description,
  releaseDate,
  rating,
}: CardProps) {
  return (
    <div className="card">
      <img src={imageUrl} />
      <h2>{title}</h2>
      <p>
        <b>Rating: {rating}</b>
      </p>
      <p>Release date: {releaseDate}</p>
      <div className="card-text">
        <p>{description}</p>
      </div>
    </div>
  );
}
