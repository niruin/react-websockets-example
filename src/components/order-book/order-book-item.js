export const OrderBookItem = ({item, ask = false}) => {
  const cls = `line__cost${ask ? ' line__cost--ask' : ''}`;

  return (
    <li className="line">
      <span className={cls}>{item[0]}</span>
      <span className="line__qty">{item[1]}</span>
    </li>
  );
}