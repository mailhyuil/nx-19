export abstract class TestService {
  abstract test(): void;
  doSomething() {
    this.test();
    console.log('doing something');
  }
}
