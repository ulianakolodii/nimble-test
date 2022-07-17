export const parseJSON = (json) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.log("JSON parsing error:", error);
    return null;
  }
};
