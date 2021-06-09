export const isManagementActive = boolean => {
  return {
    type: 'IS_MANAGEMENT_ACTIVE',
    payload: boolean
  };
};

export const currentPage = selected => {
  return {
    type: 'CURRENT_PAGE',
    payload: selected
  };
};
