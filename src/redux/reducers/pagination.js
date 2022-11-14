import { PAGINATION } from "../constant";

const init = { currentPage: 0, pageSize: 10 };
export default function reducer(preState = init, action) {
  const { type, data } = action;
  switch (type) {
    case PAGINATION:
      return {...preState, ...data};
    default:
      return preState;
  }
}
