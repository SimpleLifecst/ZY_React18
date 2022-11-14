import { SEARCHER } from "../constant";

const init = {}
export default function reducer(preState = init, action) {
  const {type, data} = action;
  switch (type) {
    case SEARCHER:
      return {...data}
    default :
      return preState
  }  
}