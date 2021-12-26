import Grid from "./components/Grid";

function App() {
  return (
    <div className={"center-wrapper"}>
      <div className={"center-inner-wrapper"}>
        <h2>Game Of Life</h2>
      </div>
      <div className={"center-inner-wrapper"}>
        <Grid rows={15} cols={20} cellSideLength={20} />
      </div>
    </div>
  );
}

export default App;
