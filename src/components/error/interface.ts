/**
 * @param {string} errorId: id of error
 * @param {string} title: A short, human-readable summary of the problem
 * @param {string} type: It SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization
 * @param {number} status: The HTTP status code
 * @param {string} detail: A human-readable explanation specific to this occurrence of the problem.
 */
export default interface Error {
  errorId?: string;
  title?: string | null;
  type?: string | null;
  status?: number | null;
  detail?: string | null;
}
