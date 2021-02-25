export default class Methods {
  checkLoggedIn = async (navigation) => {
    console.log('logged in');
    navigation.reset({
      index: 0,
      routes: [{name: 'SplashScreen'}],
    });
  };

  getFavouriteIds = (favourites) => {
    let fav_ids = [];
    favourites.forEach((fav) => {
      fav_ids.push(fav.location_id);
    });

    return fav_ids;
  };

  getReviewIds = (reviews) => {
    let review_ids = [];
    reviews.forEach((rev) => {
      review_ids.push(rev.review.review_id);
    });
    return review_ids;
  };
}
