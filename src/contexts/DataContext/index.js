import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [sortedEvents, setSortedEvents] = useState(null); // Add sortedEvents state

  const getData = useCallback(async () => {
    try {
      const eventData = await api.loadData();
      const sortedEventData = eventData?.focus.sort((evtA, evtB) =>
        new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
      );
      setData(eventData);
      setSortedEvents(sortedEventData);
    } catch (err) {
      setError(err);
    }
  }, []);
  // cleaned up expression
  useEffect(() => {
    if (!data) { 
      getData();
    } 
  }, [data, getData]);
  
  const last = sortedEvents?.[0]; // Get the most recent event

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
