function handleErrorResponse(error) {
  if (!error.response) {
    return "Connectivity issue detected, please try again later";
  }
  // Retreive custom errors
  if (error.response.data.error) {
    return error.response.data.error;
    // Retreive laravel's validation errors
  } else if (error.response.data.errors) {
    return Object.values(error.response.data.errors)[0][0];
  }
  return "Something went wrong, please try again later";
}

export default handleErrorResponse;
