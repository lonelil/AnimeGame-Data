import genshindb, { Language } from "genshin-db";
import { outputFileSync } from "fs-extra";

[
  genshindb.Language.ChineseSimplified,
  genshindb.Language.ChineseTraditional,
  genshindb.Language.English,
  genshindb.Language.French,
  genshindb.Language.German,
  genshindb.Language.Indonesian,
  genshindb.Language.Italian,
  genshindb.Language.Japanese,
  genshindb.Language.Korean,
  genshindb.Language.Portuguese,
  genshindb.Language.Russian,
  genshindb.Language.Spanish,
  genshindb.Language.Thai,
  genshindb.Language.Turkish,
  genshindb.Language.Vietnamese,
  genshindb.Language.English,
].forEach((lang) => {
  console.log(`Starting for ${lang}.`);
  createCharacters(lang);
  createArtifacts(lang);
  createFood(lang);
});

function pathGenerator(lang: genshindb.Language, name: string) {
  return `./out/${lang.toLowerCase()}/${name}.json`;
}

function createCharacters(lang: genshindb.Language) {
  let characters = genshindb.characters("names", {
    matchCategories: true,
    resultLanguage: lang,
    queryLanguages: [lang],
  });
  console.log(`Characters: Generated ${lang}'s List.`);
  outputFileSync(
    pathGenerator(lang, "characters/all_names"),
    JSON.stringify(characters)
  );
  console.log(`Characters: Generated ${lang}'s List with data.`);
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
    console.log(`Characters: Generated ${characterName} ${lang}'s data.`);
  });
}

function createArtifacts(lang: Language) {
  let artifacts = genshindb.artifacts("names", {
    matchCategories: true,
    resultLanguage: lang,
    queryLanguages: [lang],
  });
  console.log(`Artifacts: Generated ${lang}'s List.`);
  outputFileSync(
    pathGenerator(lang, "artifacts/all_names"),
    JSON.stringify(artifacts)
  );
  console.log(`Artifacts: Generated ${lang}'s List with data.`);
  outputFileSync(
    pathGenerator(lang, "artifacts/all"),
    JSON.stringify(
      genshindb.artifacts("names", {
        matchCategories: true,
        verboseCategories: true,
        resultLanguage: lang,
        queryLanguages: [lang],
      })
    )
  );
  artifacts.forEach((artifactName) => {
    let artifact = genshindb.artifacts(artifactName, {
      queryLanguages: [lang],
      resultLanguage: lang,
    });
    outputFileSync(
      pathGenerator(
        lang,
        `artifacts/${artifactName.toLowerCase().replaceAll(" ", "")}`
      ),
      JSON.stringify(artifact)
    );
    console.log(`Artifacts: Generated ${artifactName} ${lang}'s data.`);
  });
}

function createFood(lang: Language) {
  let foods = genshindb.foods("names", {
    matchCategories: true,
    resultLanguage: lang,
    queryLanguages: [lang],
  });
  console.log(`Foods: Generated ${lang}'s List.`);
  outputFileSync(pathGenerator(lang, "foods/all_names"), JSON.stringify(foods));
  console.log(`Foods: Generated ${lang}'s List with data.`);
  outputFileSync(
    pathGenerator(lang, "foods/all"),
    JSON.stringify(
      genshindb.foods("names", {
        matchCategories: true,
        verboseCategories: true,
        resultLanguage: lang,
        queryLanguages: [lang],
      })
    )
  );
  foods.forEach((foodName) => {
    let food = genshindb.foods(foodName, {
      queryLanguages: [lang],
      resultLanguage: lang,
    });
    outputFileSync(
      pathGenerator(
        lang,
        `foods/${foodName.toLowerCase().replaceAll(" ", "")}`
      ),
      JSON.stringify(food)
    );
    console.log(`Foods: Generated ${foodName} ${lang}'s data.`);
  });
}
