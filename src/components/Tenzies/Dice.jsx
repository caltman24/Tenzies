const Dice = ({ diceData, freezeDice }) => {
  return (
    <div
      onClick={freezeDice(diceData)}
      className={`${diceData.frozen ? "frozen" : ""} dice`}
    >
      {diceData.value}
    </div>
  );
};

export default Dice;
