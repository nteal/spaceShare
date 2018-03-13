module.exports = {
  "extends": "airbnb",
  "rules": {
    "import/extensions": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/label-has-for": {
      "required": {
                "some": [ "nesting", "id" ],
                },
              },
    "camelcase": 0,
  },
  "env" : {
    "browser": true,
  },
};
