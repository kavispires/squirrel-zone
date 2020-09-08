const wasPrinted = {};
export function printProps(props, name = 'PROP') {
  if (wasPrinted[name] !== undefined) return;

  wasPrinted[name] = true;

  console.log(name);
  console.log('Colors:', props.map((e) => e.hex).join(', ') + ';');
  console.log(
    'Rate:',
    props.reduce((acc, f) => {
      return acc + f.rate;
    }, 0)
  );
  console.log('Count:', props.length);
  console.log('==========');
}
