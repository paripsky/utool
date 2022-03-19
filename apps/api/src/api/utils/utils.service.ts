import utilsRepo from './utils.repo';

export const getUtils = async (userEmail?: string) => {
  return utilsRepo.getUtils(userEmail);
};

export default {
  getUtils,
};
