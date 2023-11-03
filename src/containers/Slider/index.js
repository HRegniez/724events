import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) < new Date(evtA.date) ? -1 : 1   // Switched "evtA" and "evtB" to fix events order issue
  );

  const nextCard = () => {
    setTimeout(() => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0), // "+ 1" to index for white page fix + the "?" @ byDatesDesc 
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={event.title}>
              <div key={event.title}
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
            <div className="SlideCard__paginationContainer" >
              <div className="SlideCard__pagination">
                {byDateDesc.map((_, radioIdx) => (
                  <input
                    key={`${_.date}`}  //  fixed key prop issue
                    type="radio"
                    name="radio-button"
                    checked={index === radioIdx} // Change idx to index
                    onChange={() => null}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Slider;