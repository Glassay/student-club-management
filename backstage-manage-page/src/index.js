import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';

import './index.css';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/login').default);
app.model(require('./models/members').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
