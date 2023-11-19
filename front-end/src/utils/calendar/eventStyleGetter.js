export function eventStyleGetter(event, start, end, isSelected) {
  const backgroundColor = event.background;
  const style = {
    backgroundColor: backgroundColor,
    borderRadius: '0px',
    opacity: 0.8,
    color: 'white',
    border: '0px',
    display: 'block'
  };
  return {
    style: style
  };
}