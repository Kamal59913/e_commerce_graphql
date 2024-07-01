export const cleanObject = (obj: any) => {
    const { __typename, ...cleanedObj } = obj;
    return cleanedObj;
  };