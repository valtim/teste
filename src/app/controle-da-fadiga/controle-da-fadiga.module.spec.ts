import { ControleDaFadigaModule } from './controle-da-fadiga.module';

describe('ControleDaFadigaModule', () => {
  let controleDaFadigaModule: ControleDaFadigaModule;

  beforeEach(() => {
    controleDaFadigaModule = new ControleDaFadigaModule();
  });

  it('should create an instance', () => {
    expect(controleDaFadigaModule).toBeTruthy();
  });
});
