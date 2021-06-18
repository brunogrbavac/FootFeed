const models = require('./models/index');   // ovo je skripta koja ispisuje specijalne funkcije svakog modela za handlanje asocijacijama
                                            // preuzeto sa: https://stackoverflow.com/a/66597708/15181448
for (let model of Object.keys(models)) {
  if(models[model].name === 'Sequelize')
     continue;
  if(!models[model].name)
    continue;

  console.log("\n\n----------------------------------\n", 
  models[model].name, 
  "\n----------------------------------");

  
  console.log("\nAssociations");
  for (let assoc of Object.keys(models[model].associations)) {
    for (let accessor of Object.keys(models[model].associations[assoc].accessors)) {
      console.log(models[model].name + '.' + models[model].associations[assoc].accessors[accessor]+'()');
    }
  }
}