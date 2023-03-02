import genshindb from "genshin-db";
import { outputFileSync } from "fs-extra";

createCharacters(genshindb.Language.English);
createCharacters(genshindb.Language.ChineseSimplified);
createCharacters(genshindb.Language.ChineseTraditional);

function pathGenerator(lang: genshindb.Language, name: string) {
  return `./out/${lang.toLowerCase()}/${name}.json`;
}

function createCharacters(lang: genshindb.Language) {
  //Generate Character Name List
  let characters = genshindb.characters("names", {
    matchCategories: true,
    resultLanguage: lang,
    queryLanguages: [lang],
  });
  console.log(`Generated ${lang}'s Character List.`);
  outputFileSync(
    pathGenerator(lang, "characters/all_names"),
    JSON.stringify(characters)
  );
  console.log(`Generated ${lang}'s Character List with data.`);
  outputFileSync(
    pathGenerator(lang, "characters/all"),
    JSON.stringify(
      genshindb.characters("names", {
        matchCategories: true,
        verboseCategories: true,
        resultLanguage: lang,
        queryLanguages: [lang],
      })
    )
  );
  characters.forEach((characterName) => {
    let character = genshindb.characters(characterName, {
      queryLanguages: [lang],
      resultLanguage: lang,
    });
    outputFileSync(
      pathGenerator(
        lang,
        `characters/${characterName.toLowerCase().replaceAll(" ", "")}`
      ),
      JSON.stringify(character)
    );
    console.log(`Generated ${characterName} ${lang}'s data.`);
  });
}
