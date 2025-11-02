import LottoController from "./LottoController.js";

class App {
  async run() {
    const controller = new LottoController();
    await controller.startLotto();
  }
}

export default App;
