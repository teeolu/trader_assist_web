export const existInUrl = (item) => {
  const urlContent = window.location.href.split('/');
  let value;
  if (!!Array.isArray(item)) {
    item.forEach((el) => {
      urlContent.forEach((b) => {
        if (b === el) value = el;
      });
    });
  } else {
    urlContent.forEach((b) => {
      if (b === item) value = b;
    });
  }
  return value;
};
