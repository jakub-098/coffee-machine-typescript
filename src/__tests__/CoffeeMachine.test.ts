import { Drink } from '../Drink';
import { CoffeeMachine } from '../CoffeeMachine';

describe("CoffeeMachine", () => {
  it("should serve coffee if exact money inserted", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 0, "small");

    expect(machine.serve(drink, 2, false, 10)).toBe("Serving Coffee (small)");
  });

  it("should never allow more than 5 sugars", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 6, "small");

    expect(machine.serve(drink, 2, false, 10)).toBe("Error: too much sugar");
  });

  it("Price should be always positive", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 2, "small");

    expect(machine.serve(drink, -20, false, 10)).toBe("Not enough money");
  });

  it("Payed Exact amount", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 2, "small");

    expect(machine.serve(drink, 2, false, 10)).toBe("Serving Coffee (small)");
  });

  it("Payed more than price", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 2, "small");

    expect(machine.serve(drink, 3, false, 10)).toBe("Serving Coffee (small) with change 1.00");
  });

  it("Happy hour 15-17 20% discount", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 2, "small");

    expect(machine.serve(drink, 1.60, false, 16)).toBe("Serving Coffee (small)");
  });

  it("Loyalty card every 5th drink is free (not large)", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 2, "small");

    machine.serve(drink, 2, true, 10);
    machine.serve(drink, 2, true, 10);
    machine.serve(drink, 2, true, 10);
    machine.serve(drink, 2, true, 10);
    expect(machine.serve(drink, 0, true, 10)).toBe("Serving Coffee (small)");
  })
it("Loyalty card every 5th large drink isnt free", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 2, "large");

    machine.serve(drink, 3, true, 10);
    machine.serve(drink, 3, true, 10);
    machine.serve(drink, 3, true, 10);
    machine.serve(drink, 3, true, 10);
    expect(machine.serve(drink, 3, true, 10)).toBe("Serving Coffee (large)");
  })

  it("Milk costs extra", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, true, 0, "small");

    expect(machine.serve(drink, 2.20, false, 10)).toBe("Serving Coffee (small)");
  });

  it("Medium costs extra", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 0, "medium");

    expect(machine.serve(drink, 2.50, false, 10)).toBe("Serving Coffee (medium)");
  });

  it("Price < 0 error", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", -1, false, 0, "medium");

    expect(machine.serve(drink, 2, false, 10)).toBe("Error: invalid price");
  });

  it("Price < 0 error", () => {
    const machine = new CoffeeMachine();

    const drink = new Drink("Coffee", 2, false, 3, "medium");

    expect(machine.serve(drink, 2.60, false, 10)).toBe("Serving Coffee (medium)");
  });
});
