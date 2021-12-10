import { t } from "../locale";

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    },
    widthCalc(number, isFull) {
      return {
        width: isFull
          ? "100%"
          : `calc((100% - ${15 * (number - 1)}px) / ${number})`
      };
    }
  }
};
