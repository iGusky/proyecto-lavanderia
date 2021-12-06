import AppRouter from "./router/AppRouter";
import { Provider } from 'react-redux';
import { store } from './store/store'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


function App() {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
}

export default App;
