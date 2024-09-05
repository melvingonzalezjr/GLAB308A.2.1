/************************
PART 1: HUMBLE BEGINNINGS
************************/
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: {
    name: "Leo",
    type: "Cat",
    companion: {
      name: "Frank",
      type: "Flea",
      inventory: ["small hat", "sunglasses"],
    },
  },
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  },
};
//LOOP AND EACH ITEM IN ROBIN'S INVENTORY
adventurer.inventory.forEach((item) => console.log(item));

//ADD COMPANION SUB-OBJECT TO LEO. IN ABOVE adventurer.companion

// adventurer.roll()

/********************
PART 2: CLASS FANTASY
********************/
class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }
  static MAX_HEALTH = 100; //PART 4
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
    return result; //PART 6 to return the result for comparison in duel
  }
}

const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

robin.roll();
robin.companion.roll();
robin.companion.companion.roll();

/*********************
PART 3: CLASS FEATURES
*********************/
class Adventurer extends Character {
  static ROLES = ["Fighter", "Healer", "Wizard"]; //PART 4
  constructor(name, role) {
    super(name);
    this.inventory.push("bedroll", "50 gold coins");
    try {
      if (role in Adventurer.ROLES) {
        this.role = role;
      } else {
        throw new TypeError(
          `Incorrect role. Please choose from: ${Adventurer.ROLES}`
        );
      }
    } catch ({ name, message }) {
      console.log(name, "-->", message); //TypeError is name of error. Message is in `` in line 69
    }
  }

  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }

  duel(otherAdventurer) {
    let round = 1;
    while (this.health > 50 && otherAdventurer.health > 50) {

      console.log('*************************');  //new round beginning
      console.log(`Round ${round} results:`);

      let selfRoll = this.roll();               //outputs of each roll is logged and the result stored as a variable
      let otherRoll = otherAdventurer.roll();

      if (selfRoll < otherRoll) {
        this.health -= 1;
      } else if (otherRoll < selfRoll) {
        otherAdventurer.health -= 1;
      }

      console.log(
        `-----------------------
        ${this.name} now has health level: ${this.health}
        ${otherAdventurer.name} now has health level: ${otherAdventurer.health}
        `
      );
      console.log('*************************');
      round++;
    }
    let winner = this.health > 50 ? this.name : otherAdventurer.name;
    console.log(`WINNER IS: ${winner}`);
  }
}
//Companion class with new properites and methods specific to companions
class Companion extends Character {
  constructor(name, type) {
    super(name);
    this.type = type;
    this.inventory.push("germs", "mischievous thoughts");
  }
  infect() {
    console.log(`${this.name} is sick and may infect the host. GASP!!!!`);
  }
}

const robin2 = new Adventurer("Robin #2", "Healer");
const leo = new Companion("Frank", "cat");
const frank = new Companion("Leo", "flea");

robin2.companion = leo;
leo.companion = frank;

robin2.scout();
leo.roll();
frank.infect();

/*********************
PART 4: CLASS UNIFORMS
*********************/
//Above on Lines 38, 61-73

/************************
PART 5: GATHER YOUR PARTY
************************/
class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }
  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
  }
  findByIndex(index) {
    return this.adventurers[index];
  }
  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const healers = new AdventurerFactory("Healer");
const robin3 = healers.generate("Robin");

/************************
PART 6: DEVELOPING SKILLS
************************/
const billy = new Adventurer("Billy", "Wizard")
robin2.duel(billy)
