import { useContext, useState } from "react";
import heartFilled from "../../svgs/heartFilled.svg";
import heartOutlined from "../../svgs/heartOutlined.svg";
import { PetsContext } from "../Pets/Pets";
import "./Card.css";

const Card = ({ name, phone, email, image, favourite, index }) => {
  const { cats, setCats } = useContext(PetsContext);
  const [isfavourite, setIsfavourite] = useState(favourite);

  const updateFavourite = (index, favourite) => {
    const updatedCats = [...cats];
    updatedCats[index].favourite = favourite;
    setCats(updatedCats);
  };

  const togglefavourite = () => {
    setIsfavourite(!isfavourite);
    updateFavourite(index, !isfavourite);
  };

  return (
    <article className="card">
      <div className="card-header">
        <img src={image.url} alt={image.alt} className="card-img" />
        <button className="heart" onClick={togglefavourite}>
          {isfavourite ? (
            <img src={heartFilled} alt="filled heart" />
          ) : (
            <img src={heartOutlined} alt="outlined heart" />
          )}
        </button>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};

export default Card;
