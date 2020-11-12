// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Creates an instance of the specimen P.aequor.
const pAequorFactor = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    // Chooses a random base and changes it for a different random base.
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let randomBase;

      // Repeats the calling of a random until it's different from the current one.
      do{
        randomBase = returnRandBase();
      } while (randomBase === this.dna[randomIndex]);
      // Changes new base for the current base.
      this.dna.splice(randomIndex, 1, randomBase);

      return this.dna;
    },

    // Compares the P.aequor's DNA to another P.aequor's DNA and prints the percentage of DNA shared.
    compareDNA(pAequor) {
      let counter = 0;
      // Iterates through the DNA arrays and when they have the same base in the same place it adds 1 to the counter.
      for (let i=0;i<15;i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          counter++;
        }
      }
      // Obtains the percentage of shared DNA by dividing the counter by the length of the DNA arrays and multiplying it by 100.
      const decimal = counter/15;
      const percentage = decimal*100;

      //console.log(`The specimen number ${this.specimenNum} and the specimen number ${pAequor.specimenNum} share ${percentage.toFixed(2)}% of their DNA.`)
      return percentage;
    },

    // P.aequors have a liklier chances of survival if their DNAs are made up of at least 60% C or G bases.
    willLikelySurvive() {
      let count = 0;
      // Iterates through the DNA array and adds one to the count every time it crosses C or G bases.
      this.dna.forEach(base => {
        if (base === 'C' || base === 'G') {
          count ++;
        }
      });

      // It needs at least 60% (or 0.6 in decimal numbers) to survive
      const decimal = count/15;
      if (decimal >= 0.6) {
        return true;
      } else {
        return false;
      }
    },

    // Returns a complementary DNA where A and T bases are changed into each other, and C and G the same.
    complementStrand() {
      const complementArray = [];

      // Iterates through the P.aequor's DNA to change every base.
      this.dna.forEach(val => {
        switch (val) {
          case 'A':
            complementArray.push('T');
            break;
          case 'T':
            complementArray.push('A');
            break;
          case 'C':
            complementArray.push('G');
            break;
          case 'G':
            complementArray.push('C');
            break;
        }
      });

      return complementArray;
    }
  }
};


// The team wants 30 P.aequors that can survive in their natural environment to study later.
const createPaequorForStudy = () => {
  const pAequorStored = [];
  let temp;

  // Creates 30 P.aequor instances.
  for (let i=1;i<31;i++) {
    // Drops the instance created if it can't survive in its natural environment.
    do {
      temp = pAequorFactor(i, mockUpStrand());
    } while (temp.willLikelySurvive() === false);
    // Once created one that can survive it pushes it to the end of the array.
    pAequorStored.push(temp);
  }

  return pAequorStored;
};

// Finds the two most related specimens in a nested array.
const findTwoMostRelatedPaequor = nestedArr => {
  let highestRelation = 0;
  let percentage;
  let firstSpecimen;
  let secondSpecimen;

  // Iterates through the nested array twice so each specimen compares to each other.
  for (let i=0;i<nestedArr.length;i++) {
    for (let j=0;j<nestedArr.length;j++) {
      if (nestedArr[i] !== nestedArr[j]) {
        percentage = nestedArr[i].compareDNA(nestedArr[j]);
        // When found two specimens with a highest relation than the current one, it drops the old one and it is set equal to the new one.
        if (highestRelation < percentage) {
          highestRelation = percentage;
          firstSpecimen = nestedArr[i];
          secondSpecimen = nestedArr[j];
        }
      };
    }
  }

  return `The specimen ${firstSpecimen.specimenNum} and ${secondSpecimen.specimenNum} are the ones that share the highest DNA relation with ${highestRelation.toFixed(2)}%.`;
};