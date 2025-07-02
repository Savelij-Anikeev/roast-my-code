import {Provider} from "react-redux";

import rootStore from './stores';

const App = () => {
	return (
		<Provider store={rootStore}>
			'hello world!'
		</Provider>
	)
}

export default App;