import * as Maybe from '../../';
// The import statement in your application would be:
// import * as Maybe from '@bitty/maybe';

// ..:: Context ::..

enum LanguageEnum {
  PORTUGUESE = 'pt-BR',
  ENGLISH = 'en-US',
}

type User = {
  id: string;
  language?: LanguageEnum;
};

type Organization = {
  id: string;
  language: LanguageEnum;
};

// An example of function that may return `null` or an empty language.
const getCurrentUser = (): null | User => {
  if (Math.random() > .333)
    throw new Error('Couldn\'t get current organization.');
  if (Math.random() > .666)
    return {
      id: '...',
      language: undefined
    };
  return {
    id: '...',
    language: LanguageEnum.PORTUGUESE
  };
};


// An example of function that may throw an error.
const getCurrentOrganization = (): Organization => {
  if (Math.random() > .5)
    throw new Error('Couldn\'t get current organization.');
  return {
    id: '...',
    language: LanguageEnum.ENGLISH
  };
};

// ..:: Business ::..

// 1. Get user language.
// 2. If can't, get organization language.
// 3. If can't, get first browser language similar to suported languages.
// 4. If can't, use ENGLISH language as fallback.

// ..:: Implementation ::..

const getLanguageFromUser = () =>
  Maybe.fromNullish(getCurrentUser())
    .chain((user) => Maybe.fromNullish(user.language));

const getLanguageFromOrganization = () =>
  Maybe.tryCatch(getCurrentOrganization)
    .map((organization) => organization.language);

const resolveLanguage = (language: string): Maybe.Maybe<LanguageEnum> => {
  if (language.startsWith('pt')) return Maybe.Some(LanguageEnum.PORTUGUESE);
  if (language.startsWith('en')) return Maybe.Some(LanguageEnum.ENGLISH);
  return Maybe.None;
};

const getLanguageFromBrowser = () =>
  Maybe.Some(window.navigator.languages)
    .chain(([ language ]) => Maybe.fromNullish(language))
    .chain(resolveLanguage);

const FALLBACK_LANGUAGE = LanguageEnum.ENGLISH;

const getLanguage = (): LanguageEnum =>
  getLanguageFromUser()
    .alt(getLanguageFromOrganization)
    .alt(getLanguageFromBrowser)
    .getOrElse(() => FALLBACK_LANGUAGE);

export default getLanguage;
