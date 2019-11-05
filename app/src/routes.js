import {createStackNavigator} from 'react-navigation-stack';

import SignIn from './screens/signIn';
import SignUp from './screens/signUp';
import Main from './screens/main';

const Routes = createStackNavigator({
  SignIn,
  SignUp,
  Main,
});

export default Routes;
