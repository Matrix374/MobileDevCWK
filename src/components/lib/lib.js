export default class Lib {
  checkLoggedIn = async () => {
    console.log('logged in');
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'SplashScreen'}],
    });
  };
}
