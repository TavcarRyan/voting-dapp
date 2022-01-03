export const globalReducer = (
  state: any,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "TOGGLE_CREATE_POLL_MODAL":
      return { ...state, toggleCreatePollModal: action.payload };
    default:
      return {};
  }
};
