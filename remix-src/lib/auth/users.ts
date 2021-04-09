/**
 * User object returned from the Conduit api
 */
export type User = {
  /** Displayable name of the user */
  username: string;

  /** User email address */
  email: string;

  /** Small presentation of the user */
  bio: string;

  /** URL of the profile picture */
  image: string | null;
};
