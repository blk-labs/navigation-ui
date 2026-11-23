export default {
  '*.{ts,tsx,js,jsx,json,css,md}': 'prettier --write',
  '*.{ts,tsx}': ['eslint --fix', () => 'tsc -p tsconfig.app.json --noEmit --pretty false'],
};
