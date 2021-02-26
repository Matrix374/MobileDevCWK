const url = 'http://10.0.2.2:3333/api/1.0.0/location/';

//url + loc_id + '/review/'
export default class ReviewController {
  postReview = async (loc_id, body, userToken) => {
    return await fetch(url + loc_id + '/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
      body: body,
    });
  };

  patchReview = async (loc_id, review_id, body, userToken) => {
    return await fetch(url + loc_id + '/review/' + review_id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
      body: body,
    });
  };

  deleteReview = async (loc_id, review_id, userToken) => {
    return await fetch(url + loc_id + '/review/' + review_id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    });
  };

  postReviewPhoto = async (loc_id, review_id, photo, userToken) => {
    return await fetch(url + loc_id + '/review/' + review_id + '/photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': userToken,
      },
      body: photo,
    });
  };

  checkReviewPhoto = async (loc_id, review_id, userToken) => {
    return await fetch(url + loc_id + '/review/' + review_id + '/photo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    });
  };

  deleteReviewPhoto = async (loc_id, review_id, userToken) => {
    return await fetch(url + loc_id + '/review/' + review_id + '/photo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    });
  };

  postLikeReview = async (loc_id, review_id, userToken) => {
    return await fetch(url + loc_id + '/review/' + review_id + '/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    });
  };

  deleteLikeReview = async (loc_id, review_id, userToken) => {
    return await fetch(url + loc_id + '/review/' + review_id + '/like', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    });
  };
}
