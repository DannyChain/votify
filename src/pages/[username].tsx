import { useRouter } from "next/router";
import Voter from "../components/voter";

const Witness: React.FC = () => {
  const {
    query: { username },
  } = useRouter();

  return <Voter username={username} />;
};

export default Witness;
