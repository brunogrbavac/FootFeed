'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Match', { // ovdje automatski stavi ime kao množinu od modela, ručno minnjaš u jedninu
      match_id: { // sequelize automatski stvara id stupac koji je po defaultu PK, pa ga minjamo ručno
        primaryKey: true, // ručno sve minjato
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.BIGINT      
      },
      date_time: {
        type: Sequelize.STRING,
      },
      article: {
        type: Sequelize.TEXT
      },
      stadium: {
        type: Sequelize.STRING
      },
      home_team: {
        type: Sequelize.BIGINT,
        references:{ // ovo polje je FK, koji se veže na tablicu modela Team, key je target stupac u tablici Team (njen PK), a as: je alias
          model:'Team',
          key:'AF_ID_team',
          as: 'home_team',
        },
        onUpdate: "CASCADE", // kada se promijeni vrijednost PK u tablici Team onda ce se vrijednost FK u ovoj tablici automatski updateati s novom vrijednosti
        onDelete: "SET NULL", // kada se izbirše redak u tablici Team sa primarnin ključen koji se nalazi kao FK u ovoj tablici onda će se na njegovim mjestima di se on pojavljuje staviti null
      },
      guest_team: {
        type: Sequelize.BIGINT,
        references:{ // ovo polje je FK, koji se veže na tablicu modela Team, key je target stupac u tablici Team (njen PK), a as: je alias
          model:'Team',
          key:'AF_ID_team',
          as: 'guest_team',
        },
        onUpdate: "CASCADE", // kada se promijeni vrijednost PK u tablici Team onda ce se vrijednost FK u ovoj tablici automatski updateati s novom vrijednosti
        onDelete: "SET NULL", // kada se izbirše redak u tablici Team sa primarnin ključen koji se nalazi kao FK u ovoj tablici onda će se na njegovim mjestima di se on pojavljuje staviti null
      },
      user:{
        type: Sequelize.BIGINT,
        references:{ // ovo polje je FK, koji se veže na tablicu modela User, key je target stupac u tablici User (njen PK), a as: je alias
          model:'User', 
          key:'user_id',
          as:'user'
        },
        onUpdate: "CASCADE", // kada se promijeni vrijednost PK u tablici User onda ce se vrijednost FK u ovoj tablici automatski updateati s novom vrijednosti
        onDelete: "SET NULL", // kada se izbirše redak u tablici User sa primarnin ključen koji se nalazi kao FK u ovoj tablici onda će se na njegovim mjestima di se on pojavljuje staviti null
      },
      competition:{
        type: Sequelize.BIGINT,
        references:{ // ovo polje je FK, koji se veže na tablicu modela User, key je target stupac u tablici User (njen PK), a as: je alias
          model:'Competition', 
          key:'AF_ID_competition',
          as:'competition'
        },
        onUpdate: "CASCADE", // kada se promijeni vrijednost PK u tablici User onda ce se vrijednost FK u ovoj tablici automatski updateati s novom vrijednosti
        onDelete: "SET NULL", // kada se izbirše redak u tablici User sa primarnin ključen koji se nalazi kao FK u ovoj tablici onda će se na njegovim mjestima di se on pojavljuje staviti null
      },
      result: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Match'); // ovdje automatski stavi ime kao množinu od modela, ručno minnjaš u jedninu
  }
};