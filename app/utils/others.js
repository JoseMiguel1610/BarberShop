export const optionsImagePicker = {
    title: 'Selecciona imagen',
    //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    maxHeight: 400,
    maxWidth: 400,
    includeBase64: true
  };

  export const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  
  