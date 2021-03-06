import { SUPPORTED_LANGUAGES } from "constants/constants";

export const getLanguageFromHeader = (header = "en-US") => {
  const languages = header.split(";");

  for (let i = 0; i < languages.length; i += 1) {
    const lang = languages[i];
    const options = lang.split(",");
    for (let j = 0; j < options.length; j += 1) {
      const opt = options[j];
      if (SUPPORTED_LANGUAGES.includes(opt)) {
        return opt;
      }
    }
  }

  return "en";
};
