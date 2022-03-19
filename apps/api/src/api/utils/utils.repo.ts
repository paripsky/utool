import Util, { UtilDocument } from '../../models/Util';

export const getUtils = async (userEmail?: string): Promise<UtilDocument[]> => {
  return Util.find({
    isDeleted: false,
  });
};

export const getUtil = async (id: string): Promise<UtilDocument | null> => {
  return Util.findOne({
    id,
    isDeleted: false,
  });
};

export default {
  getUtil,
  getUtils,
};
