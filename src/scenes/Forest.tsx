import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setContext } from "../reducers/context-slice";

const Forest = () => {
  const count = useSelector((state: RootState) => state.kaboomContext);
  const dispatch = useDispatch();

  return <div></div>;
};

export default Forest;
