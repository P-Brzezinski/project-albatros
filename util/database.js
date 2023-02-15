import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("albatros.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    // database.transaction((tx) => {
    //   tx.executeSql("DROP TABLE games");
    // });

    // database.transaction((tx) => {
    //   tx.executeSql("DROP TABLE scores");
    // });

    // create games table
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY NOT NULL,
        dateStarted TEXT NOT NULL,
        dateEnded TEXT NOT NULL,
        timePlayed TEXT NOT NULL
    )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });

    // create score table
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS scores (
          id INTEGER PRIMARY KEY NOT NULL,
          gameId INTEGER NOT NULL,
          playerId INTEGER NOT NULL,
          score INTEGER NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const saveScores = (gameId, players) => {
  const promise = new Promise((resolve, reject) => {
    players.forEach((player) => {
      database.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO scores (gameId, playerId, score) VALUES (?, ?, ?)`,
          [gameId, player.id, player.score],
          (_, result) => {
            resolve(result);
            console.log("saveScores result", result);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  });

  return promise;
};

export const saveGame = (game) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO games (dateStarted, dateEnded, timePlayed) VALUES (?, ?, ?)`,
        [game.dateStarted, game.dateEnded, game.timePlayed],
        (_, result) => {
          resolve(result);
          console.log("saveGame result", result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};
