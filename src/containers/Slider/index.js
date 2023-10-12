import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // swapped A and B for order to be right
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      // added the -1 to the (index < byDateDesc.length ? index + 1 : 0) for it to loop back at the right moment
      
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),  
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  const handlePaginationChange = (radioIdx) => {
    setIndex(radioIdx);
  };
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {/* 
              Took the div out of the slider container for it to stop regenerating
           */}
          {byDateDesc && byDateDesc.map((e, radioIdx) => (
            <input
            key={`${e.title}-${index}`}
            type="radio"
            name="radio-button"
            checked={index === radioIdx}  // had to check index and not idx as out of scope
            onChange={() => handlePaginationChange(radioIdx)}  // Update the selected index on change
          />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
