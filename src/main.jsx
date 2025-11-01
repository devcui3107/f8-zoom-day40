import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Redux
import { Provider as ReduxProvider } from '@/contexts/ReduxContext.jsx'

import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
)
