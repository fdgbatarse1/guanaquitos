const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const matches = (text: string, query: string) => normalize(text).includes(normalize(query));

export default matches;
