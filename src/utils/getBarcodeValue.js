const getBarcodeValue = (result) => {
  // let str = "";

  // for (let i = 0; i < result.length; i++) {
  //   str += result[i].id[0].toUpperCase();
  // }
  return result[0]._id;
};

export default getBarcodeValue;
