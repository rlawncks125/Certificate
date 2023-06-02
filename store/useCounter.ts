import { defineStore } from "pinia";

export const useCounter = defineStore(
  "counter",
  () => {
    const counter = useState("count-test", () => 0);

    const incre = () => {
      counter.value++;
    };
    const decre = () => {
      counter.value--;
    };
    return { counter, incre, decre };
  },
  {
    persist: {
      paths: ["counter"],
    },
  }
);

export default useCounter;
