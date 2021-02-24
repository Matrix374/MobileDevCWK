export default class Methods {
  checkLoggedIn = async (navigation) => {
    console.log('logged in');
    navigation.reset({
      index: 0,
      routes: [{name: 'SplashScreen'}],
    });
  };
}
