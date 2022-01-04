function isBracesValid(braces) {
  let total = [];

  const open = ['(', '[', '{'];
  const close = [')', ']', '}'];

  braces.forEach(element => {
    if (open.includes(element)) {
      total.push(element);
      return;
    }

    if (close.indexOf(element) === open.indexOf(total[total.length - 1])) {
      total.pop();
      return;
    }
  });


  return !!arr.length;
}