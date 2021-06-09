export const isManagementActive = boolean => {
  return {
    type: 'IS_MANAGEMENT_ACTIVE',
    payload: boolean
  };
};

export const mainCurrentPage = selected => {
  return {
    type: 'CURRENT_PAGE_MAIN',
    payload: selected
  };
};

export const manaCurrentPage = selected => {
  return {
    type: 'CURRENT_PAGE_MANA',
    payload: selected
  };
};
