/**
 * User object returned from the Conduit api
 */
export type User = {
  /** Displayable name of the user */
  username: string;

  /** User email address */
  email: string;

  /** jwt token to use for authenticated requests */
  token: string;

  /** Small presentation of the user */
  bio: string;

  /** URL of the profile picture */
  image: string | null;
};

/**
 * Registration info submitted by a new user.
 * Send to the API to register.
 */
export type UserRegistration = {
  username: string;
  email: string;
  password: string;
};
