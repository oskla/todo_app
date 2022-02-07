import {StackViewStyleInterpolator} from 'react-navigation-stack';

const DefaultTransition = sceneProps => {
  return StackViewStyleInterpolator.forHorizontal(sceneProps);
};

const AuthNavigationStack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        header: null,
      }),
    },
    CreateAccount: {
      screen: CreateAccount,
      navigationOptions: () => ({
        title: 'Welcome',
      }),
    },
  },
  {
    initialRouteName: 'Login',
    transitionConfig: () => {
      return {
        containerStyle: {
          backgroundColor: null,
        },
        transitionSpec: RegularTransitionSpeed, // optional
        screenInterpolator: sceneProps => {
          const {scene} = sceneProps;
          const {route} = scene;
          const params = route.params || {};
          const transition = params.transition || 'default';

          /**
           * DefaultTransition left the below screen half in
           * and this looks wrong with transparent bg
           * Instead of writing a new transition, passing a higher
           * initWidth to make screens go fully away
           * Also check to makesure the value doesnt go too far up
           */
          const newScene = sceneProps;
          newScene.layout.initWidth > 1000
            ? (newScene.layout.initWidth = sceneProps.layout.initWidth)
            : (newScene.layout.initWidth = sceneProps.layout.initWidth * 1.9);

          return {
            default: DefaultTransition(newScene), 
          }[transition];
        },
      };
    },
    cardStyle: {
      // backgroundColor: 'rgba(255,255,255,0.6)', //Slightly blurred bg
      backgroundColor: 'transperent', //this works but transp'a'rent doesnt
    },
    cardShadowEnabled: false, //Remove some default border shadow
  },
);

/**
 * Wrapper for the auth screens
 */
export default class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
  }

 

  render() {
    return (
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
        }}
        source={require('../Images/bg.jpg')}
        blurRadius={7}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent" // not transperent
          translucent={true}
        />
        <AuthNavigationStack navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}