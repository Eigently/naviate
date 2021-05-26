export const load_state = () => {
  const serialized_state = localStorage.getItem("state");
  if (serialized_state === null) {
    return undefined;
  }
  return JSON.parse(serialized_state);
};

export const save_state = (state: any): void => {
  const serialized_state = JSON.stringify(state);
  localStorage.setItem("state", serialized_state);
};
